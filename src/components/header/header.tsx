import React, { useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  Row,
  Col,
  Button,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { Paths } from "../../path";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./index.module.css";

const { Header } = Layout;

const menuItems = [
  { key: "articles", title: "Статьи", path: Paths.articles },
  { key: "announcement", title: "Объявления", path: Paths.announcement },
  { key: "profile", title: "Профиль" },
];

const CustomBreadcrumb = () => {
  const [showMenu, setShowMenu] = useState(true);

  const openMenu = () => {
    setShowMenu(!showMenu);
  };

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
          <li>
            <Link to={Paths.announcement} className={styles.links}>
              <Typography.Text>Объявления</Typography.Text>
            </Link>
          </li>
          <li>
            <Link to={Paths.articles}>
              <Typography.Text>Образования</Typography.Text>
            </Link>
          </li>
          <li>
            <Link to={Paths.chats}>
              <Typography.Text>Форум</Typography.Text>
            </Link>
          </li>
          <li>
            <Link to={Paths.home}>
              <Typography.Text>Профиль</Typography.Text>
            </Link>
          </li>
        </ul>
        <div className={styles.toggleBtn} onClick={openMenu}>
          <MenuOutlined />
        </div>
      </div>
      <div className={showMenu ? styles.dropdownMenu : styles.dropdownMenuOpen}>
        <li>
          <Link to={Paths.announcement}>
            <Typography.Text>Объявления</Typography.Text>
          </Link>
        </li>
        <li>
          <Link to={Paths.articles}>
            <Typography.Text>Образования</Typography.Text>
          </Link>
        </li>
        <li>
          <Link to={Paths.home}>
            <Typography.Text>Профиль</Typography.Text>
          </Link>
        </li>
      </div>
    </>

    // <Header className={`${styles.header}`}>
    //   <Row justify="space-between" align="middle">
    //     <Col>
    //       <Space>
    //         <Space direction="horizontal" className={styles.logoContainer}>
    //           <Avatar
    //             size={50}
    //             src={
    //               "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRYoUQ71mYPRwm56qEB_RsK2ilDRLaAepOoQ34frrYqZWQrPDFN"
    //             }
    //           />
    //           <h1 className={styles.logo}>Pets</h1>
    //         </Space>
    //       </Space>
    //     </Col>
    //     <Col>
    //       <Row gutter={[16, 16]} align="middle">
    //         <Col>
    //           {!showMenu && (
    //             <Button
    //               className={styles.menuButton}
    //               icon={<MenuOutlined />}
    //               onClick={toggleMenu}
    //             />
    //           )}
    //         </Col>
    //         <Col>
    //           <Menu
    //             theme="dark"
    //             mode="horizontal"
    //             selectedKeys={[current]}
    //             onClick={handleClick}
    //             className={`${styles.menu} ${showMenu ? "" : styles.hideMenu}`}
    //           >
    //             {menuItems.map((item) => (
    //               <Menu.Item key={item.key}>
    //                 {item.path ? (
    //                   <Link to={item.path}>{item.title}</Link>
    //                 ) : (
    //                   <span>{item.title}</span>
    //                 )}
    //               </Menu.Item>
    //             ))}
    //             <Menu.Item key="logout">
    //               <Dropdown
    //                 overlay={
    //                   <Menu>
    //                     <Menu.Item key="1">Настройки</Menu.Item>
    //                     <Menu.Item key="2" onClick={() => console.log("Выход")}>
    //                       Выход
    //                     </Menu.Item>
    //                   </Menu>
    //                 }
    //               >
    //                 <span>
    //                   Профиль <DownOutlined />
    //                 </span>
    //               </Dropdown>
    //             </Menu.Item>
    //           </Menu>
    //         </Col>
    //       </Row>
    //     </Col>
    //   </Row>
    // </Header>
  );
};

export default CustomBreadcrumb;
