import { useEffect, useState } from "react";
import { useGetSales } from "@/hooks/api/sales";
import { useGetOneDayPredict } from "@/hooks/api/predict";
import BothsideText from "@components/ui/BothsideText";
import BothsideTitle from "@components/ui/BothsideTitle";
import BarGraph, { BarGraphData } from "@components/graph/BarGraph";
import { getThisDay } from "@/utils/day";
import Skeleton from "@components/ui/Skeleton";
import { calcPredictRevenue } from "@/utils/predict";
import CompareLineGraph from "@components/graph/CompareLineGraph";
import { useGetPredicts } from "@/hooks/api/predict";

const Predict = () => {
  const today = getThisDay();

  const { data: predictData, isLoading: isPredictDataLoading } =
    useGetOneDayPredict(today.add(1, "day").format("YYYY-MM-DD"));

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: today.subtract(8, "days").format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
  });
  const { data: manypredictData, isLoading: isManypredictDataLoading } =
    useGetPredicts({
      startDate: today.subtract(8, "days").format("YYYY-MM-DD"),
      endDate: today.format("YYYY-MM-DD"),
    });

  const { data: todayPredictData, isLoading: isTodayPredictDataLoading } =
    useGetOneDayPredict(today.format("YYYY-MM-DD"));

  const isDataLoading =
    isPredictDataLoading || isManydayDataLoading || isTodayPredictDataLoading;

  const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);

  useEffect(() => {
    if (!isDataLoading) {
      const graphData: BarGraphData[] = [];
      manydayData!.slice(-4).forEach((data) => {
        const revenue = Math.floor(data.total_revenue / 10000);
        graphData.push({
          data: revenue,
          title: `${revenue}만원`,
          paragraph: `${data.date.slice(5, 10)}`,
        });
      });
      graphData[3].predictData = Math.floor(
        (todayPredictData!.prophet_forecast *
          (todayPredictData!.xgboost_forecast + 1)) /
          10000
      );
      graphData.push({
        data: calcPredictRevenue(predictData!) / 10000,
        title: `${Math.floor(
          (predictData!.prophet_forecast *
            (predictData!.xgboost_forecast + 1)) /
            10000
        )}만원`,
        paragraph: today.add(1, "day").format("MM-DD"),
        ispredict: true,
      });
      setBarGraphData(graphData);
    }
  }, [isDataLoading]);

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      <div className="flex items-center justify-center"></div>
      {isDataLoading ? (
        <Skeleton height={220} />
      ) : (
        <BarGraph data={barGraphData} />
      )}

      {isDataLoading ? (
        <Skeleton height={97} />
      ) : (
        <div className="flex flex-col gap-1 p-2">
          <BothsideTitle
            label="오늘 예상 매출액"
            value={
              calcPredictRevenue(todayPredictData!, 1).toLocaleString("ko-KR") +
              "원"
            }
          />
          <BothsideText
            label="내일 예상 매출액"
            value={predictData!.prophet_forecast.toLocaleString("ko-KR") + "원"}
            valueColor="text-black"
          />
          <BothsideText
            label="날씨에 따른 매출 변화"
            value={`${predictData!.xgboost_forecast >= 0 ? "+" : "-"} ${(
              predictData!.xgboost_forecast * 100
            ).toFixed(1)}%`}
            valueColor={
              predictData!.xgboost_forecast >= 0
                ? "text-red-500"
                : "text-blue-500"
            }
          />
          <div className="h-[1px] bg-neutral-100 w-full" />
          <BothsideTitle
            label="내일 최종 예상 매출액"
            value={
              calcPredictRevenue(predictData!, 1).toLocaleString("ko-KR") + "원"
            }
          />
        </div>
      )}
      <div className="h-[1px] bg-neutral-300 w-full" />

      <div className="flex flex-col gap-4">
        <span className="flex items-center justify-center text-xl font-semibold ">
          예상 매출 비교 그래프
        </span>
        {isManydayDataLoading || isManypredictDataLoading ? (
          <Skeleton height={378} />
        ) : (
          <CompareLineGraph sales={manydayData!} predict={manypredictData!} />
        )}
      </div>
    </div>
  );
};

export default Predict;
