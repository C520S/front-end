import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const MapLeaflet = (props) => {
  const { gecode, popUp } = props;
  const mapCenter = gecode;

  const PandaLoction = new Icon({
    iconUrl: require("../Images/pandaLocation.png"),

    iconSize: [50, 50],
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      id="panda-map"
    >
      <MapContainer
        center={mapCenter}
        zoom={15}
        style={{
          height: "50vh",
          width: "50vw",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={gecode} key={1} icon={PandaLoction}>
          <Popup>{popUp}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapLeaflet;
