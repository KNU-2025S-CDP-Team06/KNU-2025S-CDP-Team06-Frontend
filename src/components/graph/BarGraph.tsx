import { HTMLAttributes } from "react";

export type BarGraphData = {
  data: number;
  title?: string;
  paragraph?: string;
  ispredict?: boolean;
  predictData?: number;
};

interface BarGrpahProps extends HTMLAttributes<HTMLDivElement> {
  data: BarGraphData[];
  color?: "monotone" | "gradiant";
  height?: number;
  titleSize?: string;
  paragraphSize?: string;
}

const BarGraph = ({
  data,
  color = "gradiant",
  height = 100,
  titleSize = "base",
  paragraphSize = "xs",
}: BarGrpahProps) => {
  let colorTable: string[];
  if (color === "gradiant")
    colorTable = [
      "bg-blue-100",
      "bg-blue-200",
      "bg-blue-300",
      "bg-blue-400",
      "bg-blue-500",
      "bg-blue-600",
      "bg-blue-700",
      "bg-blue-800",
      "bg-blue-900",
    ].slice(0, data.length);
  else {
    colorTable = Array(data.length);
    colorTable.fill("bg-blue-400");
  }

  const titleFontSize = `text-${titleSize}`;
  const paragraphFontSize = `text-${paragraphSize}`;

  const max = data.reduce((max, cur) => {
    return Math.max(max, cur.data, cur.predictData ?? 0);
  }, 0);

  const heightTable = data.map((data) => `${height * (data.data / max)}px`);
  const predictHeightTable = data.map((data) =>
    data.predictData
      ? `calc(${height - height * (data.predictData / max)}px + 0.125rem)`
      : "-24px"
  );

  return (
    <section className="p-4 rounded-2xl bg-neutral-100">
      <div className="flex items-end justify-center gap-3 py-2 ">
        {data.map((data, index) => {
          return (
            <div
              key={index}
              className="relative flex-grow flex flex-col gap-0.5 items-center w-8"
            >
              {data.ispredict && (
                <div className="py-0.5 px-2 mb-1 bg-white border rounded-full border-neutral-200 text-xs font-bold text-blue-500">
                  예상
                </div>
              )}
              {data.predictData && (
                <div
                  style={{
                    transform: `translateY(${predictHeightTable[index]})`,
                  }}
                  className="text-sm font-bold text-center border-b-2 border-dashed min-w-16 w-fit text-neutral-600 border-neutral-600"
                >
                  {data.predictData}만원
                </div>
              )}
              <div
                style={{ height: `${height}px` }}
                className="flex items-end w-full"
              >
                <div
                  style={{ height: heightTable[index] }}
                  className={`w-full rounded-lg ${colorTable[index]}`}
                />
              </div>
              <h1 className={`${titleFontSize} font-medium`}>{data.title}</h1>
              <p className={`${paragraphFontSize} font-normal`}>
                {data.paragraph}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BarGraph;
