import { useMapEvents } from "react-leaflet";

interface ClickHandlerProps {
  onMapClick: (e: L.LeafletMouseEvent) => void;
}

const ClickHandler: React.FC<ClickHandlerProps> = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });

  return null;
};

export default ClickHandler;
