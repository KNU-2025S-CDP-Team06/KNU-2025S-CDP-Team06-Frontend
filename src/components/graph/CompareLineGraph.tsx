import { DailySales } from "@/models/dailySales.model";
import { Predict } from "@/models/predict.model";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useMemo } from "react";

const calcPredictRevenue = (p: Predict) =>
  Math.floor((p.prophet_forecast * (p.xgboost_forecast + 1)) / 10) * 10;

const CompareLineGraph = ({
  sales,
  predict,
}: {
  sales: DailySales[];
  predict: Predict[];
}) => {
  const { graphData, max, leftpad } = useMemo(() => {
    const slicedSales = sales.slice(-5, -1);
    const slicedPredicts = predict.slice(-5, -1);

    if (slicedSales.length === 0 || slicedPredicts.length === 0) {
      return { graphData: [], max: 0, leftpad: 0 };
    }

    const maxVal = Math.max(
      ...slicedSales.map((d) => d.total_revenue),
      ...slicedPredicts.map(calcPredictRevenue)
    );
    const maxStep = 10 ** Math.floor(Math.log10(maxVal || 1));
    const maxRound = maxStep * Math.ceil((maxVal || 1) / maxStep);

    const fmt = (d: string | Date) => {
      const date = typeof d === "string" ? new Date(d) : d;
      return [
        (date.getMonth() + 1).toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0"),
      ].join("-");
    };
    const series: Serie[] = [
      {
        id: "sales",
        color: "#0E9CFF",
        data: slicedSales.map((d) => ({
          x: fmt(d.date),
          y: d.total_revenue,
        })),
      },
      {
        id: "predict",
        color: "#FB923C",
        data: slicedPredicts.map((p, idx) => ({
          x: fmt(slicedSales[idx].date),
          y: calcPredictRevenue(p),
        })),
      },
    ];

    return {
      graphData: series,
      max: maxRound,
      leftpad: Math.floor(Math.log10(maxVal || 1)) * 11,
    };
  }, [sales, predict]);

  return (
    <div className="w-full h-[320px] px-4 pt-6 pb-8 rounded-2xl bg-neutral-100">
      {graphData.length === 0 ? null : (
        <ResponsiveLine
          data={graphData}
          margin={{ top: 20, right: 20, bottom: 30, left: leftpad }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max, stacked: false }}
          yFormat=" ,.0f"
          curve="linear"
          axisLeft={{
            format: ",.0f",
            tickSize: 5,
            tickPadding: 5,
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisBottom={{ tickValues: graphData[0].data.map((d) => d.x) }}
          colors={graphData.map((s) => (s as any).color)}
          lineWidth={4}
          pointSize={10}
          pointColor="#ffffff"
          pointBorderWidth={3}
          pointBorderColor={{ from: "serieColor" }}
          tooltip={(point) => (
            <div className="px-2 py-1 text-xs font-bold bg-white border rounded-sm shadow-md border-neutral-300">
              ₩{point.point.data.y.toLocaleString()}
            </div>
          )}
          enableArea={false}
          enableTouchCrosshair
          useMesh
          animate={false}
        />
      )}
      <div className="flex  justify-center items-center gap-8">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: "#0E9CFF" }}
          />
          <span className="text-xs font-medium">실제 매출</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: "#FB923C" }}
          />
          <span className="text-xs font-medium">예상 매출</span>
        </div>
      </div>
    </div>
  );
};

export default CompareLineGraph;
