import { Layout } from "../../components/layout/layout";
import { Flex } from "antd";

import SideMenuHome from "../../components/sideMenu/SideMenuHome";
import { HomeLK } from "../../components/Cards/HomeLK";
import { useState } from "react";

import {
  MessageOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { menuItem } from "../../types/types";

export const Home = () => {
  const menu: menuItem[] = [
    {
      key: "UserOutlined",
      text: "Личные данные",
      icon: <UserOutlined />,
    },
    { key: "TeamOutlined", text: "Подписки", icon: <TeamOutlined /> },
    { key: "SearchOutlined", text: "Мои объявления", icon: <SearchOutlined /> },
    {
      key: "MessageOutlined",
      text: "Мои сообщения",
      icon: <MessageOutlined />,
    },
    {
      key: "UsergroupAddOutlined",
      text: "Все пользователи",
      icon: <UsergroupAddOutlined />,
    },
  ];
  const [isActive, setIsActive] = useState<string>(menu[0].key);

  return (
    <Layout>
      <Flex
        style={{
          paddingTop: "40px",
          backgroundColor: "#F5F3EE",
          height: "100%",
        }}
      >
        <Flex align="flex-start" style={{ paddingLeft: "40px" }}>
          <SideMenuHome
            menu={menu}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </Flex>
        <Flex justify="flex-start" align="flex-start">
          <HomeLK />
        </Flex>
      </Flex>
    </Layout>
  );
};
