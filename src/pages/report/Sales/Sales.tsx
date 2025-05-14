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
                0 && "+"
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
                0 && "+"
            }${(
              manydayData!.slice(-1)[0].total_revenue -
              weekagoData!.total_revenue
            ).toLocaleString("ko-KR")} (${valueColorList[0][0]})`}
            valueColor={valueColorList[1][1]}
          />
          <BothsideText
            label="전월 대비"
            value={`${
              manydayData!.slice(-1)[0].total_revenue -
                monthagoData!.total_revenue >=
                0 && "+"
            }${(
              manydayData!.slice(-1)[0].total_revenue -
              monthagoData!.total_revenue
            ).toLocaleString("ko-KR")} (${valueColorList[0][0]})`}
            valueColor={valueColorList[2][1]}
          />
        </div>
      )}

      <div className="flex flex-col gap-0.5 p-2">
        <BothsideTitle label="평균 매출 대비" value="" />

        <BothsideText
          label="1주 평균"
          value={`+40,100 (4.1%)`}
          valueColor="text-red-500"
        />
        <BothsideText
          label="1달 평균"
          value={`+33,470 (7.6%)`}
          valueColor="text-red-500"
        />
        <BothsideText
          label="1년 평균"
          value={`-27,680 (5.5%)`}
          valueColor="text-blue-500"
        />
      </div>

      <div className="h-[1px] bg-neutral-300 w-full" />
      <div className="flex items-center justify-center">
        <Title>메뉴 판매량</Title>
      </div>
      {isManydayDataLoading ? (
        <Skeleton height={378} />
      ) : (
        <LineGraph data={manydayData!} plotBy="total_count" />
      )}

      <div className="flex flex-col gap-0.5 px-2">
        <span className="flex-none text-lg font-medium text-black whitespace-nowrap mr-2">
          메뉴{" "}
          {isManydayDataLoading ? (
            <>스켈레톤</>
          ) : (
            manydayData!.slice(-1)[0].total_count
          )}
          개 판매
        </span>
        <BothsideText
          label="1주 평균"
          value={`+40,100 (4.1%)`}
          valueColor="text-red-500"
        />
        <BothsideText
          label="1달 평균"
          value={`+33,470 (7.6%)`}
          valueColor="text-red-500"
        />
        <BothsideText
          label="1년 평균"
          value={`-27,680 (5.5%)`}
          valueColor="text-blue-500"
        />
      </div>
    </div>
  );
};

export default Sales;
