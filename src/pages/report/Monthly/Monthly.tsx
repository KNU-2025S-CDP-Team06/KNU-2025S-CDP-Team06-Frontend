import { useGetSales } from "@/hooks/api/sales";
import { DailySales } from "@/models/dailySales.model";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useEffect, useState, HTMLAttributes } from "react";
import { useGetTotalSales } from "@/hooks/api/sales";
import BothsideTitle from "@components/ui/BothsideTitle";
import BothsideText from "@components/ui/BothsideText";
import Title from "@components/ui/Title";

const Monthly = () => {
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
    <div className="flex flex-col gap-4 justify-center px-4 py-3">
      {isManydayDataLoading ? (
        <>스켈레톤</>
      ) : (
        <ArticleLineGraph data={manydayData!} />
      )}
      <div>
        <BothsideTitle
          label={`${month}` + " 총 매출"}
          value={
            isTotalSalesLoading
              ? "스켈레톤"
              : totalSales!.total_revenue.toLocaleString("ko-KR") + "원"
          }
        />
        <BothsideText
          label="전월 대비"
          value={"+423,500(4.1%)"}
          valueColor="text-red-500"
        />
      </div>
      <div className="h-[1px] bg-neutral-300 w-full" />
      <Title>요일별 평균 매출</Title>
      <Title>주중 · 주말별 평균 매출</Title>
      <Title>인기가 상승 · 하락한 메뉴</Title>
    </div>
  );
};

export default Monthly;

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
    <div className="flex items-center gap-1 text-base font-medium">
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
    setLeftpad(Math.floor(Math.log10(maxVal)) * 11);
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
          yFormat=" >-,.0r"
          curve="catmullRom"
          axisLeft={{
            tickValues: Array.from({ length: 5 }, (_, i) =>
              Math.round((max / 4) * i)
            ),
            format: ">-,.0r",
            tickSize: 4,
            tickPadding: 6,
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
