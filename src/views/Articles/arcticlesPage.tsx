import { useEffect } from "react";
import { fetchArticles } from "../../redux/slices/articles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Card, Row, Typography } from "antd";
import { ArticlePrevCard } from "../../components/Cards/articleCard";
import styles from "./index.module.css";
import { CustomButton } from "../../components/FormCustom/custom-button/customButton";
import PaginationFoot from "../../components/pagination/pagination";
import { Layout } from "../../components/layout/layout";
import { Link } from "react-router-dom";
import { Paths } from "../../path";

//ПОПРАВИТЬ ТИПЫ
const ArticlePage = () => {
  const dispatch = useDispatch<any>();
  const { status, articles } = useSelector(
    (state: RootState) => state.articles
  );
  const isArticlesLoading = status === "loading";
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);
  return (
    <Layout>
      <Card className={styles.customCard}>
        <Typography.Title level={1} style={{ position: "sticky" }}>
          Блог
          <Link to={Paths.сreateArticles}>
            <CustomButton
              type="primary"
              htmlType="submit"
              backgroundColor="#EFBB54"
              color="#000000"
              size="large"
            >
              Создать статью
            </CustomButton>
          </Link>
        </Typography.Title>
        <Row align="top" justify="center">
          {isArticlesLoading
            ? Array.from({ length: 3 }, (_, index) => (
                <Card
                  key={index}
                  style={{ width: "90vw", margin: "5px" }}
                  loading={true}
                />
              ))
            : articles?.map((ar) => (
                <ArticlePrevCard key={ar.articleId} article={ar} />
              ))}
        </Row>
        <Row justify="center" style={{ paddingTop: "20px" }}>
          <PaginationFoot />
        </Row>
      </Card>
    </Layout>
  );
};

export default ArticlePage;
