import Title from "@components/ui/Title";
import { useGetOneDaySales, useGetSales } from "@/hooks/api/sales";
import dayjs from "dayjs";
import Skeleton from "@components/ui/Skeleton";
import { getThisDay } from "@/utils/day";
import { useEffect, useState } from "react";
import LineGraph from "@components/graph/LineGraph";
import BothsideText from "@components/ui/BothsideText";
import BothsideTitle from "@components/ui/BothsideTitle";
import { getPercentAndColor } from "@/utils/percent";

const Sales = () => {
  const today = getThisDay();

  const thisHour = dayjs().get("hour");

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: today.subtract(6, "days").format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
  });

  const { data: monthData, isLoading: isMonthDataLoading } = useGetSales({
    startDate: today.subtract(31, "days").format("YYYY-MM-DD"),
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
    isMonthagoDataLoading ||
    isMonthDataLoading;

  const [isValueColorListLoading, setisValueColorListLoading] = useState(true);

  const [valueColorList, setValueColorList] = useState<string[][]>([]);

  const getAverage = (arr: number[]) =>
    arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

  const weekRevenueAvg = Math.round(
    getAverage(monthData?.slice(-7).map((d) => d.total_revenue) ?? [])
  );

  const monthRevenueAvg = Math.round(
    getAverage(monthData?.map((d) => d.total_revenue) ?? [])
  );
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
      valueColorList.push(
        getPercentAndColor(
          weekRevenueAvg,
          manydayData!.slice(-1)[0].total_revenue
        )
      );
      valueColorList.push(
        getPercentAndColor(
          monthRevenueAvg,
          manydayData!.slice(-1)[0].total_revenue
        )
      );
      valueColorList.push(
        getPercentAndColor(
          dayagoData!.total_count,
          manydayData!.slice(-1)[0].total_count,
          "count"
        )
      );
      valueColorList.push(
        getPercentAndColor(
          weekagoData!.total_count,
          manydayData!.slice(-1)[0].total_count,
          "count"
        )
      );
      valueColorList.push(
        getPercentAndColor(
          monthagoData!.total_count,
          manydayData!.slice(-1)[0].total_count,
          "count"
        )
      );

      setValueColorList(valueColorList);
      setisValueColorListLoading(false);
    }
  }, [isDataLoading]);

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
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
      {isDataLoading || isValueColorListLoading ? (
        <Skeleton height={88} />
      ) : (
        <div className="flex flex-col gap-0.5 p-2">
          <BothsideTitle label="평균 매출 대비" value="" />
          <BothsideText
            label="1주 평균"
            value={`${
              manydayData!.slice(-1)[0].total_revenue - weekRevenueAvg >= 0
                ? "+"
                : ""
            }${(
              manydayData!.slice(-1)[0].total_revenue - weekRevenueAvg
            ).toLocaleString("ko-KR")} (${valueColorList[3][0]})`}
            valueColor={valueColorList[3][1]}
          />
          <BothsideText
            label="1달 평균"
            value={`${
              manydayData!.slice(-1)[0].total_revenue - monthRevenueAvg >= 0
                ? "+"
                : ""
            }${(
              manydayData!.slice(-1)[0].total_revenue - monthRevenueAvg
            ).toLocaleString("ko-KR")} (${valueColorList[4][0]})`}
            valueColor={valueColorList[4][1]}
          />
        </div>
      )}
      <div className="h-[1px] bg-neutral-300 w-full" />
      <div className="flex items-center justify-center">
        <Title>메뉴 판매량</Title>
      </div>
      {isManydayDataLoading ? (
        <Skeleton height={378} />
      ) : (
        <LineGraph data={manydayData!} plotBy="total_count" />
      )}

      {isDataLoading || isValueColorListLoading ? (
        <Skeleton height={110} />
      ) : (
        <div className="flex flex-col gap-0.5 p-2">
          <span className="flex-none mr-2 text-lg font-medium text-black whitespace-nowrap">
            메뉴 {manydayData!.slice(-1)[0].total_count}개 판매
          </span>
          <BothsideText
            label="전날 대비"
            value={`${
              manydayData!.slice(-1)[0].total_count - dayagoData!.total_count >=
              0
                ? "+"
                : ""
            }${(
              manydayData!.slice(-1)[0].total_count - dayagoData!.total_count
            ).toLocaleString("ko-KR")}개 (${valueColorList[5][0]})`}
            valueColor={valueColorList[5][1]}
          />
          <BothsideText
            label="전주 대비"
            value={`${
              manydayData!.slice(-1)[0].total_count -
                weekagoData!.total_count >=
              0
                ? "+"
                : ""
            }${(
              manydayData!.slice(-1)[0].total_count - weekagoData!.total_count
            ).toLocaleString("ko-KR")}개 (${valueColorList[6][0]})`}
            valueColor={valueColorList[6][1]}
          />
          <BothsideText
            label="전월 대비"
            value={`${
              manydayData!.slice(-1)[0].total_count -
                monthagoData!.total_count >=
              0
                ? "+"
                : ""
            }${(
              manydayData!.slice(-1)[0].total_count - monthagoData!.total_count
            ).toLocaleString("ko-KR")}개 (${valueColorList[7][0]})`}
            valueColor={valueColorList[7][1]}
          />
        </div>
      )}
    </div>
  );
};

export default Sales;
