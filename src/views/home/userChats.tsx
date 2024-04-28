import { Flex } from "antd";
import SideMenuHome from "../../components/sideMenu/SideMenuHome";
import { Layout } from "../../components/layout/layout";
import Chats from "../chats/chat";

const UserChats = () => {
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
          <SideMenuHome />
        </Flex>
        <Flex
          justify="flex-start"
          align="flex-start"
          style={{ width: "100%", height: "100%" }}
        >
          <Chats />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default UserChats;
