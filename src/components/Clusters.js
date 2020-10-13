import React from "react";
import useSupercluster from "use-supercluster";

import Marker from "./Marker";

const Clusters = ({ data, viewport, setViewport, setPopupInfo, mapRef }) => {
  const { cases, recovered, deaths } = data;

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const points = [];
  cases.forEach((caseValue) => {
    const casesCount = caseValue.active;

    for (let i = 0; i < casesCount; i++) {
      const point = {
        type: "Feature",
        properties: {
          cluster: false,
          text: `${caseValue.district} District`,
          offsetLeft: caseValue.offsetLeft,
          offsetTop: caseValue.offsetTop,
        },
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(caseValue.longitude),
            parseFloat(caseValue.latitude),
          ],
        },
      };
      points.push(point);
    }
  });

  const recoveredPoints = [];
  for (let i = 0; i < recovered.total; i++) {
    const point = {
      type: "Feature",
      properties: { cluster: false, text: "Countrywide Recoveries" },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(recovered.longitude),
          parseFloat(recovered.latitude),
        ],
      },
    };
    recoveredPoints.push(point);
  }

  const deceasedPoints = [];
  for (let i = 0; i < deaths.total; i++) {
    const point = {
      type: "Feature",
      properties: { cluster: false, text: "Countrywide Deaths" },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(deaths.longitude),
          parseFloat(deaths.latitude),
        ],
      },
    };
    deceasedPoints.push(point);
  }

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const {
    clusters: recoveredClusters,
    supercluster: recoveredSupercluster,
  } = useSupercluster({
    points: recoveredPoints,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const {
    clusters: deceasedClusters,
    supercluster: deceasedSupercluster,
  } = useSupercluster({
    points: deceasedPoints,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

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

    return [...activeClusters, ...deathsClusters, recovClusters];
  };

  return renderClusters();
};

export default Clusters;
