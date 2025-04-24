import { DailySales } from "@/models/dailySales.model";
import BarGraph from "@components/graph/BarGraph";
import LineGraph from "@components/graph/LineGraph";
import MenuElement from "@components/ui/MenuElement";
import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import PieGraph from "@components/graph/PieGraph";
import { useEffect } from "react";
import { useGetOneDaySales } from "@/hooks/api/sales";
const Playground = () => {
  const dummy_data: DailySales[] = [
    // 2025년 3월
    {
      date: new Date("2025-03-01"),
      total_revenue: 512300,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-02"),
      total_revenue: 430100,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-03"),
      total_revenue: 589600,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-04"),
      total_revenue: 600200,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-05"),
      total_revenue: 478300,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-06"),
      total_revenue: 656700,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-07"),
      total_revenue: 544400,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-08"),
      total_revenue: 621000,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-09"),
      total_revenue: 498200,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-10"),
      total_revenue: 583900,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-11"),
      total_revenue: 562300,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-12"),
      total_revenue: 610500,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-13"),
      total_revenue: 474000,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-14"),
      total_revenue: 533600,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-15"),
      total_revenue: 611800,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-16"),
      total_revenue: 496900,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-17"),
      total_revenue: 650300,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-18"),
      total_revenue: 618400,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-19"),
      total_revenue: 508200,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-20"),
      total_revenue: 602300,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-21"),
      total_revenue: 590400,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-22"),
      total_revenue: 471000,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-23"),
      total_revenue: 612900,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-24"),
      total_revenue: 502300,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-25"),
      total_revenue: 599800,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-26"),
      total_revenue: 533300,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-27"),
      total_revenue: 650000,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-28"),
      total_revenue: 488800,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-29"),
      total_revenue: 603300,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-30"),
      total_revenue: 579200,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-03-31"),
      total_revenue: 621700,
      total_count: 0,
      sales_data: [],
    },

    // 2025년 4월
    {
      date: new Date("2025-04-01"),
      total_revenue: 595000,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-04-02"),
      total_revenue: 530000,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-04-03"),
      total_revenue: 494700,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-04-04"),
      total_revenue: 640800,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-04-05"),
      total_revenue: 585900,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-04-06"),
      total_revenue: 676700,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-04-07"),
      total_revenue: 216300,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-04-08"),
      total_revenue: 591800,
      total_count: 0,
      sales_data: [],
    },
    {
      date: new Date("2025-04-09"),
      total_revenue: 625200,
      total_count: 0,
      sales_data: [],
    },
  ];

  const { data: dailySalesData, isLoading: isDailySalesDataLoading } =
    useGetOneDaySales(new Date("2025-04-14"));

  useEffect(() => {
    console.log(dailySalesData);
  }, [isDailySalesDataLoading]);

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

      <LineGraph data={dummy_data} />

      {isDailySalesDataLoading ? (
        <>스켈레톤</>
      ) : (
        <PieGraph data={dailySalesData!.sales_data} />
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
