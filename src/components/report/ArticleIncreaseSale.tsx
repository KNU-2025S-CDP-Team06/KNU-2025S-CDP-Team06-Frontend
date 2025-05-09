import { useState, useEffect } from "react";
import { Sales } from "@/models/sales.model";
import ArticleMenuElement from "./ArticleMenuelement";
interface MenuListProps {
  title: string;
  data: Sales[];
  prevData: Sales[];
  maxShownSize?: number;
}

const ArticleIncreaseSale = ({
  data,
  prevData,
  maxShownSize,
}: MenuListProps) => {
  const [sortedMenu, setSortedMenu] = useState<
    {
      name: string;
      image: string;
      totalCount: number;
      compareCount: number;
    }[]
  >([]);

  useEffect(() => {
    const prevMap: { [prevmenuName: string]: { prevtotalCount: number } } = {};

    let prevtotalCount = 0;

    prevData.forEach((sale) => {
      if (Object.keys(prevMap).some((key) => key == sale.menu.name)) {
        prevMap[sale.menu.name].prevtotalCount += sale.count;
      } else {
        prevMap[sale.menu.name] = {
          prevtotalCount: sale.count,
        };
      }
      prevtotalCount += sale.count;
    });

    const menuMap: {
      [menuName: string]: {
        totalPrice: number;
        totalCount: number;
        compareCount: number;
      };
    } = {};

    data.forEach((sale) => {
      if (Object.keys(menuMap).some((key) => key == sale.menu.name)) {
        menuMap[sale.menu.name].totalCount += sale.count;
        menuMap[sale.menu.name].totalPrice += sale.count * sale.menu.price;
        menuMap[sale.menu.name].compareCount += 0;
      } else {
        menuMap[sale.menu.name] = {
          totalCount: sale.count,
          totalPrice: sale.count * sale.menu.price,
          compareCount: 0,
        };
      }
    });

    Object.keys(menuMap).forEach((key) => {
      const yesterday = prevMap[key] ? prevMap[key].prevtotalCount : 0;
      menuMap[key].compareCount = menuMap[key].totalCount - yesterday;
    });

    const CountsortedMenu = Object.entries(menuMap)
      .sort((a, b) => b[1].compareCount - a[1].compareCount)
      .slice(0, maxShownSize);

    setSortedMenu(
      CountsortedMenu.map(([name, info]) => ({
        name,
        image: data.find((d) => d.menu.name === name)!.menu.image,
        totalCount: info.totalCount,
        compareCount: info.compareCount,
      }))
    );
  }, [data, prevData]);

  return (
    <div className="flex flex-row  bg-white overflow-hidden">
      {sortedMenu.map((m) => (
        <ArticleMenuElement
          className="text-sm font-medium"
          image={m.image}
          title={m.name}
          paragraph={`${m.totalCount}개`}
        />
      ))}
    </div>
  );
};

export default ArticleIncreaseSale;
