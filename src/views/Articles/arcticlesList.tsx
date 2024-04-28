import { ArticleCard } from "../../components/Cards/articleCard";
import { Article } from "../../types/types";

type Props = {
  articles?: Article[] | [];
};

const ArcticlesList = ({ articles }: Props) => {
  console.log(articles);
  return (
    <div
      style={{
        height: "65%",
        width: "100%",
      }}
    >
      {articles && articles.length > 0
        ? articles?.map((e) => <ArticleCard article={e} />)
        : "Нет статей"}
    </div>
  );
};

export default ArcticlesList;
