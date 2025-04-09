import { DailySales } from "@/models/dailySales.model";
import BarGraph from "@components/graph/BarGraph";
import LineGraph from "@components/graph/LineGraph";

const Playground = () => {
  const dummy_data: DailySales[] = [
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
    </div>
  );
};
export default Playground;
