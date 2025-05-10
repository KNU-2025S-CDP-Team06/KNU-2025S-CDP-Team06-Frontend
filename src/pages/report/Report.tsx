import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import ArticleBestmenu from "@components/report/ArticleBestmenu";
const Report = () => {
  return (
    <main className="flex flex-col items-center justify-between flex-grow px-8 pt-32 pb-8">
      <ArticleThumbnail title="실시간 매출 리포트" className="w-full bg-white ">
        <div className="flex-col w-full"></div>
      </ArticleThumbnail>
      <ArticleThumbnail
        title="메뉴별 판매 리포트"
        className="w-full  bg-white "
      >
        <div className="flex-col w-full px-4">
          <ArticleBestmenu></ArticleBestmenu>
        </div>
      </ArticleThumbnail>

      <ArticleThumbnail
        title="내일 예상 매출 리포트"
        className="w-full bg-white "
      >
        <div className="flex-col w-full"></div>
      </ArticleThumbnail>
      <ArticleThumbnail title="월간 매출 리포트" className="w-full bg-white ">
        <div className="flex-col w-full"></div>
      </ArticleThumbnail>
    </main>
  );
};

export default Report;
