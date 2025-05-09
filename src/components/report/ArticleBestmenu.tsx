import { useEffect, useState } from "react";
import Title from "@components/ui/Title";
import { useGetSales } from "@/hooks/api/sales";
import { useGetOneDayPredict } from "@/hooks/api/predict";
import { useGetMenuList } from "@/hooks/api/menuList";
import MenuList from "@components/ui/MenuList";
import BothsideText from "@components/ui/BothsideText";
import BothsideTitle from "@components/ui/BothsideTitle";
import MoveButton from "@components/ui/MoveButton";
import BarGraph, { BarGraphData } from "@components/graph/BarGraph";
import ArticleMenulist from "./ArticleMenulist";
import ArticleIncreaseSale from "./ArticleIncreaseSale";
const ArticleBestmenu = () => {
  const { data: menuList, isLoading: isMenuLoading } = useGetMenuList();

  return (
    <div className="flex flex-col gap-2 text-black">
      <div className="text-base font-semibold">
        오늘 가장 많이 판매된 메뉴
        {isMenuLoading ? (
          <>스켈레톤</>
        ) : (
          <ArticleMenulist
            title={menuList!.title}
            data={menuList!.data}
            prevData={menuList!.prevData}
            maxShownSize={3}
          />
        )}
      </div>
      <div className="h-[1px] bg-neutral-300 w-full" />
      <div className="text-base font-semibold">
        수요가 증가한 메뉴
        {isMenuLoading ? (
          <>스켈레톤</>
        ) : (
          <ArticleIncreaseSale
            title={menuList!.title}
            data={menuList!.data}
            prevData={menuList!.prevData}
            maxShownSize={2}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleBestmenu;
