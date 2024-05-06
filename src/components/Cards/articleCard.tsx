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
  onDelete: (articleId: string) => void;
};

export const ArticleCard = ({ article, onDelete }: Props) => {
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
                <DeleteOutlined onClick={() => onDelete(article.articleId)} />
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

        <Space
          key={article.articleId}
          // size="small"
          direction="horizontal"
          style={{ width: "100%" }}
        >
          {article.photos.length > 0 &&
            article.photos.map((a) => (
              <Flex justify="center" align="center">
                <Image
                  key={a}
                  src={a}
                  width={`${30 / article.photos.length}%`}
                />
              </Flex>
            ))}
        </Space>
      </Space>
    </Card>
  );
};
