import React from "react";

import Marker from "./Marker";

const Clusters = ({
  clusters,
  supercluster,
  viewport,
  setViewport,
  setPopupInfo,
  points,
}) => {
  return clusters.map((cluster) => (
    <Marker
      cluster={cluster}
      points={points}
      setViewport={setViewport}
      viewport={viewport}
      supercluster={supercluster}
      setPopupInfo={setPopupInfo}
    />
  ));
};

export default Clusters;
