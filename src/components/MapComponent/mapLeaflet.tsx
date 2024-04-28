import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import ClickHandler from "./clickHandler";
import SideMenuMap from "./sideMenuMap";
import { SearchProps } from "antd/es/input";
import MarkerMap from "./marker";
import { useDispatch, useSelector } from "react-redux";
import {
  announcementTypeAll,
  announcementsInCity,
  fetchAnnouncements,
} from "../../redux/slices/announcements";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { NavLink } from "react-router-dom";
import { Map } from "../../types/types";
import BoundsMap from "./boundsMap";
import { customMarkerIcon } from "./iconsMap";

export const MapComponent: React.FC<Map> = ({
  showdetails,
  showMarker,
  clickedPosition = [0, 0],
  setClickedPosition,
  announcements,
}) => {
  // const dispatch = useDispatch<any>();

  // useEffect(() => {
  //   const getAnnoincements = async () => {
  //     dispatch(fetchAnnouncements());
  //   };
  //   getAnnoincements();
  // }, []);

  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

  const [cityCoordinates, setCityCoordinates] = useState<[number, number]>([
    59.94, 30.31,
  ]);

  const [address, setAddress] = useState<string>("");

  const [announcementTypes, setAnnouncementTypes] = useState([
    { announcementTypeId: 0, announcementTypeName: "Все объявления" },
  ]);
  const anotherTypes = useSelector(announcementTypeAll);

  useEffect(() => {
    if (anotherTypes && anotherTypes.length > 0) {
      const updatedTypes = [...announcementTypes, ...anotherTypes];
      setAnnouncementTypes(updatedTypes);
    }
  }, [anotherTypes]);

  // const announcements = useSelector(announcementsInCity);

  const [currentTypeAnnoun, setCurrentTypeAnnoun] = useState<number>(
    announcementTypes[0].announcementTypeId
  );

  const [currentViewAnnoun, setCurrentViewAnnoun] = useState(announcements);

  useEffect(() => {
    if (currentTypeAnnoun === 0) {
      setCurrentViewAnnoun(announcements || []);
    } else {
      const viewAnnou = announcements?.filter(
        (el) => el.announcementTypeId === currentTypeAnnoun
      );
      setCurrentViewAnnoun(viewAnnou || []);
    }
  }, [currentTypeAnnoun, announcements?.length]);

  const onMapClick = (e: L.LeafletMouseEvent) => {
    if (showdetails) {
      setClickedPosition([e.latlng.lat, e.latlng.lng]);
    }
  };

  const handleSearch = async (value: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCityCoordinates([parseFloat(lat), parseFloat(lon)]);
      } else {
        console.log("Город не найден");
      }
    } catch (error) {
      console.error("Ошибка при поиске города:", error);
    }
  };

  const onSearch: SearchProps["onSearch"] = (value) => handleSearch(value);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // overflowY: "hidden",
      }}
    >
      <MapContainer
        key={cityCoordinates.toString()}
        center={cityCoordinates}
        zoom={13}
        zoomControl={false}
        style={{ width: "auto" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onMapClick={onMapClick} setSearchAddress={setAddress} />
        <BoundsMap />
        <ZoomControl position="topright" />

        {!showdetails && (
          <div>
            {sideMenuOpen ? (
              <SideMenuMap
                onSearch={onSearch}
                setSideMenu={setSideMenuOpen}
                announmentTypes={announcementTypes}
                currentTypeAnnoun={currentTypeAnnoun}
                setCurrentTypeAnnoun={setCurrentTypeAnnoun}
              />
            ) : (
              <Button
                icon={<SearchOutlined />}
                onClick={() => setSideMenuOpen(true)}
                style={{
                  height: "max-content",
                  position: "absolute",
                  zIndex: "1000",
                  marginLeft: "1%",
                  marginTop: "5%",
                }}
              />
            )}
            <NavLink to={`/createAnnouncement`}>
              <Button
                icon={<PlusOutlined />}
                style={{
                  height: "max-content",
                  position: "absolute",
                  zIndex: "1000",
                  marginLeft: "1%",
                  marginTop: "10%",
                }}
              />
            </NavLink>
          </div>
        )}
        {!showdetails &&
          announcementTypes.length > 0 &&
          currentViewAnnoun &&
          currentViewAnnoun.map((el) => (
            <MarkerMap annoument={el} names={announcementTypes} />
          ))}
        {showMarker && (
          <Marker position={clickedPosition} icon={customMarkerIcon} />
        )}
      </MapContainer>
    </div>
  );
};

// Получить адрес по координатам
// const getAddressFromCoordinates = async (lat: number, lng: number) => {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
//     );
//     const data = await response.json();

//     const city =
//       data.address.city || data.address.town || data.address.village || "";
//     const road = data.address.road || "";
//     const houseNumber = data.address.house_number || "";
//     let address = city;
//     if (road) {
//       address += ", " + road;
//     }
//     if (houseNumber) {
//       address += ", " + houseNumber;
//     }
//     setAddress(address);
//   } catch (error) {
//     console.error("Error fetching address:", error);
//   }
// };
