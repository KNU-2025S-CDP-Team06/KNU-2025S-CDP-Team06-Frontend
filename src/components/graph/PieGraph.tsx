import { Sales } from "@/models/sales.model";
import SmallButton from "@components/ui/SmallButton";
import { ResponsivePie } from "@nivo/pie";
import { animated } from "@react-spring/web";
import { useEffect, useState } from "react";

interface PieGraphProps {
  data: Sales[];
  maxShownSize?: number;
}

interface PieGraphData {
  id: number;
  value: number;
  arcTitle: string;
  arcParagraph: string;
  legendTitle: string;
  legendParagraph: string;
}

const PieGraph = ({ data, maxShownSize = 5 }: PieGraphProps) => {
  const [plot, setPlot] = useState<0 | 1>(1);

  const [graphData, setGraphData] = useState<PieGraphData[]>([]);

  const otherString = "기타";

  type sortKey = "totalCount" | "totalPrice";
  const sortByTable: sortKey[][] = [
    ["totalPrice", "totalCount"],
    ["totalCount", "totalPrice"],
  ];

  useEffect(() => {
    const menuMap: {
      [menuName: string]: { totalPrice: number; totalCount: number };
    } = {};
    let totalPrice = 0;
    let totalCount = 0;
    const primarySortKey: sortKey = sortByTable[plot][0];
    const secondarySortKey: sortKey = sortByTable[plot][1];
    data.forEach((sale) => {
      if (Object.keys(menuMap).some((key) => key == sale.menu.name)) {
        menuMap[sale.menu.name].totalCount += sale.count;
        menuMap[sale.menu.name].totalPrice += sale.count * sale.menu.price;
      } else {
        menuMap[sale.menu.name] = {
          totalCount: sale.count,
          totalPrice: sale.count * sale.menu.price,
        };
      }
      totalCount += sale.count;
      totalPrice += sale.count * sale.menu.price;
    });
    const sortedMenu = Object.entries(menuMap).sort(
      (a, b) => b[1][primarySortKey] - a[1][primarySortKey]
    );
    const graphDataList: PieGraphData[] = [];
    for (let i = 0; i < sortedMenu.length && i < maxShownSize; i++) {
      const graphData: PieGraphData = {
        id: i + 1,
        value: sortedMenu[i][1][primarySortKey],
        arcTitle: `${sortedMenu[i][1][primarySortKey].toLocaleString("ko-KR")}${
          plot ? "" : "원"
        }`,
        arcParagraph: `${(
          (sortedMenu[i][1][primarySortKey] /
            (plot ? totalCount : totalPrice)) *
          100
        ).toFixed(1)}%`,
        legendTitle: sortedMenu[i][0],
        legendParagraph: `${sortedMenu[i][1][secondarySortKey].toLocaleString(
          "ko-KR"
        )}${plot ? "원" : "개"}`,
      };
      graphDataList.push(graphData);
    }
    if (sortedMenu.length > maxShownSize) {
      menuMap[otherString] = {
        totalCount: 0,
        totalPrice: 0,
      };
      for (let i = maxShownSize; i < sortedMenu.length; i++) {
        menuMap[otherString].totalCount += sortedMenu[i][1].totalCount;
        menuMap[otherString].totalPrice += sortedMenu[i][1].totalPrice;
      }
      const graphData: PieGraphData = {
        id: maxShownSize + 1,
        value: menuMap[otherString][primarySortKey],
        arcTitle: `${menuMap[otherString][primarySortKey].toLocaleString(
          "ko-KR"
        )}${plot ? "" : "원"}`,
        arcParagraph: `${(
          (menuMap[otherString][primarySortKey] /
            (plot ? totalCount : totalPrice)) *
          100
        ).toFixed(1)}%`,
        legendTitle: otherString,
        legendParagraph: `${menuMap[otherString][
          secondarySortKey
        ].toLocaleString("ko-KR")}${plot ? "원" : "개"}`,
      };
      graphDataList.push(graphData);
    }
    setGraphData(graphDataList);
  }, [data, plot]);

  const AnimatedG = animated("g");
  const AnimatedText = animated("text");

  const palette = [
    "#1c398e",
    "#193cb8",
    "#1447e6",
    "#155dfc",
    "#2b7fff",
    "#51a2ff",
    "#8ec5ff",
    "#bedbff",
  ].slice(7 - maxShownSize);

  return (
    <div className="flex flex-col items-center gap-4 p-4 overflow-hidden rounded-2xl bg-neutral-100">
      <div style={{ height: "75vw", maxHeight: "350px" }} className="w-full">
        <ResponsivePie
          data={graphData}
          margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
          innerRadius={0.4}
          activeOuterRadiusOffset={8}
          colors={palette}
          arcLinkLabelsTextOffset={plot ? 12 : 25}
          arcLinkLabelsStraightLength={0}
          arcLinkLabelComponent={({ datum, style }) => {
            return (
              <AnimatedG opacity={style.opacity} transform={style.textPosition}>
                <AnimatedText
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    fill: "#323232",
                  }}
                >
                  {datum.data.arcTitle}
                </AnimatedText>
                <AnimatedText
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{
                    fontSize: "0.8rem",
                    transform: "translateY(1rem)",
                    fill: "#767676",
                  }}
                >
                  {datum.data.arcParagraph}
                </AnimatedText>
              </AnimatedG>
            );
          }}
          tooltip={(data) => {
            const graphDatum = graphData.find(
              (graphdata) => graphdata.id == data.datum.id
            )!;
            return (
              <div className="flex items-center gap-1 px-2 py-1 bg-white border rounded-sm shadow-md border-neutral-300">
                <div
                  style={{ backgroundColor: `${data.datum.color}` }}
                  className="w-2 h-2 rounded-full"
                />
                <h1 className="text-xs font-bold">{graphDatum.legendTitle}</h1>
              </div>
            );
          }}
          enableArcLabels={false}
          animate={false}
        />
      </div>
      <div className="flex flex-col w-full gap-0.5 px-4">
        {graphData.map((data, index) => {
          return (
            <div className="flex items-center justify-center gap-2" key={index}>
              <div
                style={{ backgroundColor: palette[index] }}
                className="w-1.5 h-1.5 rounded-full"
              />
              <p className="flex-grow text-sm font-medium">
                {data.legendTitle}
              </p>
              <p className="text-sm font-medium">{data.legendParagraph}</p>
            </div>
          );
        })}
      </div>
      <div className="flex w-full gap-2 px-8">
        <SmallButton
          isSecondary={plot != 0}
          className="flex-grow"
          onClick={() => setPlot(0)}
        >
          매출 순
        </SmallButton>
        <SmallButton
          isSecondary={plot != 1}
          className="flex-grow"
          onClick={() => setPlot(1)}
        >
          판매량 순
        </SmallButton>
      </div>
    </div>
  );
};

export default PieGraph;
