import { useMapEvents } from "react-leaflet";
import L from "leaflet";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { newBoundsCoords } from "../../redux/slices/defaultValues";

const BoundsMap = () => {
  const dispatch: AppDispatch = useDispatch();
  useMapEvents({
    moveend(event) {
      //Предыдущее значение
      const prevBounds = localStorage.getItem("bounds");

      //Текущее значение
      const bounds = event.target.getBounds();
      const { _southWest, _northEast } = bounds;

      // изменение предыдущего

      if (prevBounds) {
        const prevBoundsMap = JSON.parse(prevBounds);
        const southWest = L.latLng(
          prevBoundsMap.southWest[0],
          prevBoundsMap.southWest[1]
        );

        const latDiffW = Math.abs(_southWest.lat - southWest.lat);
        const lngDiffW = Math.abs(_southWest.lng - southWest.lng);

        if (latDiffW > 0.1 && lngDiffW > 0.1) {
          console.log("меняем");
          const boundsObject = {
            southWest: [_southWest.lat, _southWest.lng],
            northEast: [_northEast.lat, _northEast.lng],
          };

          const boundsString = JSON.stringify(boundsObject);
          window.localStorage.setItem("bounds", boundsString);
          dispatch(newBoundsCoords(boundsString));
        }
      } else {
        console.log("aaa");
        const boundsObject = {
          southWest: [_southWest.lat, _southWest.lng],
          northEast: [_northEast.lat, _northEast.lng],
        };
        const boundsString = JSON.stringify(boundsObject);
        window.localStorage.setItem("bounds", boundsString);
        dispatch(newBoundsCoords(boundsString));
      }

      const center = event.target.getCenter();
      window.localStorage.setItem(
        "centerMap",
        JSON.stringify({ lat: center.lat, lng: center.lng })
      );
    },
  });

  return null;
};

export default BoundsMap;
