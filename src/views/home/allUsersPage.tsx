import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../axios";
import { NavLink } from "react-router-dom";
import { Button, Flex, Space, Typography } from "antd";
import { MailOutlined, PlusOutlined } from "@ant-design/icons";
import SideMenuHome from "../../components/sideMenu/SideMenuHome";
import { Layout } from "../../components/layout/layout";
import MediaQuery from "react-responsive";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { UserFriends, getUserFriends } from "../../redux/slices/user";

// interface UserItem {
//   userId: string;
//   firstName: string;
//   lastName: string;
//   avatar: string;
// }

const AllUsersPage = () => {
  const [users, setUsers] = useState<UserFriends[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserFriends[]>([]);

  const [showFriend, setShowFriend] = useState("friend");
  const userFriends = useSelector(getUserFriends);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.log("error");
      }
    };
    getUsers();
  }, [userFriends]);

  useEffect(() => {
    const currentAllUsers = users.filter((u) => !isUserFriend(u.userId));
    setFilteredUsers(currentAllUsers);
  }, [userFriends.length, users.length]);

  const isUserFriend = (friendId: string) => {
    return userFriends.some((u) => u.userId === friendId);
  };

  return (
    <Layout>
      <Flex
        style={{
          paddingTop: "40px",
          backgroundColor: "#F5F3EE",
          height: "100%",
        }}
      >
        <Flex align="flex-start" style={{ paddingLeft: "1%" }}>
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
            <Typography.Title level={4}>
              <Button
                type="link"
                className={
                  showFriend === "friend" ? styles.active : styles.active
                }
                onClick={() => setShowFriend("friend")}
              >
                Друзья
              </Button>{" "}
              /{" "}
              <Button
                type="link"
                className={
                  showFriend === "all" ? styles.active : styles.nonActive
                }
                onClick={() => setShowFriend("all")}
              >
                Все пользователи
              </Button>
            </Typography.Title>

            {filteredUsers &&
              filteredUsers.map((u) => (
                <NavLink to={`/${u.userId}`} key={u.userId}>
                  <Flex
                    key={u.userId}
                    align="center"
                    justify="space-between"
                    style={{
                      backgroundColor: "#fffdf5",
                      border: "1px solid #fffdf5",
                      borderRadius: "15px",
                      margin: "1%",
                      padding: "1%",
                    }}
                  >
                    <Space>
                      <MediaQuery minWidth={650}>
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            margin: "1%",
                          }}
                          alt="avat"
                          src={
                            u.avatar ||
                            "https://cdn-icons-png.flaticon.com/512/60/60422.png"
                          }
                        />
                      </MediaQuery>
                      <Typography.Title level={3}>
                        {u.firstName + " " + u.lastName}
                      </Typography.Title>
                    </Space>
                    <Space.Compact>
                      {/* <Button>
                        <PlusOutlined />
                      </Button> */}
                      <Button>
                        <MailOutlined />
                      </Button>
                    </Space.Compact>
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
