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
  const [graphData, setGraphData] = useState<Serie[]>([{ id: "", data: [] }]);
  const [max, setMax] = useState<number>(0);
  const [leftpad, setLeftpad] = useState<number>(0);

  const [plot, setPlot] = useState<number>(1);

  useEffect(() => {
    let maxVal = 0;
    if (plot != 0) {
      const slicedData = data.slice(plot == 1 ? -7 : -31);
      maxVal = slicedData.reduce<number>((max, curr) => {
        return Math.max(max, curr[plotBy]);
      }, 0);
      setGraphData([
        {
          id: "data",
          data: slicedData.map((dailyData) => {
            const date = new Date(dailyData.date);
            return {
              y: dailyData[plotBy],
              x: `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}`,
            };
          }),
        },
      ]);
    } else {
      const hourData: { [key: number]: number } = {};
      for (let hour = 0; hour < 24; hour++) hourData[hour] = 0;
      const currentHour = new Date().getHours();
      data.slice(-2, -1)[0].sales_data.forEach((data) => {
        const dataHour = new Date(data.date_time).getHours();
        if (currentHour < dataHour) {
          if (plotBy == "total_count") hourData[dataHour] += data.count;
          else hourData[dataHour] += data.count * data.menu.price;
        }
      });
      data.slice(-1)[0].sales_data.forEach((data) => {
        if (new Date(data.date_time).getHours() <= currentHour) {
          const dataHour = new Date(data.date_time).getHours();
          if (plotBy == "total_count") hourData[dataHour] += data.count;
          else hourData[dataHour] += data.count * data.menu.price;
        }
      });
      maxVal = Math.max(...Object.values(hourData));
      const graphHourData: number[][] = [];
      for (let hour = currentHour + 1; hour < 24; hour++)
        graphHourData.push([hour, hourData[hour]]);
      for (let hour = 0; hour <= currentHour; hour++)
        graphHourData.push([hour, hourData[hour]]);
      setGraphData([
        {
          id: "data",
          data: graphHourData.map((data) => {
            return {
              y: data[1],
              x: `${data[0]}시`,
            };
          }),
        },
      ]);
    }
    const maxStep = Math.pow(10, Math.floor(Math.log10(maxVal)));
    if (plotBy == "total_revenue")
      setLeftpad(Math.floor(Math.log10(maxVal)) * 11);
    else setLeftpad(Math.floor(Math.log10(maxVal)) * 11 + 11);
    setMax(maxStep * Math.ceil(maxVal / maxStep));
  }, [plot]);
  const tickValueTable = [3, 1, 5];

  return (
    <section className="flex flex-col gap-4 p-4 overflow-visible rounded-2xl bg-neutral-100">
      <div className="w-full h-[300px]">
        <ResponsiveLine
          data={graphData}
          margin={{ top: 20, right: 20, bottom: 30, left: leftpad }}
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
          axisBottom={{
            tickValues: graphData[0].data
              .map((d) => d.x)
              .filter((_, i) => i % tickValueTable[plot] === 0),
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
                className="px-2 py-1 text-xs font-bold bg-white border rounded-sm shadow-md border-neutral-300"
              >
                <h1 className="text-xs font-bold">
                  {point.point.data.x.toString()}:
                </h1>
                <p className="font-medium">
                  {plotBy == "total_revenue"
                    ? `₩${point.point.data.y.toLocaleString()}`
                    : `${point.point.data.y.toLocaleString()}개`}
                </p>
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
        <SmallButton
          isSecondary={plot != 0}
          onClick={() => setPlot(0)}
          className="flex-grow"
        >
          1일
        </SmallButton>
        <SmallButton
          isSecondary={plot != 1}
          onClick={() => setPlot(1)}
          className="flex-grow"
        >
          1주일
        </SmallButton>
        <SmallButton
          isSecondary={plot != 2}
          onClick={() => setPlot(2)}
          className="flex-grow"
        >
          1개월
        </SmallButton>
      </div>
    </section>
  );
};

export default LineGraph;
