import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../axios";
import { NavLink, useParams } from "react-router-dom";
import { Button, Flex, Typography } from "antd";
import { MailOutlined, PlusOutlined } from "@ant-design/icons";
import SideMenuHome from "../../components/sideMenu/SideMenuHome";
import { Layout } from "../../components/layout/layout";

interface UserItem {
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const AllUsersPage = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const { userId }: any = useParams();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await getAllUsers();
        const users = data.filter((el: UserItem) => el.userId !== userId);
        setUsers(users);
      } catch (error) {
        console.log("error");
      }
    };
    getUsers();
  }, []);

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
          <div
            style={{
              width: "100%",
              paddingRight: "2%",
              height: "100%",
            }}
          >
            Друзья/подписки
            {users &&
              users.map((u) => (
                <NavLink to={`/${u.userId}`} key={u.userId}>
                  <Flex
                    key={u.userId}
                    align="center"
                    style={{
                      backgroundColor: "#fffdf5",
                      border: "1px solid #fffdf5",
                      borderRadius: "15px",
                      margin: "12px",
                    }}
                  >
                    <img
                      style={{ width: "100px", height: "100px", margin: "1%" }}
                      alt="avat"
                      src={
                        u.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/60/60422.png"
                      }
                    />
                    <Typography.Title level={2}>
                      {u.firstName + " " + u.lastName}
                    </Typography.Title>
                    <Button>
                      <PlusOutlined />
                    </Button>
                    <Button>
                      <MailOutlined />
                    </Button>
                  </Flex>
                </NavLink>
              ))}
          </div>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default AllUsersPage;
