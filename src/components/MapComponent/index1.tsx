import React, { useEffect, useState } from "react";
import {
  YMaps,
  Map,
  Button,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import PlacemarkComponent from "./Placemark";
import SideMenu from "../sideMenu/SideMenu";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

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
      <Sider width="15vw" style={{ backgroundColor: "#D2B48C" }}>
        <SideMenu />
      </Sider>
      <Content>
        <YMaps>
          <Map
            defaultState={mapState}
            onClick={handleMapClick}
            width="65vw"
            height="80vh"
          >
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
      </Content>
    </Layout>
  );
};
