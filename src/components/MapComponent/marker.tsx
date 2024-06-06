import { Button, Space, Typography } from "antd";
import { Marker, Popup } from "react-leaflet";
import { Announment, announcementType } from "../../types/types";
import { useState } from "react";
import CustomModal from "../modal/modal";
import {
  customMarkerIconFound,
  customMarkerIconHelp,
  customMarkerIconMissing,
} from "./iconsMap";

type props = {
  annoument: Announment;
  names: announcementType[];
};

const MarkerMap = ({ annoument, names }: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getCurrentMarkerIcon = (id: any) => {
    const name = names.find(
      (el) => el.announcementTypeId === id
    )?.announcementTypeName;
    if (name === "Пропало животное") {
      return customMarkerIconMissing;
    } else if (name === "Найдено животное") {
      return customMarkerIconFound;
    } else {
      return customMarkerIconHelp;
    }
  };
  return (
    <>
      {names && (
        <Marker
          key={annoument.announcementId}
          position={annoument.announcementLocation}
          icon={getCurrentMarkerIcon(annoument.announcementTypeId)}
        >
          <Popup>
            <Space direction="vertical">
              <Typography.Text style={{ color: "red" }}>
                {annoument.announcementTitle}
              </Typography.Text>
              <Button onClick={() => setIsModalOpen(true)}>
                Перейти к объявлению
              </Button>
            </Space>
          </Popup>
        </Marker>
      )}
      <CustomModal
        announcement={annoument}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default MarkerMap;
