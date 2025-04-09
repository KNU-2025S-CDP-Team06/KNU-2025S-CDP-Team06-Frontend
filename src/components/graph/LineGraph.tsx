// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { DailySales } from "@/models/dailySales.model";
import SmallButton from "@components/ui/SmallButton";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useEffect, useState } from "react";

const LineGraph = ({
  data,
  plotBy = "total_revenue",
}: {
  data: DailySales[];
  plotBy?: "total_revenue" | "total_count";
}) => {
  const [graphData, setGraphData] = useState<Serie[]>([]);
  const [max, setMax] = useState<number>(0);

  useEffect(() => {
    setGraphData([
      {
        id: "data",
        data: data.map((dailyData) => {
          return {
            y: dailyData[plotBy],
            x: `${dailyData.date.toISOString().slice(5, 10)}`,
          };
        }),
      },
    ]);
    const maxVal = data.reduce((max, curr) => {
      return Math.max(curr[plotBy], max);
    }, 0);
    const maxStep = Math.pow(10, Math.floor(Math.log10(maxVal)));
    setMax(maxStep * Math.ceil(maxVal / maxStep));
  }, []);

  return (
    <section className="flex flex-col gap-4 p-4 overflow-hidden rounded-2xl bg-neutral-100">
      <div className="w-full h-[300px]">
        <ResponsiveLine
          data={graphData}
          margin={{ top: 20, right: 15, bottom: 30, left: 50 }}
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
            format: ">-,.0r",
            tickSize: 5,
            tickValues: 5,
            tickPadding: 5,
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
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
                className="px-1 text-sm font-semibold bg-white rounded-md shadow-md"
              >
                {point.point.data.y.toLocaleString()}
              </div>
            );
          }}
          enableArea={true}
          enableTouchCrosshair={true}
          useMesh={true}
          animate={false}
        />
      </div>
      <div className="flex gap-2 px-8">
        <SmallButton className="flex-grow">1일</SmallButton>
        <SmallButton className="flex-grow">1주일</SmallButton>
        <SmallButton className="flex-grow">1개월</SmallButton>
      </div>
    </section>
  );
};

export default LineGraph;
