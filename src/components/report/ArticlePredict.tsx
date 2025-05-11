import { useGetSales } from "@/hooks/api/sales";
import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import { useGetWeather } from "@/hooks/api/weather";
import { useEffect, useState, HTMLAttributes } from "react";
import { useGetStoreData } from "@/hooks/api/storeData";
import { useGetOneDayPredict } from "@/hooks/api/predict";
import { SunnyIcon, RainIcon, SnowIcon, CloudyIcon } from "@components/Icons";

const ArticlePredict = () => {
  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: "2025-03-01",
    endDate: "2025-04-09",
  });

  const { data: weatherData, isLoading: isweatherDataLoading } =
    useGetWeather("2025-04-10");

  const { data: predictData, isLoading: isPredictDataLoading } =
    useGetOneDayPredict("2025-04-10");

  const [timestamp, setTimestamp] = useState<string>("");
  const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);

  const { data: storeData, isLoading: isStoreLoading } = useGetStoreData({
    id: 1,
  });

  type WeatherCode =
    | "Clear"
    | "Clouds"
    | "Fog"
    | "Haze"
    | "Mist"
    | "Smoke"
    | "Rain"
    | "Snow";

  const pickWeatherIcon = (code: WeatherCode) => {
    switch (code) {
      case "Clear":
        return <SunnyIcon className="w-8 h-8 text-yellow-400" />;
      case "Rain":
        return <RainIcon className="w-8 h-8 text-neutral-600" />;
      case "Snow":
        return <SnowIcon className="w-8 h-8 text-blue-300" />;
      case "Clouds":
      case "Fog":
      case "Haze":
      case "Mist":
      case "Smoke":
        return <CloudyIcon className="w-8 h-8 text-neutral-400" />;
      default:
        return null;
    }
  };
  useEffect(() => {
    const makeTimestamp = () => {
      const now = new Date();
      const mm = String(now.getMonth() + 1);
      const dd = String(now.getDate()).padStart(2, "0");

      return `${mm}월 ${dd}일`;
    };

    setTimestamp(makeTimestamp());

    const id = setInterval(() => setTimestamp(makeTimestamp()), 60_000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isPredictDataLoading && !isManydayDataLoading) {
      const graphData: BarGraphData[] = [];
      manydayData!.slice(-4).forEach((data) => {
        const revenue = Math.floor(data.total_revenue / 10000);
        graphData.push({
          data: revenue,
          title: `${revenue}만원`,
          paragraph: `${data.date.slice(5)}`,
        });
      });
      graphData.push({
        data: Math.floor(
          (predictData!.prophet_forecast *
            (predictData!.xgboost_forecast + 1)) /
            10000
        ),
        title: `${Math.floor(
          (predictData!.prophet_forecast *
            (predictData!.xgboost_forecast + 1)) /
            10000
        )}만원`,
        paragraph: "04-10",
        ispredict: true,
      });
      setBarGraphData(graphData);
    }
  }, [isPredictDataLoading, isManydayDataLoading]);

  return (
    <ArticleThumbnail title="내일 예상 매출 리포트">
      <div className="flex flex-col flex-grow gap-2 text-black">
        <section className="flex text-2xl font-normal">
          <article className="flex flex-col flex-grow ">
            <span className="text-base font-semibold">{timestamp}</span>
            <span className="text-base font-normal">
              {isStoreLoading ? (
                <>스켈레톤</>
              ) : (
                storeData!.address.split(" ").slice(0, 2).join(" ")
              )}
            </span>
          </article>
          {isweatherDataLoading ? (
            "스켈레톤"
          ) : (
            <article className="flex items-center justify-center">
              {pickWeatherIcon(weatherData!.weather as WeatherCode)}
              <span className="ml-1 text-2xl">
                {weatherData!.feeling}
                {"º"}
              </span>
            </article>
          )}
        </section>

        <SaleText
          label="내일의 예측 매출:"
          percentage="(+11.8%)"
          valueColor="text-red-500"
        >
          {isPredictDataLoading ? (
            <>스켈레톤</>
          ) : (
            predictData!.prophet_forecast.toLocaleString("ko-KR") + "원"
          )}
        </SaleText>
        {isPredictDataLoading || isManydayDataLoading ? (
          <>스켈레톤</>
        ) : (
          <BarGraph data={barGraphData} height={60} />
        )}
      </div>
    </ArticleThumbnail>
  );
};

export default ArticlePredict;

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

export type BarGraphData = {
  data: number;
  title?: string;
  paragraph?: string;
  ispredict?: boolean;
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
    return Math.max(max, cur.data);
  }, 0);

  const heightTable = data.map((data) => `${height * (data.data / max)}px`);

  return (
    <section className="bg-white rounded-2xl">
      <div className="flex items-end justify-center gap-3 py-2 ">
        {data.map((data, index) => {
          return (
            <div key={index} className="flex flex-col items-center flex-grow">
              {data.ispredict && (
                <div className="py-0.5 px-2 mb-1 bg-white border rounded-full border-neutral-200 text-xs font-bold text-blue-500">
                  예상
                </div>
              )}
              <div
                style={{ height: heightTable[index] }}
                className={`w-full rounded-lg ${colorTable[index]}`}
              />
              <h1
                style={{
                  lineHeight: "110%",
                }}
                className={`${titleFontSize} mt-1 font-medium`}
              >
                {data.title}
              </h1>
              <p className={`${paragraphFontSize} font-extralight`}>
                {data.paragraph}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
