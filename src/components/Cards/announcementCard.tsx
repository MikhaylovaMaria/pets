import { Card, Flex, Image, Space, Typography } from "antd";
import styles from "./index.module.css";

import "../../utils/dataTyme";
import { Announment } from "../../types/types";

import { MapLeafletAnn } from "../MapComponent/mapLeafletAnn";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
type Props = {
  // announcement: Announment;
  announcement: any;
};

export const AnnouncementCard = ({ announcement }: Props) => {
  const [showCard, setshowCard] = useState(false);
  console.log(announcement.dataValues.description);
  return (
    <Card
      key={announcement.announcementId}
      // title={announcement.announcementTitle}
      title={
        <>
          <Space>
            <button>Подтвердить</button>
            <button>Удалить</button>
          </Space>
        </>
      }
      style={{
        margin: "5px",
        backgroundColor: "#FFFDF5",
        width: "100%",
        height: "max-content",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {
          <Typography.Text>
            {announcement.dataValues.description}
          </Typography.Text>
        }
        <Typography.Text>
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => setshowCard(!showCard)}
          >
            {!showCard ? (
              <Space direction="vertical" align="start">
                <span>
                  Показать на карте <EyeOutlined />
                </span>
                Показать фотографии объявления
              </Space>
            ) : (
              <>
                {" "}
                Скрыть карту <EyeInvisibleOutlined />
              </>
            )}
          </button>
        </Typography.Text>

        {showCard && (
          <div style={{ width: "100%", height: "200px" }}>
            <MapLeafletAnn
              clickedPosition={announcement.announcementLocation}
            />
          </div>
        )}
      </Space>
    </Card>
  );
};
