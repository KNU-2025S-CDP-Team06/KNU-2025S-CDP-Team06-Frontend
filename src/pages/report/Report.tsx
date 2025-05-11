import ArticleBestmenu from "@components/report/ArticleBestmenu";
import ArticleSales from "@components/report/ArticleSales";
import ArticleMonthly from "@components/report/ArticleMonthly";
const Report = () => {
  return (
    <main className="flex flex-col items-center justify-between flex-grow px-4 py-3 gap-4">
      <ArticleSales></ArticleSales>
      <ArticleMonthly></ArticleMonthly>
      <ArticleBestmenu></ArticleBestmenu>
    </main>
  );
};

export default Report;
