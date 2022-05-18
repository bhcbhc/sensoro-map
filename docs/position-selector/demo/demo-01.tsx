import React from "react";
import { PositionSelector } from "@sensoro/sensoro-map";

export default () => {
  return (
    <PositionSelector
      onChange={(val) => {
        console.info("=====>坐标change", val);
      }}
      style={{ width: 800, height: 600 }}
    />
  );
};
