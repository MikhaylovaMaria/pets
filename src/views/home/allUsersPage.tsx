import React, { useEffect, useState } from "react";
import { createDialog, getAllUsers } from "../../axios";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { Button, Flex, Space, Spin, Typography } from "antd";
import { CloseOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import SideMenuHome from "../../components/sideMenu/SideMenuHome";
import { Layout } from "../../components/layout/layout";
import MediaQuery from "react-responsive";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  UserFriendsParams,
  currentUserId,
  fetchCreateSubscription,
  fetchDeleteSubscription,
  getUserFriends,
  userDataStatus,
} from "../../redux/slices/user";
import { AppDispatch } from "../../redux/store";
import { ChatNew } from "../../types/types";

const AllUsersPage = () => {
  const status = useSelector(userDataStatus);
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserFriendsParams[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserFriendsParams[]>([]);
  const [showFriend, setShowFriend] = useState("friend");
  const userFriends = useSelector(getUserFriends);
  const [currentUsersInfo, setCurrentUsersInfo] =
    useState<UserFriendsParams[]>(userFriends);

  const authorId = useSelector(currentUserId);

  const dispatch: AppDispatch = useDispatch();

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

  useEffect(() => {
    showFriend === "friend"
      ? setCurrentUsersInfo(userFriends)
      : setCurrentUsersInfo(filteredUsers);
  }, [showFriend]);

  // useEffect(() => {
  //   console.log(status);
  // }, [status]);

  const createSubscription = (friendId: string, user: UserFriendsParams) => {
    authorId && dispatch(fetchCreateSubscription({ authorId, friendId, user }));
    const newCurrentUsers = currentUsersInfo.filter(
      (u) => u.userId !== friendId
    );
    setCurrentUsersInfo(newCurrentUsers);
  };

  const deleteSubscription = (friendId: string, user: UserFriendsParams) => {
    authorId && dispatch(fetchDeleteSubscription({ authorId, friendId, user }));
    const newCurrentUsers = currentUsersInfo.filter(
      (u) => u.userId !== friendId
    );
    setCurrentUsersInfo(newCurrentUsers);
  };

  const createDio = async (friendId: string) => {
    if (authorId) {
      const chat = {
        chatName: "test",
        chatType: "private",
        authorId: authorId,
        partnerId: friendId,
      };
      try {
        const { data } = await createDialog(chat);
        navigate(`/chats/${data.chatId}`);
      } catch (error) {
        console.log(error);
      }
    }
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
                  showFriend === "friend" ? styles.active : styles.nonActive
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

            {currentUsersInfo.map((u) => (
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
                  <NavLink to={`/${u.userId}`} key={u.userId}>
                    <Typography.Title level={3}>
                      {u.firstName + " " + u.lastName}
                    </Typography.Title>
                  </NavLink>
                </Space>
                <Space.Compact>
                  <Button onClick={() => createDio(u.userId)}>
                    <MailOutlined />
                  </Button>
                  {showFriend !== "friend" ? (
                    <Button onClick={() => createSubscription(u.userId, u)}>
                      <PlusOutlined />
                    </Button>
                  ) : (
                    <Button onClick={() => deleteSubscription(u.userId, u)}>
                      <CloseOutlined />
                    </Button>
                  )}
                </Space.Compact>
              </Flex>
            ))}
          </div>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default AllUsersPage;
