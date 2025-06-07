import { useEffect, useState } from "react";
import Title from "@components/ui/Title";
import { useGetSales, useGetTotalSales } from "@/hooks/api/sales";
import { useGetOneDayPredict, useGetPredictsTotal } from "@/hooks/api/predict";
import BothsideText from "@components/ui/BothsideText";
import BothsideTitle from "@components/ui/BothsideTitle";
import MoveButton from "@components/ui/MoveButton";
import BarGraph, { BarGraphData } from "@components/graph/BarGraph";
import Skeleton from "@components/ui/Skeleton";
import { getThisDay } from "@/utils/day";
import { useNavigate } from "react-router-dom";
import { calcPredictRevenue } from "@/utils/predict";

const DailyPredict = () => {
  const today = getThisDay();
  const navigate = useNavigate();

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: today.subtract(5, "days").format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
  });

  const { data: predictData, isLoading: isPredictDataLoading } =
    useGetOneDayPredict(today.add(1, "day").format("YYYY-MM-DD"));

  const { data: todayPredictData, isLoading: isTodayPredictDataLoading } =
    useGetOneDayPredict(today.format("YYYY-MM-DD"));

  const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);

  // const weeks = [
  //   { label: "3주 전", offset: -3 },
  //   { label: "2주 전", offset: -2 },
  //   { label: "1주 전", offset: -1 },
  //   { label: "이번 주", offset: 0 },
  //   { label: "다음 주", offset: 1 },
  // ];

  const prevWeekData = [-3, -2, -1].map((offset) => {
    const startDate = today
      .startOf("week")
      .add(offset, "week")
      .format("YYYY-MM-DD");
    const endDate = today
      .endOf("week")
      .add(offset, "week")
      .format("YYYY-MM-DD");

    return useGetTotalSales({ startDate, endDate });
  });

  const { data: thisWeekpredictData, isLoading: isThisWeekPredictDataLoading } =
    useGetPredictsTotal({
      startDate: today.startOf("week").format("YYYY-MM-DD"),
      endDate: today.endOf("week").format("YYYY-MM-DD"),
    });

  const { data: thisWeekData, isLoading: isThisWeekDataLoading } =
    useGetTotalSales({
      startDate: today.startOf("week").format("YYYY-MM-DD"),
      endDate: today.endOf("week").format("YYYY-MM-DD"),
    });

  const { data: nextWeekpredictData, isLoading: isNextWeekPredictDataLoading } =
    useGetPredictsTotal({
      startDate: today.startOf("week").add(1, "week").format("YYYY-MM-DD"),
      endDate: today.endOf("week").add(1, "week").format("YYYY-MM-DD"),
    });

  const isDataLoading =
    isPredictDataLoading ||
    isManydayDataLoading ||
    isTodayPredictDataLoading ||
    isThisWeekDataLoading ||
    isThisWeekPredictDataLoading ||
    isNextWeekPredictDataLoading;

  const [totalbarGraphData, setTotalbarGraphData] = useState<BarGraphData[]>(
    []
  );

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
        title: `${Math.floor(calcPredictRevenue(predictData!, 1) / 10000)}만원`,
        paragraph: today.add(1, "day").format("MM-DD"),
        ispredict: true,
      });
      setBarGraphData(graphData);

      const weekParagraphTable = [
        "3주전",
        "2주전",
        "1주전",
        "이번주",
        "다음주",
      ];
      const weekGraphData: BarGraphData[] = [];
      prevWeekData.forEach((query, index) => {
        const { data } = query;
        const revenue = Math.floor(data!.total_revenue / 10000);
        weekGraphData.push({
          data: revenue,
          title: `${revenue}만원`,
          paragraph: weekParagraphTable[index],
        });
      });
      weekGraphData.push({
        data: Math.floor(thisWeekData!.total_revenue / 10000),
        title: `${Math.floor(thisWeekData!.total_revenue / 10000)}만원`,
        paragraph: weekParagraphTable[3],
        predictData: Math.floor(thisWeekpredictData! / 10000),
      });
      weekGraphData.push({
        data: Math.floor(nextWeekpredictData! / 10000),
        title: `${Math.floor(nextWeekpredictData! / 10000)}만원`,
        paragraph: weekParagraphTable[4],
        ispredict: true,
      });
      setTotalbarGraphData(weekGraphData);
    }
  }, [isDataLoading]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <Title>내일 매출 예측</Title>
      </div>
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
              (
                Math.floor(
                  (predictData!.prophet_forecast *
                    (predictData!.xgboost_forecast + 1)) /
                    10
                ) * 10
              ).toLocaleString("ko-KR") + "원"
            }
          />
        </div>
      )}
      <div className="flex items-center justify-center">
        <Title>주 · 월간 매출 예측</Title>
      </div>
      {isDataLoading ? (
        <Skeleton height={220} />
      ) : (
        <BarGraph data={totalbarGraphData} />
      )}
      {isDataLoading ? (
        <Skeleton height={76} />
      ) : (
        <div className="flex flex-col gap-1 p-2">
          <BothsideTitle
            label="이번주 예상 매출액"
            value={thisWeekpredictData!.toLocaleString("ko-KR") + "원"}
          />
          <BothsideTitle
            label="다음주 예상 매출액"
            value={
              calcPredictRevenue(todayPredictData!, 1).toLocaleString("ko-KR") +
              "원"
            }
          />
        </div>
      )}

      <MoveButton
        onClick={() => {
          navigate("/report/predict");
        }}
      >
        매출 예측 리포트 더보기
      </MoveButton>
    </div>
  );
};

export default DailyPredict;
