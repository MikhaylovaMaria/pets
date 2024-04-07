import { Card, Col, Image, Row, Space, Typography } from "antd";
import styles from "./index.module.css";
import { useState } from "react";
import Meta from "antd/es/card/Meta";
import { Paths } from "../../path";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { currentUserId } from "../../redux/slices/user";
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
  // console.log(userId);

  const rows = 5;
  const [expanded, setExpanded] = useState(false);
  const createdDate = new Date(article.createdAt);
  // console.log(article);

  const formattedDate = `${createdDate.getDate()}.${
    createdDate.getMonth() + 1
  }.${createdDate.getFullYear()}`;

  return (
    <Card
      className={styles.article}
      title={
        <Typography.Title level={2} style={{ color: "#3B3632", margin: 0 }}>
          {article.title}
          <Meta
            description={
              <Typography>
                <Row>
                  <Col span={23}>
                    <Space direction="vertical">
                      <Link to={Paths.articles}>
                        <Text style={{ color: "#3B3632" }}>
                          {article.User.firstName + " " + article.User.lastName}{" "}
                        </Text>
                      </Link>
                      <Text style={{ color: "#7E746B" }}>{formattedDate}</Text>
                    </Space>
                  </Col>
                  <Col span={1}>
                    {userId === article.User.userId && (
                      <Space>
                        <EditOutlined />
                        <DeleteOutlined />
                      </Space>
                    )}
                  </Col>
                </Row>
              </Typography>
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
            {article.photos &&
              article.photos.map((photo, index) => (
                <Row justify="center">
                  <Image width={350} key={index} src={photo} />
                </Row>
              ))}
          </Paragraph>
        </Space>
      </Row>
    </Card>
  );
};
