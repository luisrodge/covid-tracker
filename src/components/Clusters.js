import React from "react";

import Marker from "./Marker";

const Clusters = ({
  clusters,
  recoveredClusters,
  supercluster,
  viewport,
  setViewport,
  setPopupInfo,
  points,
}) => {
  const renderClusters = () => {
    const recovClusters = recoveredClusters.map((cluster) => (
      <Marker
        cluster={cluster}
        points={points}
        setViewport={setViewport}
        viewport={viewport}
        supercluster={supercluster}
        setPopupInfo={setPopupInfo}
        type="recovered"
      />
    ));

    const activeClusters = clusters.map((cluster) => (
      <Marker
        cluster={cluster}
        points={points}
        setViewport={setViewport}
        viewport={viewport}
        supercluster={supercluster}
        setPopupInfo={setPopupInfo}
      />
    ));

    return [...activeClusters, ...recovClusters];
  };

  return renderClusters();
};

export default Clusters;
