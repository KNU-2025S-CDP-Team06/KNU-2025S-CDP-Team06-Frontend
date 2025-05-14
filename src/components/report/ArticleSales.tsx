import { useGetSales } from "@/hooks/api/sales";
import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import { DailySales } from "@/models/dailySales.model";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useEffect, useState, HTMLAttributes } from "react";
import { useGetOneDaySales } from "@/hooks/api/sales";
import dayjs from "dayjs";
import { getThisDay } from "@/utils/day";
import { getPercentAndColor } from "@/utils/percent";
import Skeleton from "@components/ui/Skeleton";
import { useNavigate } from "react-router-dom";
const ArticleSales = () => {
  const today = getThisDay();
  const navigate = useNavigate();

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

  const { data: yearagoData, isLoading: isYearagoDataLoading } =
    useGetOneDaySales({
      date: today.subtract(1, "year").format("YYYY-MM-DD"),
      endHour: thisHour,
    });

  const isDataLoading =
    isManydayDataLoading ||
    isDayagoDataLoading ||
    isWeekagoDataLoading ||
    isMonthagoDataLoading ||
    isYearagoDataLoading;

  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const now = dayjs();
    setTimestamp(now.format("YY.MM.DD HH:mm"));
  }, []);

  return (
    <ArticleThumbnail
      title="실시간 매출 리포트"
      onClick={() => {
        navigate("/report/sales");
      }}
    >
      {isDataLoading ? (
        <Skeleton height={220} />
      ) : (
        <div className="flex flex-col flex-grow w-full gap-2 text-black">
          <h1 className="text-base font-semibold">주간 매출 그래프</h1>
          <div>
            <ArticleLineGraph data={manydayData!} />
            <span className="text-xs font-light text-gray-400">
              {timestamp} 기준
            </span>
          </div>

          <SaleText
            label="오늘의 매출:"
            fromData={dayagoData!.total_revenue}
            toData={manydayData!.slice(-1)[0].total_revenue}
          >
            {manydayData?.slice(-1)[0].total_revenue.toLocaleString("ko-KR") +
              "원"}
          </SaleText>
          <div className="flex items-center justify-center">
            <CompareText
              label="전 주 대비"
              fromData={weekagoData!.total_revenue}
              toData={manydayData![0].total_revenue}
            />
            <CompareText
              label="전 달 대비"
              fromData={monthagoData!.total_revenue}
              toData={manydayData![0].total_revenue}
            />
            <CompareText
              label="전 년 대비"
              fromData={yearagoData!.total_revenue}
              toData={manydayData![0].total_revenue}
            />
          </div>
        </div>
      )}
    </ArticleThumbnail>
  );
};

export default ArticleSales;

interface CompareTextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  fromData: number;
  toData: number;
}

const CompareText = ({ label, fromData, toData }: CompareTextProps) => {
  const [percent, color] = getPercentAndColor(fromData, toData);
  return (
    <div className="flex flex-col items-center flex-grow ">
      <span className="text-sm font-medium">{label}</span>
      <span className={`${color} text-sm font-medium`}>{percent}</span>
    </div>
  );
};

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
    const sliced = data.slice(-7);
    const maxVal = sliced.reduce((m, cur) => Math.max(m, cur[plotBy]), 0);

    setGraphData([
      {
        id: "data",
        data: sliced.map((d) => {
          const dt = new Date(d.date);
          return {
            y: d[plotBy],
            x: dt,
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
