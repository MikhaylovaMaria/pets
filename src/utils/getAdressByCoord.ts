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
