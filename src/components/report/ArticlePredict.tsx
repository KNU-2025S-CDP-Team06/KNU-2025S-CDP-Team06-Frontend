import { useGetSales } from "@/hooks/api/sales";
import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import { useGetWeather } from "@/hooks/api/weather";
import { useEffect, useState, HTMLAttributes } from "react";
import { useGetStoreData } from "@/hooks/api/storeData";
import { useGetOneDayPredict } from "@/hooks/api/predict";
import { SunnyIcon, RainIcon, SnowIcon, CloudyIcon } from "@components/Icons";
import { getThisDay } from "@/utils/day";
import Skeleton from "@components/ui/Skeleton";
import { useNavigate } from "react-router-dom";
const ArticlePredict = () => {
  const today = getThisDay();
  const navigate = useNavigate();

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: today.subtract(3, "days").format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
  });

  const { data: weatherData, isLoading: isWeatherDataLoading } = useGetWeather(
    today.add(1, "day").format("YYYY-MM-DD")
  );

  const { data: predictData, isLoading: isPredictDataLoading } =
    useGetOneDayPredict(today.add(1, "day").format("YYYY-MM-DD"));

  const [timestamp, setTimestamp] = useState<string>("");
  const [timeaxis, setTimeaxis] = useState<string>("");
  const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);

  const { data: storeData, isLoading: isStoreLoading } = useGetStoreData({
    id: 1,
  });

  const isDataLoading =
    isManydayDataLoading ||
    isWeatherDataLoading ||
    isPredictDataLoading ||
    isStoreLoading;

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
    setTimestamp(today.add(1, "day").format("MM월 DD일"));
  }, []);

  useEffect(() => {
    setTimeaxis(today.add(1, "day").format("MM-DD"));
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
        paragraph: timeaxis,
        ispredict: true,
      });
      setBarGraphData(graphData);
    }
  }, [isPredictDataLoading, isManydayDataLoading]);

  return (
    <ArticleThumbnail
      title="내일 예상 매출 리포트"
      onClick={() => {
        navigate("/report/predict");
      }}
    >
      {isDataLoading ? (
        <Skeleton height={217} />
      ) : (
        <div className="flex flex-col flex-grow gap-2 text-black">
          <section className="flex text-2xl font-normal">
            <article className="flex flex-col flex-grow ">
              <span className="text-base font-semibold">{timestamp}</span>
              <span className="text-base font-normal">
                {storeData!.address.split(" ").slice(0, 2).join(" ")}
              </span>
            </article>
            <article className="flex items-center justify-center">
              {pickWeatherIcon(weatherData!.weather as WeatherCode)}
              <span className="ml-1 text-2xl">
                {weatherData!.feeling}
                {"º"}
              </span>
            </article>
          </section>
          <SaleText
            label="내일의 예상 매출:"
            percentage=""
            valueColor="text-red-500"
          >
            {(
              Math.floor(
                (predictData!.prophet_forecast *
                  (predictData!.xgboost_forecast + 1)) /
                  10
              ) * 10
            ).toLocaleString("ko-KR") + "원"}
          </SaleText>
          <BarGraph data={barGraphData} height={65} />
        </div>
      )}
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
      <div className="flex items-end justify-center gap-3 ">
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
