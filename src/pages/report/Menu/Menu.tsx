import PieGraph from "@components/graph/PieGraph";
import { useGetOneDaySales } from "@/hooks/api/sales";
import { useGetSales } from "@/hooks/api/sales";
import MenuList from "@components/ui/MenuList";
import Skeleton from "@components/ui/Skeleton";
const Menu = () => {
  const { data: onedayData, isLoading: isOnedayDataLoading } =
    useGetOneDaySales({ date: "2025-03-26" });
  const { data: menuList, isLoading: isMenuLoading } = useGetSales({
    startDate: "2025-03-01",
    endDate: "2025-04-09",
  });
  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      <div className="flex items-center justify-center"></div>
      {isOnedayDataLoading ? (
        <Skeleton height={516} />
      ) : (
        <PieGraph data={onedayData!.sales_data} />
      )}
      <div className="h-[1px] bg-neutral-300 w-full" />

      <div>
        {isMenuLoading ? (
          <Skeleton height={516} />
        ) : (
          <MenuList
            title="오늘 가장 많이 판매된 메뉴"
            data={menuList!.slice(-1)[0].sales_data}
            prevData={menuList!.slice(-2, -1)[0].sales_data}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
