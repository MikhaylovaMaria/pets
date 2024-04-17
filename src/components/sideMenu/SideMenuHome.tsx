import React from "react";
import Sider from "antd/es/layout/Sider";
import { Space, Typography } from "antd";
import styles from "./index.module.css";
import { menuItem } from "../../types/types";

type Props = {
  menu: menuItem[];
  isActive: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
};

const SideMenuHome = ({ menu, isActive, setIsActive }: Props) => {
  return (
    <Sider
      style={{
        borderRadius: "0",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {menu.map((el) => (
          <li onClick={() => setIsActive(el.key)}>
            <Typography.Title
              level={5}
              key={el.key}
              className={el.key === isActive ? styles.active : styles.nonActive}
            >
              <Space direction="horizontal">
                {el.icon}
                {el.text}
              </Space>
            </Typography.Title>
          </li>
        ))}
      </div>
    </Sider>
  );
};

export default SideMenuHome;
