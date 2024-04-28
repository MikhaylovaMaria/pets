import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Map } from "../../types/types";
import { customMarkerIcon } from "./iconsMap";

export const MapLeafletAnn: React.FC<Map> = ({ clickedPosition = [0, 0] }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // overflowY: "hidden",
      }}
    >
      <MapContainer
        key={clickedPosition.toString()}
        center={clickedPosition}
        zoom={15}
        style={{ width: "auto" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        fff
        <Marker position={clickedPosition} icon={customMarkerIcon} />
      </MapContainer>
    </div>
  );
};
