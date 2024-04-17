import React from "react";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import SideMenu from "../sideMenu/SideMenu";

import Search from "antd/es/input/Search";
import { Button, Flex, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

export const MapComponent: React.FC = () => {
  const positionC: [number, number] = [59.94, 30.31];

  L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";
  const customMarkerIcon = new L.Icon({
    iconUrl:
      "https://cdn.icon-icons.com/icons2/317/PNG/512/map-marker-icon_34392.png", // Укажите путь к изображению иконки
    iconSize: [41, 41], // Размер иконки
    iconAnchor: [12, 41], // Точка, в которой иконка "прикрепляется" к карте (по центру внизу)
    popupAnchor: [1, -34], // Точка относительно иконки, где будет "вырастать" всплывающее окно
  });

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
      
      }}
    >
      {/* <SideMenu /> */}
      <MapContainer center={positionC} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div
          style={{
            width: "490px",
            backgroundColor: "#FFFFFF",
            height: "max-content",
            position: "absolute",
            zIndex: "1000",
            marginTop: "6%",
            paddingBottom: "1%",
            marginLeft: "1%",
            borderRadius: "1rem",
          }}
        >
          <Flex justify="center">
            <Search
              placeholder="Санкт-Петербург"
              style={{
                marginTop: "20px",
                width: "90%",
              }}
            />
          </Flex>
          <Flex justify="center">
            <Space direction="vertical">
              <div>
                <Space
                  direction="vertical"
                  style={{ padding: "0", marginTop: "10px" }}
                >
                  <Typography.Text style={{ padding: "0", color: "#72675E" }}>
                    Тип объявления
                    <hr
                      style={{
                        width: "97%",
                        border: "0.1px solid #A79C93",
                      }}
                    />
                  </Typography.Text>

                  <Space direction="horizontal">
                    <Button
                      style={{ color: "#FDAB4A", border: "1px solid #FDAB4A" }}
                    >
                      Пропало животное
                    </Button>
                    <Button
                      style={{ color: "#A79C93", border: "1px solid #A79C93" }}
                    >
                      Найдено животное
                    </Button>
                    <Button
                      style={{ color: "#A79C93", border: "1px solid #A79C93" }}
                    >
                      Нужна помощь
                    </Button>
                  </Space>
                </Space>
              </div>
              <div>
                <Space direction="vertical" style={{ padding: "0" }}>
                  <Typography.Text style={{ padding: "0", color: "#72675E" }}>
                    Кто пропал?
                    <hr
                      style={{
                        width: "97%",
                        border: "0.1px solid #A79C93",
                      }}
                    />
                  </Typography.Text>
                  <Space direction="horizontal">
                    <Button
                      style={{ color: "#FDAB4A", border: "1px solid #FDAB4A" }}
                    >
                      Кошка
                    </Button>
                    <Button
                      style={{ color: "#A79C93", border: "1px solid #A79C93" }}
                    >
                      Собака
                    </Button>
                  </Space>
                </Space>
              </div>
              <div>
                <Space direction="vertical" style={{ padding: "0" }}>
                  <Typography.Text style={{ padding: "0", color: "#72675E" }}>
                    Порода
                    <hr
                      style={{
                        width: "97%",
                        border: "0.1px solid #A79C93",
                      }}
                    />
                  </Typography.Text>
                  <Space direction="horizontal">
                    <Button
                      style={{
                        color: "#72675E",
                        backgroundColor: "#FFE8D4",
                        border: "none",
                      }}
                    >
                      Все породы
                      <DownOutlined />
                    </Button>
                  </Space>
                </Space>
              </div>
              <div>
                <Space direction="vertical" style={{ marginTop: "20px" }}>
                  <Space direction="horizontal">
                    <Button
                      style={{
                        color: "#72675E",
                        backgroundColor: "#FFBD6F",
                        border: "none",
                      }}
                    >
                      <Typography.Text> Показать объявления</Typography.Text>
                    </Button>
                    <Button
                      style={{ color: "#72675E", border: "1px solid #72675E" }}
                    >
                      Закрыть
                    </Button>
                  </Space>
                </Space>
              </div>
            </Space>
          </Flex>
        </div>
        <Marker position={[59.94, 30.31]} icon={customMarkerIcon}>
          <Popup>
            <>
              <Typography.Text style={{ color: "red" }}>
                Пропал котенок белого цвета, 7 апреля{" "}
              </Typography.Text>
              <Button type="link">Подробнее</Button>
            </>
          </Popup>
        </Marker>
        <Marker position={[59.93, 30.32]}>
          <Popup>54, 55</Popup>
        </Marker>
        <Marker position={[59.95, 30.32]}>
          <Popup>54, 55</Popup>
        </Marker>
        <Marker position={[59.95, 30.35]}>
          <Popup>54, 55</Popup>
        </Marker>
        <Marker position={[59.96, 30.32]}>
          <Popup>54, 55</Popup>
        </Marker>
        <Marker position={[59.96, 30.29]}>
          <Popup>54, 55</Popup>
        </Marker>
        <Marker position={[59.96, 30.25]}>
          <Popup>54, 55</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
