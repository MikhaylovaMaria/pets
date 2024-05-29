import React, { useEffect, useState } from "react";
import { HomeLK } from "../../components/Cards/HomeLK";
import AnnouncementList from "../announcement/announcementList";
import { useParams } from "react-router-dom";
import { Announment, Article, User } from "../../types/types";
import { getAnnoncements, getArticles, getUserInfo } from "../../axios";
import { Layout } from "../../components/layout/layout";
import { Button, Flex, Typography } from "antd";
import SideMenuHome from "../../components/sideMenu/SideMenuHome";
import styles from "./index.module.css";
import ArcticlesList from "../Articles/arcticlesList";
import { useSelector } from "react-redux";
import { getAnnUser } from "../../redux/slices/announcements";
import { getUserArticles } from "../../redux/slices/articles";
import { getCurrentUserData } from "../../redux/slices/user";

const UserPage = () => {
  const { userId }: any = useParams();
  const currentUserId = localStorage.getItem("userId");
  const [currentUserData, setCurrentUserData] = useState<User>();
  const [currentUserAnn, setCurrentUserAnn] = useState<Announment[]>();
  const [currentUserArt, setCurrentUserArt] = useState<Article[]>();
  const [showAnn, setShowAnn] = useState("ann");

  const annCurUser: Announment[] = useSelector(getAnnUser);
  const artCurUser: Article[] = useSelector(getUserArticles);
  // const infoCurUser: User = useSelector(getCurrentUserData);
  const infoCurUser = useSelector(getCurrentUserData);
  // console.log(infoCurUser);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getUserInfo(userId);
        setCurrentUserData(data);
      } catch (error) {
        console.log("error");
      }
    };
    const getAnnUser = async () => {
      try {
        const { data } = await getAnnoncements(userId);
        setCurrentUserAnn(data);
      } catch (error) {
        console.log("error");
      }
    };
    const getArtUser = async () => {
      try {
        const { data } = await getArticles(userId);
        setCurrentUserArt(data);
      } catch (error) {
        console.log("error");
      }
    };
    if (userId === currentUserId) {
      setCurrentUserAnn(annCurUser);
      setCurrentUserArt(artCurUser);
      getUser();
      // setCurrentUserData(infoCurUser);
    } else {
      getUser();
      getAnnUser();
      getArtUser();
    }
  }, [userId, annCurUser, artCurUser, currentUserId]);

  return (
    <Layout>
      <Flex
        style={{
          paddingTop: "40px",
          backgroundColor: "#F5F3EE",
          height: "100%",
          overflow: "scroll",
        }}
      >
        <Flex align="flex-start" style={{ paddingLeft: "1%" }}>
          <SideMenuHome />
        </Flex>
        <Flex
          justify="flex-start"
          align="flex-start"
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "1%",
            marginRight: "1%",
          }}
          vertical
        >
          {currentUserData && <HomeLK currentUser={currentUserData} />}
          <Typography.Title level={3}>
            <Button
              type="text"
              size="small"
              className={showAnn === "ann" ? styles.active : styles.nonActive}
              onClick={() => setShowAnn("ann")}
            >
              Объявления
            </Button>{" "}
            /{" "}
            <Button
              type="link"
              className={showAnn === "art" ? styles.active : styles.nonActive}
              onClick={() => setShowAnn("art")}
            >
              Статьи
            </Button>
          </Typography.Title>
          {showAnn === "ann" ? (
            <AnnouncementList announcements={currentUserAnn} />
          ) : (
            <ArcticlesList articles={currentUserArt} />
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default UserPage;
