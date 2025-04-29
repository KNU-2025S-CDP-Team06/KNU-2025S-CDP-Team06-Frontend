import BarGraph from "@components/graph/BarGraph";
import LineGraph from "@components/graph/LineGraph";
import MenuElement from "@components/ui/MenuElement";
import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import PieGraph from "@components/graph/PieGraph";
import { useGetOneDaySales, useGetSales } from "@/hooks/api/sales";
const Playground = () => {
  const { data: onedayData, isLoading: isOnedayDataLoading } =
    useGetOneDaySales("2025-04-14");

  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: "2025-03-01",
    endDate: "2025-04-09",
  });

  return (
    <div className="flex flex-col gap-3 p-4">
      <BarGraph
        data={[
          { data: 14, title: "14만원", paragraph: "03-23" },
          { data: 26, title: "26만원", paragraph: "03-24" },
          { data: 61, title: "61만원", paragraph: "03-25" },
          { data: 67, title: "67만원", paragraph: "03-26" },
          { data: 74, title: "74만원", paragraph: "03-27", ispredict: true },
        ]}
      />

      {isManydayDataLoading ? <>스켈레톤</> : <LineGraph data={manydayData!} />}

      {isOnedayDataLoading ? (
        <>스켈레톤</>
      ) : (
        <PieGraph data={onedayData!.sales_data} />
      )}

      <ArticleThumbnail title="메뉴별 판매리포트" className="w-full bg-white ">
        <div className="flex-col w-full">
          <MenuElement
            number={1}
            image="https://picsum.photos/seed/menu1/40"
            title="아메리카노 (다크)"
            paragraph="83개"
          />
          <MenuElement
            number={2}
            image="https://picsum.photos/seed/menu2/40"
            title="아인슈페너 (ICE)"
            paragraph="21개"
          />
          <MenuElement
            number={3}
            image="https://picsum.photos/seed/menu3/40"
            title="카페라떼"
            paragraph="16개"
          />
        </div>
      </ArticleThumbnail>
    </div>
  );
};
export default Playground;
