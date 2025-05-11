import ArticleBestmenu from "@components/report/ArticleBestmenu";
import ArticleSales from "@components/report/ArticleSales";
import ArticleMonthly from "@components/report/ArticleMonthly";
import ArticlePredict from "@components/report/ArticlePredict";
const Report = () => {
  return (
    <main className="flex flex-col items-center justify-between flex-grow px-4 py-3 gap-4">
      <ArticleSales></ArticleSales>
      <ArticleMonthly></ArticleMonthly>
      <ArticleBestmenu></ArticleBestmenu>
      <ArticlePredict></ArticlePredict>
    </main>
  );
};

export default Report;
