import { useGetSales } from "@/hooks/api/sales";
import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import { DailySales } from "@/models/dailySales.model";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useEffect, useState, HTMLAttributes } from "react";
import { useGetOneDaySales } from "@/hooks/api/sales";
import { useGetTotalSales } from "@/hooks/api/sales";

const ArticleMonthly = () => {
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

  const [month, setMonth] = useState<string>("");

  useEffect(() => {
    const makeMonth = () => {
      const now = new Date();
      const mm = String(now.getMonth() + 1);
      return `${mm}월`;
    };

    setMonth(makeMonth());
    const id = setInterval(() => setMonth(makeMonth()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <ArticleThumbnail title="월간 매출 리포트">
      <div className="flex flex-col flex-grow gap-2 text-black">
        <h1 className="text-base font-semibold">{month} 매출 그래프</h1>

        {isManydayDataLoading ? (
          <>스켈레톤</>
        ) : (
          <ArticleLineGraph data={manydayData!} />
        )}

        <SaleText
          label={`${month}` + "의 매출:"}
          percentage="(+11%)"
          valueColor="text-red-500"
        >
          {isTotalSalesLoading ? (
            <>스켈레톤</>
          ) : (
            totalSales!.total_revenue.toLocaleString("ko-KR") + "원"
          )}
        </SaleText>

        <div className="text-base font-medium">
          <span className="text-base font-normal">판매된 메뉴 개수: </span>
          {isTotalSalesLoading ? (
            <>스켈레톤</>
          ) : (
            totalSales!.total_count.toLocaleString("ko-KR") + "개"
          )}
        </div>
      </div>
    </ArticleThumbnail>
  );
};

export default ArticleMonthly;

interface SaleTextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  percentage: string;
  valueColor?: string;
}
const SaleText = ({
  label,
  percentage,
  valueColor = "text-black",
  ...props
}: SaleTextProps) => {
  return (
    <div className="flex items-center text-base font-medium gap-1">
      <span className="font-normal ">{label}</span>
      {props.children}
      <span className={`${valueColor}`}>{percentage}</span>
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
    setMax(step * Math.ceil(maxVal / step));
    setLeftpad(Math.floor(Math.log10(maxVal)) * 11);
  }, [data, plotBy]);

  return (
    <section className="flex flex-col gap-4  overflow-visible rounded-2xl bg-white">
      <div className="w-full h-20">
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
