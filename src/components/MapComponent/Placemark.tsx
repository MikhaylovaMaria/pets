import React from "react";
import { Placemark as YandexPlacemark } from "@pbe/react-yandex-maps";

interface PlacemarkProps {
  geometry: [number, number];
  properties: {
    hintContent: string;
    balloonContent: string;
  };
}

const PlacemarkComponent: React.FC<PlacemarkProps> = ({ geometry, properties }) => {
  return <YandexPlacemark geometry={geometry} properties={properties} />;
};

export default PlacemarkComponent;
