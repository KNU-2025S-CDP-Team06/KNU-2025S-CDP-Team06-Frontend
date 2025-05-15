import Title from "@components/ui/Title";
import MoreSales from "@components/ui/MoreSales";
import MoveButton from "@components/ui/MoveButton";
import PieGraph from "@components/graph/PieGraph";
import { useGetOneDaySales } from "@/hooks/api/sales";
import LessSales from "@components/ui/LessSales";
import Skeleton from "@components/ui/Skeleton";
import { getThisDay } from "@/utils/day";
import dayjs from "dayjs";
import useSortMenu from "@/hooks/useSortMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodayBestMenu = () => {
  const today = getThisDay();
  const navigate = useNavigate();

  const thisHour = dayjs().get("hour");

  const { data: onedayData, isLoading: isOnedayDataLoading } =
    useGetOneDaySales({ date: today.format("YYYY-MM-DD") });

  const { data: weekagoData, isLoading: isWeekagoDataLoading } =
    useGetOneDaySales({
      date: today.subtract(1, "week").format("YYYY-MM-DD"),
      endHour: thisHour,
    });

  const isDataLoading = isOnedayDataLoading || isWeekagoDataLoading;

  const [isSortedMenuLoading, setisSortedMenuLoading] = useState(true);

  const [sortedMenu, sortMenu] = useSortMenu(
    onedayData?.sales_data ?? [],
    weekagoData?.sales_data ?? []
  );
  useEffect(() => {
    if (!isDataLoading) {
      sortMenu((a, b) =>
        b.compareCount != a.compareCount
          ? b.compareCount - a.compareCount
          : b.totalCount - a.totalCount
      );
      setisSortedMenuLoading(false);
    }
  }, [isDataLoading]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <Title>오늘 가장 많이 판매된 메뉴</Title>
      </div>
      {isOnedayDataLoading ? (
        <Skeleton height={517} />
      ) : (
        <PieGraph data={onedayData!.sales_data} />
      )}
      {isSortedMenuLoading ? (
        <Skeleton height={160} />
      ) : sortedMenu.length < 4 ? (
        <div
          className="flex items-center justify-center text-lg font-semibold rounded-xl bg-neutral-100 text-neutral-500"
          style={{ height: "10rem" }}
        >
          판매 데이터가 부족합니다
        </div>
      ) : (
        <>
          <div className="gap-2">
            <span className="text-lg font-medium">
              지난주보다 많이 판매된 메뉴
            </span>
            <MoreSales
              label={sortedMenu[0].name}
              value={`${sortedMenu[0].compareCount >= 0 ? "+" : ""}${
                sortedMenu[0].compareCount
              }개  (${sortedMenu[0].totalCount}개)`}
            ></MoreSales>
            <MoreSales
              label={sortedMenu[1].name}
              value={`${sortedMenu[1].compareCount >= 0 ? "+" : ""}${
                sortedMenu[1].compareCount
              }개 (${sortedMenu[1].totalCount}개)`}
            ></MoreSales>
          </div>
          <div className="gap-2">
            <span className="text-lg font-medium">
              지난주보다 적게 판매된 메뉴
            </span>
            <LessSales
              label={sortedMenu.slice(-2)[0].name}
              value={`${sortedMenu.slice(-2)[0].compareCount >= 0 ? "+" : ""} ${
                sortedMenu.slice(-2)[0].compareCount
              }개 (${sortedMenu.slice(-2)[0].totalCount}개)`}
            ></LessSales>
            <LessSales
              label={sortedMenu.slice(-1)[0].name}
              value={`${sortedMenu.slice(-1)[0].compareCount >= 0 ? "+" : ""} ${
                sortedMenu.slice(-1)[0].compareCount
              }개 (${sortedMenu.slice(-1)[0].totalCount}개)`}
            ></LessSales>
          </div>
        </>
      )}
      <MoveButton
        onClick={() => {
          navigate("/report/menu");
        }}
      >
        메뉴 판매 순위 더보기
      </MoveButton>
    </div>
  );
};

export default TodayBestMenu;
