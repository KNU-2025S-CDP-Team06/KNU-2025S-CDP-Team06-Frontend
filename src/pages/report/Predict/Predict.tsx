import { useEffect, useState } from "react";
import { useGetSales } from "@/hooks/api/sales";
import { useGetOneDayPredict } from "@/hooks/api/predict";
import BothsideText from "@components/ui/BothsideText";
import BothsideTitle from "@components/ui/BothsideTitle";
import BarGraph, { BarGraphData } from "@components/graph/BarGraph";

const Predict = () => {
  const { data: predictData, isLoading: isPredictDataLoading } =
    useGetOneDayPredict("2025-04-10");

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: "2025-03-01",
    endDate: "2025-04-09",
  });

  const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);

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
        data:
          Math.floor(
            (predictData!.prophet_forecast *
              (predictData!.xgboost_forecast + 1)) /
              100000
          ) * 10,
        title: `${Math.floor(
          (predictData!.prophet_forecast *
            (predictData!.xgboost_forecast + 1)) /
            10000
        )}만원`,
        paragraph: "04-10",
        ispredict: true,
      });
      setBarGraphData(graphData);
    }
  }, [isPredictDataLoading, isManydayDataLoading]);

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      <div className="flex items-center justify-center"></div>
      {isPredictDataLoading || isManydayDataLoading ? (
        <>스켈레톤</>
      ) : (
        <BarGraph data={barGraphData} />
      )}

      <div className="flex flex-col gap-1 p-2">
        {isPredictDataLoading ? (
          <>스켈레톤</>
        ) : (
          <>
            <BothsideText
              label="내일 예상 매출액"
              value={
                predictData!.prophet_forecast.toLocaleString("ko-KR") + "원"
              }
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
              label="최종 예상 매출액"
              value={
                (
                  Math.floor(
                    (predictData!.prophet_forecast *
                      (predictData!.xgboost_forecast + 1)) /
                      10
                  ) * 10
                ).toLocaleString("ko-KR") + "원"
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Predict;
