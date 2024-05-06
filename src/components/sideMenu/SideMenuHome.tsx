import React from "react";
import Sider from "antd/es/layout/Sider";
import { Space, Typography } from "antd";
import styles from "./index.module.css";
import { menuItem } from "../../types/types";
import { NavLink, useLocation } from "react-router-dom";
import { MessageOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import MediaQuery from "react-responsive";

const SideMenuHome = () => {
  const userId = localStorage.getItem("userId");
  const loc = useLocation();

  const menu: menuItem[] = [
    {
      key: "UserOutlined",
      text: "Моя страница",
      icon: <UserOutlined />,
      link: `/${userId}`,
    },
    {
      key: "TeamOutlined",
      text: "Подписки",
      icon: <TeamOutlined />,
      link: "/allUsers",
    },
    {
      key: "MessageOutlined",
      text: "Мои сообщения",
      icon: <MessageOutlined />,
      link: "/chats",
    },
  ];

  return (
    <Sider
      style={{
        borderRadius: "0",
        position: "relative",
      }}
      width="max-content"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {menu.map((el) => (
          <NavLink to={`${el.link}`}>
            <Typography.Title
              level={5}
              key={el.key}
              className={
                loc.pathname === el.link ? styles.active : styles.nonActive
              }
            >
              <Space direction="horizontal">
                {el.icon}
                <MediaQuery minWidth={650}>{el.text}</MediaQuery>
              </Space>
            </Typography.Title>
          </NavLink>
        ))}
      </div>
    </Sider>
  );
};

export default SideMenuHome;
