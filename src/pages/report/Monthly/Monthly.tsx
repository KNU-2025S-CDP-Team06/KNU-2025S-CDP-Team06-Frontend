import { useGetSales } from "@/hooks/api/sales";
import { DailySales } from "@/models/dailySales.model";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useEffect, useState } from "react";
import { useGetTotalSales } from "@/hooks/api/sales";
import BothsideTitle from "@components/ui/BothsideTitle";
import BothsideText from "@components/ui/BothsideText";
import { getThisDay, getThisMonth } from "@/utils/day";
import dayjs from "dayjs";
import LessSales from "@components/ui/LessSales";
import useSortMenu from "@/hooks/useSortMenu";
import { getPercentAndColor } from "@/utils/percent";
import Skeleton from "@components/ui/Skeleton";
import BarGraph, { BarGraphData } from "@components/graph/BarGraph";
import MoreSales from "@components/ui/MoreSales";

const Monthly = () => {
  const today = getThisDay();
  const thisMonth = getThisMonth();

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: thisMonth.format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
  });

  const { data: monthagoData, isLoading: isMonthagoDataLoading } =
    useGetTotalSales({
      startDate: thisMonth.subtract(1, "month").format("YYYY-MM-DD"),
      endDate: today.subtract(1, "month").format("YYYY-MM-DD"),
    });

  const { data: totalSales, isLoading: isTotalSalesLoading } = useGetTotalSales(
    {
      startDate: thisMonth.format("YYYY-MM-DD"),
      endDate: today.format("YYYY-MM-DD"),
    }
  );

  const isDataLoading =
    isMonthagoDataLoading || isTotalSalesLoading || isManydayDataLoading;

  const [isSortedMenuLoading, setisSortedMenuLoading] = useState(true);
  const [sortedMenu, sortMenu] = useSortMenu(
    totalSales?.sales_data ?? [],
    monthagoData?.sales_data ?? []
  );

  const [monthCompareData, setMonthCompareData] = useState<string[]>([]);
  const [isMonthCompareDataLoading, setIsMonthCompareDataLoading] =
    useState(true);

  useEffect(() => {
    if (!isDataLoading) {
      setMonthCompareData(
        getPercentAndColor(
          monthagoData!.total_revenue,
          totalSales!.total_revenue
        )
      );
      setIsMonthCompareDataLoading(false);
      sortMenu((a, b) =>
        b.compareCount != a.compareCount
          ? b.compareCount - a.compareCount
          : b.totalCount - a.totalCount
      );
      setisSortedMenuLoading(false);
    }
  }, [isDataLoading]);

  type Week = 0 | 1 | 2 | 3 | 4 | 5 | 6;
  type WeekData = {
    [key in Week]?: {
      total_revenue: number;
      count: number;
    };
  };
  const WeekTable = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const [weekData, setWeekData] = useState<WeekData | undefined>();
  const [isWeekDataLoading, setIsWeekDataLoading] = useState(true);

  useEffect(() => {
    if (!isDataLoading) {
      const weekMap: WeekData = {};
      manydayData!.forEach((data) => {
        const dataDay = dayjs(data.date).day();
        if (weekMap[dataDay]) {
          weekMap[dataDay].count += 1;
          weekMap[dataDay].total_revenue += data.total_revenue;
        } else {
          weekMap[dataDay] = {
            count: 1,
            total_revenue: data.total_revenue,
          };
        }
      });
      setWeekData(weekMap);
      setIsWeekDataLoading(false);
    }
  }, [isDataLoading]);

  const [month, setMonth] = useState<string>("");

  useEffect(() => {
    setMonth(today.format("M월"));
  }, []);

  return (
    <div className="flex flex-col justify-center gap-4 px-4 py-3">
      {isManydayDataLoading ? (
        <Skeleton height={332} />
      ) : (
        <ArticleLineGraph data={manydayData!} />
      )}
      {isDataLoading || isMonthCompareDataLoading ? (
        <Skeleton height={50} />
      ) : (
        <div className="flex flex-col gap-0.5">
          <BothsideTitle
            label={`${month}` + " 총 매출"}
            value={totalSales!.total_revenue.toLocaleString("ko-KR") + "원"}
          />
          <BothsideText
            label="전월 대비"
            value={`${(
              totalSales!.total_revenue - monthagoData!.total_revenue
            ).toLocaleString("ko-KR")} (${monthCompareData[0]})`}
            valueColor={monthCompareData[1]}
          />
        </div>
      )}
      <div className="h-[1px] bg-neutral-300 w-full" />

      <div className="flex flex-col gap-4">
        <span className="flex items-center justify-center text-xl font-semibold ">
          요일별 평균 매출
        </span>
        {isWeekDataLoading ? (
          <Skeleton height={184} />
        ) : (
          <BarGraph
            titleSize="xs"
            color="monotone"
            data={Object.entries(weekData!)
              .sort((a, b) => +a - +b)
              .map<BarGraphData>(([index, val]) => {
                return {
                  data: val.total_revenue / val.count,
                  title: `${Math.floor(
                    val.total_revenue / val.count / 10000
                  )}만원`,
                  paragraph: WeekTable[+index],
                };
              })}
          ></BarGraph>
        )}
      </div>
      <div className="h-[1px] bg-neutral-300 w-full" />

      <div className="flex flex-col gap-4">
        <span className="flex items-center justify-center text-xl font-semibold ">
          주중 · 주말별 평균 매출
        </span>
        {isWeekDataLoading ? (
          <Skeleton height={184} />
        ) : (
          <BarGraph
            titleSize="xs"
            color="monotone"
            data={Object.entries({
              주말:
                (weekData![0]!.total_revenue / weekData![0]!.count +
                  weekData![6]!.total_revenue / weekData![6]!.count) /
                2,
              주중:
                (weekData![1]!.total_revenue / weekData![1]!.count +
                  weekData![2]!.total_revenue / weekData![2]!.count +
                  weekData![3]!.total_revenue / weekData![3]!.count +
                  weekData![4]!.total_revenue / weekData![4]!.count +
                  weekData![5]!.total_revenue / weekData![5]!.count) /
                5,
            }).map<BarGraphData>(([index, val]) => {
              return {
                data: val,
                title: `${Math.floor(val / 10000)}만원`,
                paragraph: index,
              };
            })}
          ></BarGraph>
        )}
      </div>
      <div className="h-[1px] bg-neutral-300 w-full" />

      <div className="flex flex-col gap-4">
        <span className="flex items-center justify-center text-xl font-semibold ">
          인기가 상승 · 하락한 메뉴
        </span>
        {isSortedMenuLoading ? (
          <Skeleton height={184} />
        ) : (
          <div className="flex flex-col gap-2 px-2 ">
            <MoreSales
              label={sortedMenu[0].name}
              value={`${sortedMenu[0].compareCount >= 0 ? "+" : ""}${
                sortedMenu[0].compareCount
              }개  (${sortedMenu[0].totalCount}개)`}
            ></MoreSales>
            <MoreSales
              label={sortedMenu[1].name}
              value={`${sortedMenu[1].compareCount >= 0 ? "+" : ""}${
                sortedMenu[1].compareCount
              }개 (${sortedMenu[1].totalCount}개)`}
            ></MoreSales>
            <MoreSales
              label={sortedMenu[2].name}
              value={`${sortedMenu[2].compareCount >= 0 ? "+" : ""}${
                sortedMenu[2].compareCount
              }개 (${sortedMenu[2].totalCount}개)`}
            ></MoreSales>
            <LessSales
              label={sortedMenu.slice(-3)[0].name}
              value={`${sortedMenu.slice(-3)[0].compareCount >= 0 ? "+" : ""} ${
                sortedMenu.slice(-3)[0].compareCount
              }개 (${sortedMenu.slice(-3)[0].totalCount}개)`}
            ></LessSales>
            <LessSales
              label={sortedMenu.slice(-2)[0].name}
              value={`${sortedMenu.slice(-2)[0].compareCount >= 0 ? "+" : ""} ${
                sortedMenu.slice(-2)[0].compareCount
              }개 (${sortedMenu.slice(-2)[0].totalCount}개)`}
            ></LessSales>
            <LessSales
              label={sortedMenu.slice(-1)[0].name}
              value={`${sortedMenu.slice(-1)[0].compareCount >= 0 ? "+" : ""} ${
                sortedMenu.slice(-1)[0].compareCount
              }개 (${sortedMenu.slice(-1)[0].totalCount}개)`}
            ></LessSales>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monthly;

const ArticleLineGraph = ({
  data,
  plotBy = "total_revenue",
}: {
  data: DailySales[];
  plotBy?: "total_revenue" | "total_count";
}) => {
  const [graphData, setGraphData] = useState<Serie[]>([{ id: "", data: [] }]);
  const [max, setMax] = useState<number>(0);
  const [leftpad, setLeftpad] = useState<number>(0);

  useEffect(() => {
    const sliced = data.slice(-31);
    const maxVal = sliced.reduce((m, cur) => Math.max(m, cur[plotBy]), 0);

    setGraphData([
      {
        id: "data",
        data: sliced.map((d) => {
          const dt = new Date(d.date);
          return {
            y: d[plotBy],
            x: `${(dt.getMonth() + 1).toString().padStart(2, "0")}-${dt
              .getDate()
              .toString()
              .padStart(2, "0")}`,
          };
        }),
      },
    ]);
    const step = Math.pow(10, Math.floor(Math.log10(maxVal)));
    setLeftpad(Math.floor(Math.log10(maxVal)) * 10);
    setMax(step * Math.ceil(maxVal / step));
  }, [data, plotBy]);

  return (
    <section className="flex flex-col gap-4 p-4 overflow-visible rounded-2xl bg-neutral-100">
      <div className="w-full h-[300px]">
        <ResponsiveLine
          data={graphData}
          margin={{ top: 20, right: 20, bottom: 10, left: leftpad }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: max,
            stacked: true,
          }}
          yFormat=" ,.0f"
          curve="catmullRom"
          axisLeft={{
            format: ",.0f",
            tickSize: 5,
            tickPadding: 5,
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisBottom={null}
          defs={[
            linearGradientDef("gradient", [
              { offset: 0, color: "#0D96FE" },
              { offset: 33, color: "#45B3FF" },
              { offset: 66, color: "#86CDFF" },
              { offset: 100, color: "#FFFFFF" },
            ]),
          ]}
          fill={[{ match: "*", id: "gradient" }]}
          colors={["#0E9CFF"]}
          lineWidth={3}
          pointSize={10}
          pointColor="#ffffff"
          pointBorderWidth={3}
          pointBorderColor={{ from: "serieColor" }}
          tooltip={(point) => {
            return (
              <div
                style={{ transform: "translateY(3px)" }}
                className="px-2 py-1 text-xs font-bold bg-white border rounded-sm shadow-md border-neutral-300"
              >
                ₩{point.point.data.y.toLocaleString()}
              </div>
            );
          }}
          enableArea={true}
          enableTouchCrosshair={true}
          useMesh={true}
          animate={false}
        />
      </div>
    </section>
  );
};
