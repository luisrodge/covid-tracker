import React from "react";
import { Marker as MapMarker, FlyToInterpolator } from "react-map-gl";
import { easeCubic } from "d3-ease";

const clusterClassName = (type, pointCount) => {
  let className = "";

  if (type === "recovered") {
    className = "recovered-cluster";
  } else {
    if (pointCount <= 100) {
      className = "cluster-marker-1";
    } else if (pointCount > 100 && pointCount <= 750) {
      className = "cluster-marker-2";
    } else {
      className = "cluster-marker-3";
    }
  }

  return className;
};

const Marker = ({
  cluster,
  points,
  setViewport,
  viewport,
  supercluster,
  setPopupInfo,
  type,
}) => {
  const [longitude, latitude] = cluster.geometry.coordinates;
  const { cluster: isCluster, point_count: pointCount, point_count_abbreviated: pointCountAbbreviated } = cluster.properties;

  if (isCluster) {
    return (
      <MapMarker
        key={`cluster-${cluster.id}`}
        latitude={latitude}
        longitude={longitude}
      >
        <div
          className={`cluster-marker ${clusterClassName(type, pointCount)}`}
          style={{
            width: `${10 + (pointCount / points.length) * 60}px`,
            height: `${10 + (pointCount / points.length) * 60}px`,
          }}
          onClick={() => {
            const items = supercluster.getLeaves(cluster.id);

            setPopupInfo({
              latitude,
              longitude,
              text: items[0].properties.text,
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
          {pointCountAbbreviated}
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
