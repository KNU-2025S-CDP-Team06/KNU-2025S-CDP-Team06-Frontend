import { HTMLAttributes } from "react";
import Title from "@components/ui/Title";
import { useGetSales } from "@/hooks/api/sales";
import LineGraph from "@components/graph/LineGraph";
import BothsideText from "@components/ui/BothsideText";
import BothsideTitle from "@components/ui/BothsideTitle";
import MoveButton from "@components/ui/MoveButton";

const SalesReport = () => {
  const { data: manydayData, isLoading: isManydayDataLoading } = useGetSales({
    startDate: "2025-03-01",
    endDate: "2025-04-09",
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <Title label="실시간 매출 리포트"></Title>
      </div>
      {isManydayDataLoading ? <>스켈레톤</> : <LineGraph data={manydayData!} />}

      <div className="flex flex-col gap-0.5 p-2">
        <BothsideTitle label="오늘의 매출" value={`676,500원`} />
        <BothsideText
          label="전날 대비"
          value={`+40,100 (4.1%)`}
          valueColor="text-red-500"
        />
        <BothsideText
          label="전주 대비"
          value={`+33,470 (7.6%)`}
          valueColor="text-red-500"
        />
        <BothsideText
          label="전월 대비"
          value={`-27,680 (5.5%)`}
          valueColor="text-blue-500"
        />
      </div>
      <MoveButton>매출 리포트 더보기</MoveButton>
    </div>
  );
};

export default SalesReport;
