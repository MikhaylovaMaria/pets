import React, { useEffect, useState } from "react";
import { Avatar, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { Paths } from "../../path";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useLocation } from "react-router-dom";

const CustomBreadcrumb = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [showProfilemenu, setProfileMenu] = useState(true);

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
    { path: Paths.announcement, title: "Объявления", key: "announcement" },
    { path: Paths.articles, title: "Образования", key: "articles" },
    { path: Paths.chats, title: "Форум", key: "chat" },
  ];

  const profileLinks: mainLinks[] = [
    { path: Paths.home, title: "Моя страница", key: "Профиль" },
    { path: Paths.chats, title: "Сообщения", key: "Профиль" },
    { path: Paths.home, title: "Выход", key: "Профиль" },
  ];
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");

  const [currentLink, setCurrentLink] = useState(parts[parts.length - 1]);

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
              <Link to={link.path}>
                <Typography.Title level={4} style={{ marginBottom: "0" }}>
                  {link.title}
                </Typography.Title>
              </Link>
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
            <Link to={link.path}>
              <Typography.Title level={5}>{link.title}</Typography.Title>
            </Link>
          </li>
        ))}
        {profileLinks.map((link, index) => (
          <li key={index} onClick={() => setCurrentLink("Профиль")}>
            <Link to={link.path}>
              <Typography.Title level={5}>{link.title}</Typography.Title>
            </Link>
          </li>
        ))}
      </div>
      {showProfilemenu && (
        <div className={styles.dropdownMenuProfileOpen}>
          {profileLinks.map((link, index) => (
            <li key={index} onClick={() => setCurrentLink("Профиль")}>
              <Link to={link.path}>
                <Typography.Title level={5}>{link.title}</Typography.Title>
              </Link>
            </li>
          ))}
        </div>
      )}
    </>
  );
};

export default CustomBreadcrumb;
