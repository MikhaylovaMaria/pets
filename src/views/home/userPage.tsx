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

const UserPage = () => {
  const { userId }: any = useParams();
  const [currentUserData, setCurrentUserData] = useState<User>();
  const [currentUserAnn, setCurrentUserAnn] = useState<Announment[]>();
  const [currentUserArt, setCurrentUserArt] = useState<Article[]>();
  const [showAnn, setShowAnn] = useState("ann");

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
    getUser();
    getAnnUser();
    getArtUser();
  }, [userId]);

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
        <Flex align="flex-start" style={{ paddingLeft: "40px" }}>
          <SideMenuHome />
        </Flex>
        <Flex
          justify="flex-start"
          align="flex-start"
          style={{ width: "100%", height: "100%", margin: "1%" }}
          vertical
        >
          {currentUserData && <HomeLK currentUser={currentUserData} />}
          <Typography.Title level={3}>
            <Button
              type="link"
              ghost
              className={showAnn === "ann" ? styles.active : styles.nonActive}
              onClick={() => setShowAnn("ann")}
            >
              Объявления
            </Button>{" "}
            /{" "}
            <Button
              type="link"
              ghost
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
