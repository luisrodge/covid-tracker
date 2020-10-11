import React from "react";
import { Marker as MapMarker, FlyToInterpolator } from "react-map-gl";
import { easeCubic } from "d3-ease";

const Marker = ({
  cluster,
  points,
  setViewport,
  viewport,
  supercluster,
  setPopupInfo,
}) => {
  const [longitude, latitude] = cluster.geometry.coordinates;
  const { cluster: isCluster, point_count: pointCount } = cluster.properties;

  let clusterLevel;

  if (pointCount <= 100) {
    clusterLevel = 1;
  } else if (pointCount > 100 && pointCount <= 750) {
    clusterLevel = 2;
  } else {
    clusterLevel = 3;
  }

  if (isCluster) {
    return (
      <MapMarker
        key={`cluster-${cluster.id}`}
        latitude={latitude}
        longitude={longitude}
      >
        <div
          className={`cluster-marker cluster-marker-${clusterLevel}`}
          style={{
            width: `${10 + (pointCount / points.length) * 60}px`,
            height: `${10 + (pointCount / points.length) * 60}px`,
          }}
          onClick={() => {
            const items = supercluster.getLeaves(cluster.id);

            setPopupInfo({
              latitude,
              longitude,
              district: items[0].properties.district,
            });
            // const expansionZoom = Math.min(
            //   supercluster.getClusterExpansionZoom(cluster.id),
            //   20
            // );

            // setViewport({
            //   ...viewport,
            //   latitude,
            //   longitude,
            //   zoom: expansionZoom,
            //   transitionDuration: 1000,
            //   transitionInterpolator: new FlyToInterpolator(),
            //   transitionEasing: easeCubic,
            // });
          }}
        >
          {pointCount}
        </div>
      </MapMarker>
    );
  }

  return (
    <MapMarker
      key={`crime-${cluster.properties.crimeId}`}
      latitude={latitude}
      longitude={longitude}
    >
      <div className="marker"></div>
    </MapMarker>
  );
};

export default Marker;
