import { Card, Space, Typography } from "antd";
import styles from "./index.module.css";

import "../../utils/dataTyme";
import { Announment } from "../../types/types";

import { MapLeafletAnn } from "../MapComponent/mapLeafletAnn";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
type Props = {
  announcement: Announment;
};

export const AnnouncementCard = ({ announcement }: Props) => {
  const [showCard, setshowCard] = useState(false);
  return (
    <Card
      key={announcement.announcementId}
      title={announcement.announcementTitle}
      style={{
        margin: "5px",
        backgroundColor: "#FFFDF5",
        width: "100%",
        height: "max-content",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {<Typography.Text>{announcement.description}</Typography.Text>}
        <Typography.Text>
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => setshowCard(!showCard)}
          >
            {!showCard ? (
              <>
                Показать на карте <EyeOutlined />
              </>
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
