import L from "leaflet";
// L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";
export const customMarkerIcon = new L.Icon({
  iconUrl:
    "https://res.cloudinary.com/dh2eb0xye/image/upload/v1713634182/xee1vrwoqan849wrdksc.png",
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const customMarkerIconMissing = new L.Icon({
  iconUrl:
    "https://res.cloudinary.com/dh2eb0xye/image/upload/v1713785994/amkvpuhlggkvqryzgn3x.png",
  iconSize: [41, 41],
});

export const customMarkerIconFound = new L.Icon({
  iconUrl:
    "https://res.cloudinary.com/dh2eb0xye/image/upload/v1713785991/ewmmrxhg177afcjgatak.png",
  iconSize: [41, 41],
});

export const customMarkerIconHelp = new L.Icon({
  iconUrl:
    "https://res.cloudinary.com/dh2eb0xye/image/upload/v1713785992/vetbtskdxjqesr3zsj3o.png",
  iconSize: [41, 41],
});
