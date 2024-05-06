export const getAddressFromCoordinates = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();

    const city =
      data.address.city || data.address.town || data.address.village || "";
    const road = data.address.road || "";
    const houseNumber = data.address.house_number || "";
    let address = city;
    if (road) {
      address += ", " + road;
    }
    if (houseNumber) {
      address += ", " + houseNumber;
    }
    return address;
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};

// Координаты от адреса

// const handleSearch = async (value: string) => {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=1`
//     );
//     const data = await response.json();
//     if (data.length > 0) {
//       const { lat, lon } = data[0];
//       setCityCoordinates([parseFloat(lat), parseFloat(lon)]);
//     } else {
//       console.log("Город не найден");
//     }
//   } catch (error) {
//     console.error("Ошибка при поиске города:", error);
//   }
// };
