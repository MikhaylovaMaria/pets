import React from "react";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import SideMenu from "../sideMenu/SideMenu";

export const MapComponent: React.FC = () => {
  // const position: [number, number] = [55.14, 86.07];

  const position1: [number, number] = [86, 55];
  L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

  let latlngs: [number, number][] = [
    [54.9141, 73.1149], // Юго-западная точка
    [54.9141, 73.6592], // Юго-восточная точка
    [55.0628, 73.6592], // Северо-восточная точка
    [55.0628, 73.1149]  // Северо-западная точка
  ];
  const position = latlngs[0];
  return (
    <div>
      <SideMenu />
      <MapContainer center={position} zoom={11} style={{ height: "75vh" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon positions={latlngs} />
        <Marker position={position}>
          <Popup>A pretty CSS3 popup. Easily customizable.</Popup>
        </Marker>
        <Marker position={position1}>
          <Popup>A pretty CSS3 popup. Easily customizable.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
