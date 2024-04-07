import { Layout } from "../../components/layout/layout";
import { Col, Row, Space } from "antd";

import SideMenuHome from "../../components/sideMenu/SideMenuHome";
import { HomeLK } from "../../components/Cards/HomeLK";
import { useState } from "react";

import {
  MessageOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const Home = () => {
  const menu = [
    {
      key: "UserOutlined",
      text: "Личные данные",
      icon: <UserOutlined />,
    },
    { key: "TeamOutlined", text: "Мои друзья", icon: <TeamOutlined /> },
    { key: "SearchOutlined", text: "Мои объявления", icon: <SearchOutlined /> },
    {
      key: "MessageOutlined",
      text: "Мои сообщения",
      icon: <MessageOutlined />,
    },
  ];
  const [isActive, setIsActive] = useState(menu[0].key);

  const changeActive = (el: any) => {
    setIsActive(el.key);
  };

  return (
    <Layout>
      <Row
        align="top"
        justify="center"
        style={{
          height: "100vh",
          backgroundColor: "#F5F3EE",
          padding: "46px",
        }}
      >
        <Space direction="horizontal" style={{ width: "100%" }}>
          <Col flex="none" style={{ display: "flex", alignItems: "stretch" }}>
            <SideMenuHome
              menu={menu}
              isActive={isActive}
              onChange={changeActive}
            />
          </Col>
          <Col flex="auto" style={{ display: "flex", alignItems: "stretch" }}>
            <HomeLK />
          </Col>
        </Space>
      </Row>
    </Layout>
  );
};
