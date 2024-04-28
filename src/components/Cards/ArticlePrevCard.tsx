import { Card, Col, Flex, Image, Row, Space, Typography } from "antd";
import styles from "./index.module.css";
import { useState } from "react";
import Meta from "antd/es/card/Meta";

import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { currentUserId } from "../../redux/slices/user";
import { format } from "timeago.js";
import "../../utils/dataTyme";

const { Text, Paragraph } = Typography;

interface Article {
  title: string;
  createdAt: Date;
  photos?: string[];
  description: string;
  User: { firstName: string; lastName: string; userId: string };
  articleId: string;
}

interface Props {
  article: Article;
}

export const ArticlePrevCard = ({ article }: Props) => {
  const userId = useSelector(currentUserId);

  const rows = 3;
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={styles.article}
      title={
        <Typography.Title level={2} style={{ color: "#3B3632", margin: 0 }}>
          {article.title}
          <Meta
            description={
              <Flex vertical={true}>
                <Typography>
                  <Space.Compact direction="vertical">
                    {/* <Link to={Paths.articles}>
                      <Text style={{ color: "#3B3632" }}>
                        {article.User.firstName + " " + article.User.lastName}
                      </Text>
                    </Link> */}
                    <Text style={{ color: "#7E746B" }}>
                      {format(article.createdAt, "ru")}
                    </Text>
                  </Space.Compact>
                  {userId === article.User.userId && (
                    <Space>
                      <EditOutlined />
                      <DeleteOutlined />
                    </Space>
                  )}
                </Typography>
              </Flex>
            }
          />
        </Typography.Title>
      }
      style={{
        backgroundColor: "#FFFDF5",
      }}
    >
      <Row key={article.articleId}>
        <Space direction="vertical">
          <Paragraph
            ellipsis={{
              rows,
              expandable: true,
              symbol: "Развернуть",
              onExpand: (expanded) => setExpanded(!expanded),
            }}
          >
            {article.description}
            {/* {article.photos && <CustomCarousel images={article.photos} />} */}
          </Paragraph>
        </Space>
      </Row>
    </Card>
  );
};
