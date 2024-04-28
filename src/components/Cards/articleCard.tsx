import { Card, Flex, Image, Space, Typography } from "antd";
import styles from "./index.module.css";

import "../../utils/dataTyme";
import { format } from "timeago.js";

import Meta from "antd/es/card/Meta";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Article } from "../../types/types";

const { Text } = Typography;

type Props = {
  article: Article;
};

export const ArticleCard = ({ article }: Props) => {
  const userId = localStorage.getItem("userId");

  return (
    <Card
      key={article.articleId}
      title={
        <Typography.Title level={3} style={{ color: "#3B3632", margin: 0 }}>
          <Flex justify="space-between">
            {article.title}
            {userId === article.userId && (
              <Space>
                <EditOutlined />
                <DeleteOutlined />
              </Space>
            )}
          </Flex>

          <Meta
            description={
              <Flex vertical={true}>
                <Typography>
                  <Space.Compact direction="vertical">
                    {article.User?.userId && (
                      <NavLink
                        to={`/${article.User.userId}`}
                        key={article.articleId}
                      >
                        <Text style={{ color: "#3B3632" }}>
                          {article.User.firstName + " " + article.User.lastName}
                        </Text>
                      </NavLink>
                    )}
                    <Text style={{ color: "#7E746B" }}>
                      {format(article.createdAt, "ru")}
                    </Text>
                  </Space.Compact>
                </Typography>
              </Flex>
            }
          />
        </Typography.Title>
      }
      style={{
        margin: "5px",
        backgroundColor: "#FFFDF5",
        width: "100%",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {<Typography.Text>{article.description}</Typography.Text>}
        <Flex justify="center">
          <Space key={article.articleId} size="small" direction="horizontal">
            {article.photos.length > 0 &&
              article.photos.map((a) => (
                <Image src={a} width={`100/${article.photos.length}%`} />
              ))}
          </Space>
        </Flex>
      </Space>
    </Card>
  );
};
