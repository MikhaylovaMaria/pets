import React from "react";
import Sider from "antd/es/layout/Sider";
import { Space, Typography } from "antd";
import styles from "./index.module.css";

type ThemeItem = {
  key: string;
  text: string;
  icon: React.ReactNode;
};

type Props = {
  menu: ThemeItem[];
  isActive: string;
  onChange: (el: any) => void;
};

const SideMenuHome = ({ menu, isActive, onChange }: Props) => {
  return (
    <Sider
      style={{
        borderRadius: "0",
        position: "relative",
      }}
    >
      <Space direction="vertical">
        {menu.map((el) => (
          <Typography.Title
            level={5}
            key={el.key}
            className={el.key === isActive ? styles.active : styles.nonActive}
            // onClick={onChange(e)}
          >
            <Space direction="horizontal">
              {el.icon}
              {el.text}
            </Space>
          </Typography.Title>
        ))}
      </Space>
    </Sider>
  );
};

export default SideMenuHome;
