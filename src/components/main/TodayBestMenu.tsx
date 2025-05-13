import Title from "@components/ui/Title";
import MoreSales from "@components/ui/MoreSales";
import MoveButton from "@components/ui/MoveButton";
import PieGraph from "@components/graph/PieGraph";
import { useGetOneDaySales } from "@/hooks/api/sales";
import LessSales from "@components/ui/LessSales";
const TodayBestMenu = () => {
  const { data: onedayData, isLoading: isOnedayDataLoading } =
    useGetOneDaySales({ date: "2025-03-26" });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <Title>오늘 가장 많이 판매된 메뉴</Title>
      </div>
      {isOnedayDataLoading ? (
        <>스켈레톤</>
      ) : (
        <PieGraph data={onedayData!.sales_data} />
      )}
      <div className="gap-2">
        <span className="text-lg font-medium">지난주보다 많이 판매된 메뉴</span>
        <MoreSales label="레몬에이드" value="+ 3개 (5개)"></MoreSales>
        <MoreSales label="사이즈업 라떼" value="+ 2개 (7개)"></MoreSales>
      </div>
      <div className="gap-2">
        <span className="text-lg font-medium">지난주보다 적게 판매된 메뉴</span>
        <LessSales label="수제 자몽티" value="- 4개 (2개)"></LessSales>
        <LessSales label="찹쌀모찌(1개)" value="- 5개 (1개)"></LessSales>
      </div>
      <MoveButton>메뉴 판매 순위 더보기</MoveButton>
    </div>
  );
};

export default TodayBestMenu;
