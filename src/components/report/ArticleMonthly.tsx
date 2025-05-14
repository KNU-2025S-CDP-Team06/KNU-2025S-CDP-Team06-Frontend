import { useGetSales } from "@/hooks/api/sales";
import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import { DailySales } from "@/models/dailySales.model";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useEffect, useState, HTMLAttributes } from "react";
import { useGetTotalSales } from "@/hooks/api/sales";
import { getThisDay, getThisMonth } from "@/utils/day";
import { getPercentAndColor } from "@/utils/percent";
import Skeleton from "@components/ui/Skeleton";
import { useNavigate } from "react-router-dom";

const ArticleMonthly = () => {
  const today = getThisDay();
  const thisMonth = getThisMonth();
  const navigate = useNavigate();

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: today.subtract(1, "month").format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
  });

  const { data: totalSales, isLoading: isTotalSalesLoading } = useGetTotalSales(
    {
      startDate: thisMonth.format("YYYY-MM-DD"),
      endDate: today.format("YYYY-MM-DD"),
    }
  );

  const { data: monthAgoTotalSales, isLoading: isMonthAgoTotalSalesLoading } =
    useGetTotalSales({
      startDate: thisMonth.subtract(1, "month").format("YYYY-MM-DD"),
      endDate: today.subtract(1, "month").format("YYYY-MM-DD"),
    });

  const [month, setMonth] = useState<string>("");

  const isDataLoading =
    isManydayDataLoading || isTotalSalesLoading || isMonthAgoTotalSalesLoading;

  useEffect(() => {
    setMonth(`${today.get("month") + 1}월`);
  }, []);

  return (
    <ArticleThumbnail
      title="월간 매출 리포트"
      onClick={() => {
        navigate("/report/monthly");
      }}
    >
      {isDataLoading ? (
        <Skeleton height={176} />
      ) : (
        <div className="flex flex-col flex-grow w-full gap-2 text-black">
          <h1 className="text-base font-semibold">{month} 매출 그래프</h1>
          <ArticleLineGraph data={manydayData!} />
          <SaleText
            label={`${month}` + "의 매출:"}
            fromData={monthAgoTotalSales!.total_revenue}
            toData={totalSales!.total_revenue}
          >
            {totalSales!.total_revenue.toLocaleString("ko-KR") + "원"}
          </SaleText>
          <div className="text-base font-medium">
            <span className="text-base font-normal">판매된 메뉴 개수: </span>
            {totalSales!.total_count.toLocaleString("ko-KR") + "개"}
          </div>
        </div>
      )}
    </ArticleThumbnail>
  );
};

export default ArticleMonthly;

interface SaleTextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  fromData: number;
  toData: number;
}
const SaleText = ({ label, fromData, toData, ...props }: SaleTextProps) => {
  const [percent, color] = getPercentAndColor(fromData, toData);
  return (
    <div className="flex items-center gap-1 text-base font-medium">
      <span className="font-normal ">{label}</span>
      {props.children}
      <span className={`${color}`}>({percent})</span>
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
  }, [data, plotBy]);

  return (
    <section className="flex flex-col gap-4 overflow-visible bg-white rounded-2xl">
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
