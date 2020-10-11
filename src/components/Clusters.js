import React from "react";

import Marker from "./Marker";

const Clusters = ({
  clusters,
  recoveredClusters,
  supercluster,
  recoveredSupercluster,
  deceasedSupercluster,
  deceasedClusters,
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
        supercluster={recoveredSupercluster}
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

    const deathsClusters = deceasedClusters.map((cluster) => (
      <Marker
        cluster={cluster}
        points={points}
        setViewport={setViewport}
        viewport={viewport}
        supercluster={deceasedSupercluster}
        setPopupInfo={setPopupInfo}
        type="deceased"
      />
    ));

    return [...activeClusters, ...recovClusters, deathsClusters];
  };

  return renderClusters();
};

export default Clusters;
