import React, { useEffect, useState } from "react";
import { Avatar, Space, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { currentUserId } from "../../redux/slices/user";

const CustomBreadcrumb = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [showProfilemenu, setProfileMenu] = useState(true);

  const currentId = useSelector(currentUserId);

  const openMenu = () => {
    setShowMenu(!showMenu);
  };
  const openMenuProfile = () => {
    setProfileMenu(!showProfilemenu);
  };

  type mainLinks = {
    path: string;
    title: string;
    key: string;
  };

  const mainLinks: mainLinks[] = [
    { path: `/announcements`, title: "Объявления", key: "announcement" },
    { path: `/articles`, title: "Образования", key: "articles" },
    { path: `/chats`, title: "Форум", key: "chat" },
    // { path: `/${currentId}`, title: "Моя страница", key: "Профиль" },
  ];

  const profileLinks: mainLinks[] = [
    { path: `${currentId}`, title: "Моя страница", key: "Профиль" },
    { path: `${currentId}`, title: "Сообщения", key: "Профиль" },
    { path: `${currentId}`, title: "Выход", key: "Профиль" },
  ];

  const [currentLink, setCurrentLink] = useState("Профиль");

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Space direction="horizontal" className={styles.logoContainer}>
            <Avatar
              size={50}
              src={
                "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRYoUQ71mYPRwm56qEB_RsK2ilDRLaAepOoQ34frrYqZWQrPDFN"
              }
            />
            <h1 className={styles.logo}>Pets</h1>
          </Space>
        </div>
        <ul className={styles.links}>
          {mainLinks.map((link, index) => (
            <li
              key={index}
              onClick={() => {
                setCurrentLink(link.key);
                setProfileMenu(true);
              }}
              className={link.key === currentLink ? styles.activeBtn : ""}
            >
              <NavLink to={link.path} end>
                <Typography.Title level={4} style={{ marginBottom: "0" }}>
                  {link.title}
                </Typography.Title>
              </NavLink>
            </li>
          ))}
          <li
            onClick={() => setCurrentLink("Профиль")}
            className={currentLink === "Профиль" ? styles.activeBtn : ""}
          >
            <div onClick={openMenuProfile}>
              <Space.Compact>
                <Typography.Title level={4} style={{ marginBottom: "0" }}>
                  Профиль <DownOutlined style={{ width: "18px" }} />
                </Typography.Title>
              </Space.Compact>
            </div>
          </li>
        </ul>
        <div className={styles.toggleBtn} onClick={openMenu}>
          <MenuOutlined />
        </div>
      </div>
      <div className={showMenu ? styles.dropdownMenu : styles.dropdownMenuOpen}>
        {mainLinks.map((link, index) => (
          <li key={index}>
            <NavLink to={link.path}>
              <Typography.Title level={5}>{link.title}</Typography.Title>
            </NavLink>
          </li>
        ))}
        {profileLinks.map((link, index) => (
          <li key={index} onClick={() => setCurrentLink("Профиль")}>
            <NavLink to={link.path}>
              <Typography.Title level={5}>{link.title}</Typography.Title>
            </NavLink>
          </li>
        ))}
      </div>
      {showProfilemenu && (
        <div className={styles.dropdownMenuProfileOpen}>
          {profileLinks.map((link, index) => (
            <li key={index} onClick={() => setCurrentLink("Профиль")}>
              <NavLink to={link.path}>
                <Typography.Title level={5}>{link.title}</Typography.Title>
              </NavLink>
            </li>
          ))}
        </div>
      )}
    </>
  );
};

export default CustomBreadcrumb;
