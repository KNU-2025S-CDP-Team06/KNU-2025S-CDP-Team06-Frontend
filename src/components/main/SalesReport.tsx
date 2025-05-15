import Title from "@components/ui/Title";
import { useGetOneDaySales, useGetSales } from "@/hooks/api/sales";
import LineGraph from "@components/graph/LineGraph";
import BothsideText from "@components/ui/BothsideText";
import BothsideTitle from "@components/ui/BothsideTitle";
import MoveButton from "@components/ui/MoveButton";
import { getThisDay } from "@/utils/day";
import dayjs from "dayjs";
import Skeleton from "@components/ui/Skeleton";
import { useEffect, useState } from "react";
import { getPercentAndColor } from "@/utils/percent";
import { useNavigate } from "react-router-dom";

const SalesReport = () => {
  const today = getThisDay();
  const navigate = useNavigate();

  const thisHour = dayjs().get("hour");

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: today.subtract(1, "month").format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
  });

  const { data: dayagoData, isLoading: isDayagoDataLoading } =
    useGetOneDaySales({
      date: today.subtract(1, "day").format("YYYY-MM-DD"),
      endHour: thisHour,
    });

  const { data: weekagoData, isLoading: isWeekagoDataLoading } =
    useGetOneDaySales({
      date: today.subtract(1, "week").format("YYYY-MM-DD"),
      endHour: thisHour,
    });

  const { data: monthagoData, isLoading: isMonthagoDataLoading } =
    useGetOneDaySales({
      date: today.subtract(1, "month").format("YYYY-MM-DD"),
      endHour: thisHour,
    });

  const isDataLoading =
    isManydayDataLoading ||
    isDayagoDataLoading ||
    isWeekagoDataLoading ||
    isMonthagoDataLoading;

  const [isValueColorListLoading, setisValueColorListLoading] = useState(true);

  const [valueColorList, setValueColorList] = useState<string[][]>([]);

  useEffect(() => {
    if (!isDataLoading) {
      const valueColorList = [];
      valueColorList.push(
        getPercentAndColor(
          dayagoData!.total_revenue,
          manydayData!.slice(-1)[0].total_revenue
        )
      );
      valueColorList.push(
        getPercentAndColor(
          weekagoData!.total_revenue,
          manydayData!.slice(-1)[0].total_revenue
        )
      );
      valueColorList.push(
        getPercentAndColor(
          monthagoData!.total_revenue,
          manydayData!.slice(-1)[0].total_revenue
        )
      );
      setValueColorList(valueColorList);
      setisValueColorListLoading(false);
    }
  }, [isDataLoading]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <Title>실시간 매출 리포트</Title>
      </div>
      {isManydayDataLoading ? (
        <Skeleton height={378} />
      ) : (
        <LineGraph data={manydayData!} />
      )}
      {isDataLoading || isValueColorListLoading ? (
        <Skeleton height={132} />
      ) : (
        <div className="flex flex-col gap-0.5 p-2">
          <BothsideTitle
            label="오늘의 매출"
            value={
              manydayData!.slice(-1)[0].total_revenue.toLocaleString("ko-KR") +
              "원"
            }
          />
          <div className="flex items-center">
            <span className="flex-none mr-2 text-sm font-medium text-neutral-500 whitespace-nowrap">
              메뉴 {manydayData!.slice(-1)[0].total_count}개 판매
            </span>

            <div className="flex-grow h-px bg-neutral-500" />
          </div>

          <BothsideText
            label="전날 대비"
            value={`${
              manydayData!.slice(-1)[0].total_revenue -
                dayagoData!.total_revenue >=
              0
                ? "+"
                : ""
            }${(
              manydayData!.slice(-1)[0].total_revenue -
              dayagoData!.total_revenue
            ).toLocaleString("ko-KR")} (${valueColorList[0][0]})`}
            valueColor={valueColorList[0][1]}
          />
          <BothsideText
            label="전주 대비"
            value={`${
              manydayData!.slice(-1)[0].total_revenue -
                weekagoData!.total_revenue >=
              0
                ? "+"
                : ""
            }${(
              manydayData!.slice(-1)[0].total_revenue -
              weekagoData!.total_revenue
            ).toLocaleString("ko-KR")} (${valueColorList[1][0]})`}
            valueColor={valueColorList[1][1]}
          />
          <BothsideText
            label="전월 대비"
            value={`${
              manydayData!.slice(-1)[0].total_revenue -
                monthagoData!.total_revenue >=
              0
                ? "+"
                : ""
            }${(
              manydayData!.slice(-1)[0].total_revenue -
              monthagoData!.total_revenue
            ).toLocaleString("ko-KR")} (${valueColorList[2][0]})`}
            valueColor={valueColorList[2][1]}
          />
        </div>
      )}
      <MoveButton
        onClick={() => {
          navigate("/report/sales");
        }}
      >
        매출 리포트 더보기
      </MoveButton>
    </div>
  );
};

export default SalesReport;
