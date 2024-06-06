import { useDispatch } from "react-redux";
import { ArticleCard } from "../../components/Cards/articleCard";
import { AppDispatch } from "../../redux/store";
import { Article } from "../../types/types";
import { deleteArticle } from "../../redux/slices/articles";
import { useEffect } from "react";

type Props = {
  articles?: Article[] | [];
};

const ArcticlesList = ({ articles }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const onDelete = (articleId: string) => {
    // articles = articles?.filter((a) => a.articleId !== articleId);
    dispatch(deleteArticle(articleId));
  };

  useEffect(() => {
    console.log(articles);
  }, [articles]);
  return (
    <div
      style={{
        height: "65%",
        width: "100%",
      }}
    >
      {articles && articles.length > 0
        ? articles?.map((e) => (
            <ArticleCard article={e} onDelete={onDelete} key={e.articleId} />
          ))
        : "Нет статей"}
    </div>
  );
};

export default ArcticlesList;
