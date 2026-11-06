import "./Article.scss";
import Hero from "../../Hero/Hero";
import articleData from "./ArticleData";
import ArticleItem from "./ArticleItem";
import NotFound from "../../NotFound/NotFound";
import { useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();

  const selectedArticle = articleData.find((item) => item.id === Number(id));

  if (!selectedArticle) {
    return <NotFound />;
  }

  return (
    <>
      <Hero as="p" title="Blog Details" cName="hero__img-blog" />
      <section className="article">
        <ArticleItem {...selectedArticle} />
      </section>
    </>
  );
};

export default Article;
