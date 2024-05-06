import React, { useEffect, useState } from "react";
import AnnouncementList from "../announcement/announcementList";
import { useParams } from "react-router-dom";
import { Announment, Article } from "../../types/types";
import { getAnnoncements, getArticles } from "../../axios";
import { Layout } from "../../components/layout/layout";
import { Button, Flex, Typography } from "antd";
import SideMenuHome from "../../components/sideMenu/SideMenuHome";
import styles from "./index.module.css";
import ArcticlesList from "../Articles/arcticlesList";
import { useSelector } from "react-redux";
import { getAnnUser } from "../../redux/slices/announcements";
import { getUserArticles } from "../../redux/slices/articles";
import { getCurrentUserData } from "../../redux/slices/user";

const AdminPage = () => {
  const { userId }: any = useParams();
  const currentUserId = localStorage.getItem("userId");

  const [currentUserAnn, setCurrentUserAnn] = useState<Announment[]>();
  const [currentUserArt, setCurrentUserArt] = useState<Article[]>();
  const [showAnn, setShowAnn] = useState("ann");

  const annCurUser: Announment[] = useSelector(getAnnUser);
  const artCurUser: Article[] = useSelector(getUserArticles);
  // const infoCurUser: User = useSelector(getCurrentUserData);
  const infoCurUser = useSelector(getCurrentUserData);
  // console.log(infoCurUser);

  useEffect(() => {
    const getAnnUser = async () => {
      try {
        const { data } = await getAnnoncements();
        setCurrentUserAnn(data);
      } catch (error) {
        console.log("error");
      }
    };
    const getArtUser = async () => {
      try {
        const { data } = await getArticles();
        setCurrentUserArt(data);
      } catch (error) {
        console.log("error");
      }
    };

    getAnnUser();
    getArtUser();
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
          style={{ width: "100%", height: "100%", margin: "1%" }}
          vertical
        >
          <Typography.Title level={3}>
            <Button
              type="link"
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

export default AdminPage;
