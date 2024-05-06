import { useEffect } from "react";
import { deleteArticle, fetchArticles } from "../../redux/slices/articles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Card, Flex, Row, Typography } from "antd";

import styles from "./index.module.css";
import { CustomButton } from "../../components/FormCustom/custom-button/customButton";
import PaginationFoot from "../../components/pagination/pagination";
import { Layout } from "../../components/layout/layout";
import { NavLink } from "react-router-dom";
import { ArticleCard } from "../../components/Cards/articleCard";

const ArticlePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, articles } = useSelector(
    (state: RootState) => state.articles
  );

  const onDelete = (articleId: string) => {
    dispatch(deleteArticle(articleId));
  };
  const isArticlesLoading = status === "loading";
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);
  return (
    <Layout>
      <Flex>
        <Card
          style={{
            overflow: "scroll",
            backgroundColor: "#f5f3ee",
          }}
        >
          <Typography.Title level={1} style={{ position: "sticky" }}>
            Блог
            <NavLink to={`/createArticle`}>
              <CustomButton
                type="primary"
                htmlType="submit"
                backgroundColor="#EFBB54"
                color="#000000"
                size="large"
              >
                Создать статью
              </CustomButton>
            </NavLink>
          </Typography.Title>
          <Flex vertical={true}>
            {isArticlesLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <Card
                    key={index}
                    style={{ width: "80%", margin: "5px" }}
                    loading={true}
                  />
                ))
              : articles?.map((ar) => (
                  <ArticleCard
                    key={ar.articleId}
                    article={ar}
                    onDelete={onDelete}
                  />
                ))}
          </Flex>
          <Flex justify="center" align="flex-end">
            <Row justify="center" style={{ paddingTop: "20px" }}>
              <PaginationFoot />
            </Row>
          </Flex>
        </Card>
      </Flex>
    </Layout>
  );
};

export default ArticlePage;
