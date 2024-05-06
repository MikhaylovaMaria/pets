import React, { useEffect, useState } from "react";
import { Avatar, Space, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { currentUserId } from "../../redux/slices/user";
import MediaQuery from "react-responsive";

const CustomBreadcrumb = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [currentLink, setCurrentLink] = useState("Профиль");

  const currentId = useSelector(currentUserId);

  type mainLinks = {
    path: string;
    title: string;
    key: string;
  };

  const mainLink: mainLinks[] = [
    { path: `/announcements`, title: "Объявления", key: "announcement" },
    { path: `/articles`, title: "Образование", key: "articles" },
    { path: `/admin`, title: "Админ", key: "админ" },
    { path: `/chats`, title: "Форум", key: "chat" },
  ];

  const profileLinks: mainLinks[] = [
    { path: `/${currentId}`, title: "Моя страница", key: "Профиль" },
    { path: `/${currentId}`, title: "Выход", key: "logOut" },
  ];

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
        <div>
          <MediaQuery minWidth={650}>
            <ul className={styles.links}>
              {mainLink.map((link) => (
                <NavLink to={link.path} end key={link.key}>
                  <li
                    key={link.key}
                    onClick={() => {
                      setCurrentLink(link.key);
                    }}
                    className={link.key === currentLink ? styles.activeBtn : ""}
                  >
                    <Typography.Title level={4} style={{ marginBottom: "0" }}>
                      {link.title}
                    </Typography.Title>
                  </li>
                </NavLink>
              ))}
              <li key="Профиль">
                <div onClick={() => setShowMenu(!showMenu)}>
                  <Space.Compact>
                    <Typography.Title level={4} style={{ marginBottom: "0" }}>
                      Профиль <DownOutlined style={{ width: "18px" }} />
                    </Typography.Title>
                  </Space.Compact>
                </div>
              </li>
              {showMenu && (
                <div className={styles.dropdownMenuProfileOpen}>
                  {profileLinks.map((link, index) => (
                    <NavLink to={link.path} key={link.key}>
                      <li
                        key={index}
                        onClick={() => {
                          setCurrentLink("");
                          setShowMenu(true);
                        }}
                      >
                        <Typography.Title level={5}>
                          {link.title}
                        </Typography.Title>
                      </li>
                    </NavLink>
                  ))}
                </div>
              )}
            </ul>
          </MediaQuery>

          <MediaQuery maxWidth={650}>
            <div
              className={styles.toggleBtn}
              onClick={() => setShowMenu(!showMenu)}
            >
              <MenuOutlined />
            </div>
            <div
              className={
                !showMenu ? styles.dropdownMenu : styles.dropdownMenuOpen
              }
            >
              {mainLink.map((link, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setCurrentLink(link.key);
                    setShowMenu(false);
                  }}
                >
                  <NavLink to={link.path}>
                    <Typography.Title level={5}>{link.title}</Typography.Title>
                  </NavLink>
                </li>
              ))}
              {profileLinks.map((link, index) => (
                <NavLink to={link.path}>
                  <li
                    key={index}
                    onClick={() => {
                      setCurrentLink("");
                      setShowMenu(false);
                    }}
                  >
                    <Typography.Title level={5}>{link.title}</Typography.Title>
                  </li>
                </NavLink>
              ))}
            </div>
          </MediaQuery>
        </div>
      </div>
    </>
  );
};

export default CustomBreadcrumb;
