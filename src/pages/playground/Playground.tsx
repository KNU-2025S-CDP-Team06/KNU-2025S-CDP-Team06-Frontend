import BarGraph, { BarGraphData } from "@components/graph/BarGraph";
import MenuElement from "@components/ui/MenuElement";
import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import { useGetSales } from "@/hooks/api/sales";
import { useGetOneDayPredict } from "@/hooks/api/predict";
import { useEffect, useState } from "react";
import BothsideText from "@components/ui/BothsideText";
import { useGetStoreData } from "@/hooks/api/storeData";
import { useGetTotalSales } from "@/hooks/api/sales";
import SalesReport from "@components/main/SalesReport";
import TodayBestMenu from "@components/main/TodayBestMenu";
import DailyPredict from "@components/main/DailyPredict";
const Playground = () => {
  const { data: predictData, isLoading: isPredictDataLoading } =
    useGetOneDayPredict("2025-04-10");

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: "2025-03-01",
    endDate: "2025-04-09",
  });

  const { data: totalSales, isLoading: isTotalSalesLoading } = useGetTotalSales(
    {
      startDate: "2025-03-01",
      endDate: "2025-04-01",
    }
  );
  const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);

  const { data: storeData, isLoading: isStoreLoading } = useGetStoreData({
    id: 1,
  });

  useEffect(() => {
    if (!isPredictDataLoading && !isManydayDataLoading) {
      const graphData: BarGraphData[] = [];
      manydayData!.slice(-4).forEach((data) => {
        const revenue = Math.floor(data.total_revenue / 10000);
        graphData.push({
          data: revenue,
          title: `${revenue}만원`,
          paragraph: `${data.date.slice(5)}`,
        });
      });
      graphData.push({
        data: Math.floor(predictData!.xgboost_forecast / 10000),
        title: `${Math.floor(predictData!.xgboost_forecast / 10000)}만원`,
        paragraph: "04-10",
        ispredict: true,
      });
      setBarGraphData(graphData);
    }
  }, [isPredictDataLoading, isManydayDataLoading]);

  return (
    <div className="flex flex-col gap-3 p-4">
      <SalesReport></SalesReport>
      <div className="h-[1px] bg-neutral-300 w-full" />
      <TodayBestMenu></TodayBestMenu>
      <div className="h-[1px] bg-neutral-300 w-full" />
      <DailyPredict></DailyPredict>
      <div className="h-[1px] bg-neutral-300 w-full" />

      {isPredictDataLoading || isManydayDataLoading ? (
        <>스켈레톤</>
      ) : (
        <BarGraph data={barGraphData} />
      )}

      <BarGraph
        data={[
          { data: 14, title: "14만원", paragraph: "03-23" },
          { data: 26, title: "26만원", paragraph: "03-24" },
          { data: 61, title: "61만원", paragraph: "03-25" },
          { data: 67, title: "67만원", paragraph: "03-26" },
          { data: 74, title: "74만원", paragraph: "03-27", ispredict: true },
        ]}
      />

      <ArticleThumbnail title="메뉴별 판매리포트" className="w-full bg-white ">
        <div className="flex-col w-full">
          <MenuElement
            number={1}
            image="https://picsum.photos/seed/menu1/40"
            title="아메리카노 (다크)"
            paragraph="83개"
          />
          <MenuElement
            number={2}
            image="https://picsum.photos/seed/menu2/40"
            title="아인슈페너 (ICE)"
            paragraph="21개"
          />
          <MenuElement
            number={3}
            image="https://picsum.photos/seed/menu3/40"
            title="카페라떼"
            paragraph="16개"
          />
        </div>
      </ArticleThumbnail>
      {isStoreLoading ? (
        <>스켈레톤</>
      ) : (
        <BothsideText label={storeData!.name} value={storeData!.address} />
      )}
      {isTotalSalesLoading ? (
        <>스켈레톤</>
      ) : (
        <BothsideText label="이번달 매출" value={totalSales!.total_revenue} />
      )}
    </div>
  );
};
export default Playground;
