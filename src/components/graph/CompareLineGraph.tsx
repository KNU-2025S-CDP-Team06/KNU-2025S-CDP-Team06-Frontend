// FiveDayLineGraph.tsx
import { DailySales } from "@/models/dailySales.model";
import { Predict } from "@/models/predict.model";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useMemo } from "react";

const CompareLineGraph = ({
  sales,
  predict, //ployby 필요없으니 빼고, predict를 받음
}: {
  sales: DailySales[];
  predict: Predict[]; //predict는 모델 Predict로 이루어진 리스트 (한 4일치 정도?)
}) => {
  const calcPredictRevenue = (p: Predict) =>
    Math.floor((p.prophet_forecast * (p.xgboost_forecast + 1)) / 10) * 10; //계산식

  const { graphData, max, leftpad } = useMemo(() => {
    const slicedSales = sales.slice(-5, -1);
    const slicedPredict = predict.slice(-5, -1); // 당일 데이터는 안쓸거니까 마지막 요소 제외 최근 4개

    const maxVal = Math.max(
      ...slicedSales.map((d) => d.total_revenue),
      ...slicedPredict.map(calcPredictRevenue) //이게 맞는 부분인지 좀 몰겟음
    );
    const maxStep = 10 ** Math.floor(Math.log10(maxVal));
    const maxRound = maxStep * Math.ceil(maxVal / maxStep);

    const fmt = (dt: Date) =>
      `${String(dt.getMonth() + 1).padStart(2, "0")}-${String(
        dt.getDate()
      ).padStart(2, "0")}`;

    return {
      graphData: [
        {
          id: "sales",
          color: "#737373",
          data: slicedSales.map((d) => ({
            x: fmt(new Date(d.date)),
            y: d.total_revenue,
          })),
        },
        {
          id: "predict",
          data: slicedPredict.map((p, idx) => ({
            x: fmt(new Date(slicedSales[idx].date)), //slicepredict엔 date가 없어서 빌려오기
            y: calcPredictRevenue(p),
          })),
        },
      ] as Serie[],
      max: maxRound,
      leftpad: Math.floor(Math.log10(maxVal)) * 11,
    };
  }, [sales, predict]);

  return (
    <div className="w-full h-[300px] p-4 rounded-2xl bg-neutral-100">
      <ResponsiveLine
        data={graphData}
        margin={{ top: 20, right: 20, bottom: 30, left: leftpad }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max, stacked: false }}
        yFormat=" >-,.0r"
        curve="linear"
        axisLeft={{
          format: ">-,.0r",
          tickSize: 5,
          tickPadding: 5,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        axisBottom={{ tickValues: graphData[0].data.map((d) => d.x) }}
        colors={["#0E9CFF", "#737373"]}
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
        enableTouchCrosshair={true}
        useMesh={true}
        animate={false}
      />
    </div>
  );
};

export default CompareLineGraph;
