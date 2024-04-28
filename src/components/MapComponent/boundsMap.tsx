import { useMapEvents } from "react-leaflet";

const BoundsMap = () => {
  useMapEvents({
    moveend(event) {
      console.log("Map moved to:", event.target.getBounds());
    },
    zoomend(event) {
      console.log("Map zoomed to:", event.target.getBounds());
    },
  });

  return null;
};

export default BoundsMap;
