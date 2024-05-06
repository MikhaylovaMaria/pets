import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import ClickHandler from "./clickHandler";
import SideMenuMap from "./sideMenuMap";
import MarkerMap from "./marker";
import { useSelector } from "react-redux";
import { announcementTypeAll } from "../../redux/slices/announcements";
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
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

  const centerString = localStorage.getItem("centerMap");
  const center = centerString
    ? JSON.parse(centerString)
    : { lat: 59.938935, lng: 30.304154 };

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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapContainer
        key={center.toString()}
        center={center}
        zoom={13}
        zoomControl={false}
        style={{ width: "auto" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onMapClick={onMapClick} />
        <BoundsMap />
        <ZoomControl position="topright" />

        {!showdetails && (
          <div>
            {sideMenuOpen ? (
              <SideMenuMap
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
