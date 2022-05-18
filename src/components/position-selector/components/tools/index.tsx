import React, { FC, useState, useEffect, useRef } from "react";
import { useMap } from "@pansy/react-amap";
import PlusOutlined from "@sensoro-design/icons/PlusOutlined";
import MinusOutlined from "@sensoro-design/icons/MinusOutlined";
import { LngLatArray } from "../../../../map/types";
import { Tooltip, Popover } from "antd";
import classNames from "@pansy/classnames";
//@ts-ignore;
import generalImg from "../../../../assets/theme/general.png";
//@ts-ignore;
import sateliteImg from "../../../../assets/theme/satelite.png";

interface ToolsProps {
  prefixCLs?: string;
  position?: LngLatArray;
  small: boolean;
}

const getCurrentImg = (type: string): string => {
  switch (type) {
    case "general":
      return generalImg;
    case "satelite":
      return sateliteImg;
    default:
      return generalImg;
  }
};

export const Tools: FC<ToolsProps> = ({ prefixCLs, small = false }) => {
  const { map } = useMap();
  const sateLite = useRef<any>();
  const themeContent = useRef();
  const [mapTheme, setMapTheme] = useState<string>("general");

  useEffect(() => {
    if (mapTheme === "satelite")
      try {
        map?.plugin?.(["AMap.TileLayer"], () => {
          //@ts-ignore-next-line
          const tileLayer: any = new AMap.TileLayer({
            getTileUrl: `http://192.168.0.108:9001/bigemap.axddmqiw/tiles/[z]/[x]/[y].png?access_token=pk.eyJ1IjoiY3VzXzJ0OHRtZnIwIiwiYSI6Ijdidnhkc3Nrb20weDN1dHk5dng5aXY3NXQiLCJ0IjoxfQ.JZVdpmEsHY8H7jbrp6vVIM6qJOD-voGIkGiPI_nJUQk`,
            zooms: [2, 20],
            zIndex: 10,
          });

          sateLite.current = tileLayer;
          map.add(tileLayer);
          //wms?.setMap(map);
        });
      } catch (e) {
        // console.log(e);
      }
    else {
      sateLite?.current?.setMap?.(null);
    }
  }, [mapTheme]);

  const handlePlusClick = () => {
    map?.zoomIn();
  };

  const handleMinusClick = () => {
    map?.zoomOut();
  };

  const themeChange = (
    <div
      className={classNames(`${prefixCLs}-theme-content`, {
        [`${prefixCLs}-theme-content-small`]: !!small,
      })}
    >
      <Tooltip title="标准" placement="top">
        <div
          onClick={() => {
            setMapTheme("general");
          }}
        >
          <div
            style={{
              backgroundImage: `url(${generalImg})`,
            }}
          />
        </div>
      </Tooltip>
      <Tooltip title="实景" placement="top">
        <div
          onClick={() => {
            setMapTheme("satelite");
          }}
        >
          <div
            style={{
              backgroundImage: `url(${sateliteImg})`,
            }}
          />
        </div>
      </Tooltip>
    </div>
  );

  return (
    <div className={prefixCLs} ref={themeContent as any}>
      <Tooltip title="切换主题">
        <Popover
          content={themeChange}
          placement="left"
          trigger={["hover"]}
          getPopupContainer={() => themeContent?.current as any}
        >
          <div
            className={classNames(`${prefixCLs}-theme`, {
              [`${prefixCLs}-theme-small`]: !!small,
            })}
          >
            <div
              style={{
                backgroundImage: `url(${getCurrentImg(mapTheme)})`,
              }}
            />
          </div>
        </Popover>
      </Tooltip>
      <div
        className={classNames(`${prefixCLs}-zooms`, {
          [`${prefixCLs}-zooms-small`]: !!small,
        })}
      >
        <Tooltip title="放大" placement="left">
          <div
            className={classNames(`${prefixCLs}-item`, {
              [`${prefixCLs}-item-small`]: !!small,
            })}
            onClick={handlePlusClick}
          >
            <PlusOutlined />
          </div>
        </Tooltip>
        <Tooltip title="缩小" placement="left">
          <div
            className={classNames(`${prefixCLs}-item`, {
              [`${prefixCLs}-item-small`]: !!small,
            })}
            onClick={handleMinusClick}
          >
            <MinusOutlined />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

Tools.defaultProps = {
  prefixCLs: "sen-map-position-selector-tools",
};

export default Tools;
