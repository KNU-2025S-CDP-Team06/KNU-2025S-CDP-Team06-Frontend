import ArticleMenu from "@components/report/ArticleMenu";
import ArticleSales from "@components/report/ArticleSales";
import ArticleMonthly from "@components/report/ArticleMonthly";
import ArticlePredict from "@components/report/ArticlePredict";
const Report = () => {
  return (
    <main className="flex flex-col items-center justify-between flex-grow gap-4 px-4 py-3">
      <div className="flex items-center w-full gap-2">
        <div className="h-0.5 bg-neutral-200 flex-grow" />
        <h1 className="text-lg font-semibold">3월 27일</h1>
        <div className="h-0.5 bg-neutral-200 flex-grow" />
      </div>
      <div className="flex flex-col w-full gap-4 px-3">
        <ArticleSales></ArticleSales>
        <ArticleMenu></ArticleMenu>
        <ArticlePredict></ArticlePredict>
        <ArticleMonthly></ArticleMonthly>
      </div>
    </main>
  );
};

export default Report;
