import { useMapEvents } from "react-leaflet";

interface ClickHandlerProps {
  onMapClick: (e: L.LeafletMouseEvent) => void;
  setSearchAddress: (address: string) => void;
}

const ClickHandler: React.FC<ClickHandlerProps> = ({
  onMapClick,
  setSearchAddress,
}) => {
  //   const onMapClick = (e: L.LeafletMouseEvent) => {
  //     console.log("You clicked the map at " + e.latlng);
  //   };

  useMapEvents({
    click: (e) => {
      onMapClick(e);
      setSearchAddress("");
    },
  });

  return null;
};

export default ClickHandler;
