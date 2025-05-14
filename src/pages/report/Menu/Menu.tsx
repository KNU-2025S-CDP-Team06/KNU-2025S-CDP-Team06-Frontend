import PieGraph from "@components/graph/PieGraph";
import { useGetOneDaySales } from "@/hooks/api/sales";
import MenuList from "@components/ui/MenuList";
import Skeleton from "@components/ui/Skeleton";
import { getThisDay } from "@/utils/day";

const Menu = () => {
  const today = getThisDay();

  const { data: onedayData, isLoading: isOnedayDataLoading } =
    useGetOneDaySales({ date: today.format("YYYY-MM-DD") });

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      <div className="flex items-center justify-center"></div>
      {isOnedayDataLoading ? (
        <Skeleton height={517} />
      ) : (
        <PieGraph data={onedayData!.sales_data} />
      )}
      <div className="h-[1px] bg-neutral-300 w-full" />

      <div>
        {isOnedayDataLoading ? (
          <Skeleton height={516} />
        ) : (
          <MenuList
            title="오늘 가장 많이 판매된 메뉴"
            data={onedayData!.sales_data}
            prevData={onedayData!.sales_data}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
