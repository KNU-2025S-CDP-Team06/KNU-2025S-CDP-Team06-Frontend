import { useGetSales } from "@/hooks/api/sales";
import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import { DailySales } from "@/models/dailySales.model";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useEffect, useState, HTMLAttributes } from "react";
import { useGetOneDaySales } from "@/hooks/api/sales";

const ArticleSales = () => {
  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: "2025-03-01",
    endDate: "2025-04-09",
  });

  const { data: onedayData, isLoading: isOnedayDataLoading } =
    useGetOneDaySales("2025-03-26");

  return (
    <ArticleThumbnail title="실시간 매출 리포트">
      <div className="flex flex-col flex-grow gap-2 text-black">
        <h1 className="text-base font-semibold">주간 매출 그래프</h1>

        {isManydayDataLoading ? (
          <>스켈레톤</>
        ) : (
          <ArticleLineGraph data={manydayData!} />
        )}
        <div className="text-base font-medium">
          <span className="text-base font-normal">오늘의 매출: </span>
          {isOnedayDataLoading ? (
            <>스켈레톤</>
          ) : (
            onedayData!.total_revenue.toLocaleString("ko-KR") + "원"
          )}
        </div>
        <div className="flex items-center justify-center gap-16">
          <CompareText
            label="전 주 대비"
            value="+12.8%"
            valueColor="text-red-500"
          ></CompareText>
          <CompareText
            label="전 달 대비"
            value="+5.7%"
            valueColor="text-red-500"
          ></CompareText>
          <CompareText
            label="전 년 대비"
            value="-3.2%"
            valueColor="text-blue-500"
          ></CompareText>
        </div>
      </div>
    </ArticleThumbnail>
  );
};

export default ArticleSales;

interface CompareTextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  valueColor?: string;
}

const CompareText = ({
  label,
  value,
  valueColor = "text-black",
}: CompareTextProps) => {
  return (
    <div className="flex flex-col items-center ">
      <span className="text-sm font-medium">{label}</span>
      <span className={`${valueColor} text-sm font-medium`}>{value}</span>
    </div>
  );
};

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
    const sliced = data.slice(-7);
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
    setMax(step * Math.ceil(maxVal / step));
    setLeftpad(Math.floor(Math.log10(maxVal)) * 11);
  }, [data, plotBy]);

  return (
    <section className="flex flex-col gap-4  overflow-visible rounded-2xl bg-white">
      <div className="w-full h-[150px]">
        <ResponsiveLine
          data={graphData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: max,
            stacked: true,
          }}
          yFormat=" >-,.0r"
          curve="catmullRom"
          axisLeft={null}
          axisBottom={null}
          enableGridX={false}
          enableGridY={false}
          enablePoints={false}
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
          enableArea={true}
          enableTouchCrosshair={false}
          useMesh={false}
          animate={false}
        />
      </div>
    </section>
  );
};
