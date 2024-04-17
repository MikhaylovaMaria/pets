import React, { useEffect, useState } from "react";
import {
  YMaps,
  Map,
  Button,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import PlacemarkComponent from "./Placemark";
import { Layout } from "antd";

interface Coordinates {
  lat: number;
  lon: number;
}

interface PlacemarkData {
  geometry: [number, number];
  properties: {
    hintContent: string;
    balloonContent: string;
  };
}
export const MapComponent1: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<Coordinates | null>(null);
  const [placemarks, setPlacemarks] = useState<PlacemarkData[]>([]);

  const mapState = {
    center: [55.75, 37.57],
    zoom: 15,
  };

  const handleMapClick = (event: any) => {
    const clickedPoint = event.get("coords");
    setSelectedPoint({ lat: clickedPoint[0], lon: clickedPoint[1] });
  };

  return (
    <Layout>
      <div id="map" style={{ width: "100%", height: "100%" }}>
        <YMaps>
          <Map defaultState={mapState} onClick={handleMapClick}>
            {placemarks.map((placemark, index) => (
              <PlacemarkComponent
                key={index}
                geometry={placemark.geometry}
                properties={placemark.properties}
              />
            ))}

            <ZoomControl />
          </Map>
        </YMaps>
      </div>
    </Layout>
  );
};
