import React, { useState, useRef } from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import { useQuery } from "react-query";


import Loading from "../components/Loading";
import ClusterInfo from "../components/ClusterInfo";
import Clusters from "../components/Clusters";
import Panel from "../components/Panel";
import Error from "../components/Error";
import api from "../data/api";

export default function Main() {
  const [viewport, setViewport] = useState({
    latitude: 17.124,
    longitude: -87.567,
    width: "100vw",
    height: "100vh",
    zoom: 7.3,
  });
  const [popupInfo, setPopupInfo] = useState(null);

  const mapRef = useRef();

  const { data, error, isFetching } = useQuery("data", async () => await api());

  if (isFetching) return <Loading />;

  if (error)
    return <Error message="Something went wrong. Failed to load data." />;

  return (
    <React.Fragment>
      <div className="site-title">
        Belize <span>Covid</span> Tracker
      </div>

      <div className="wrapper">
        <div className="column panel">
          <Panel data={data} />
        </div>
        <div className="column map">
          <ReactMapGL
            {...viewport}
            maxZoom={20}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(newViewport) => {
              setViewport({ ...newViewport });
            }}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            ref={mapRef}
            scrollZoom={false}
            dragPan={false}
            touchZoom={false}
            doubleClickZoom={false}
            touchRotate={false}
          >
            {popupInfo && (
              <Popup
                tipSize={0}
                anchor="bottom"
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                closeOnClick={true}
                onClose={() => setPopupInfo(null)}
                offsetLeft={10}
                className="cluster-popup"
              >
                <ClusterInfo textInfo={popupInfo.text} />
              </Popup>
            )}
            <Clusters
              viewport={viewport}
              setViewport={setViewport}
              setPopupInfo={setPopupInfo}
              mapRef={mapRef}
              data={data}
            />
          </ReactMapGL>
        </div>
      </div>
    </React.Fragment>
  );
}
