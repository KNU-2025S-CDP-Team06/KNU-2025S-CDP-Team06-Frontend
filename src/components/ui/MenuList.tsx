import { HTMLAttributes, useState, useEffect } from "react";
import { Sales } from "@/models/sales.model";
import MenuElement from "./MenuElement";

interface MenuListProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  data: Sales[];
  prevData: Sales[];
}

const MenuList = ({ data, prevData }: MenuListProps) => {
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

    const PricesortedMenu = Object.entries(menuMap).sort(
      (a, b) => b[1].totalPrice - a[1].totalPrice
    );

    const CountsortedMenu = Object.entries(menuMap).sort(
      (a, b) => b[1].totalCount - a[1].totalCount
    );

    const CountComparisonsortedMenu = Object.entries(menuMap).sort(
      (a, b) => b[1].compareCount - a[1].compareCount
    );
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
    <div className="bg-white overflow-hidden">
      {sortedMenu.map((m, idx) => (
        <MenuElement
          key={m.name}
          image={m.image}
          title={m.name}
          paragraph={`${m.totalCount}개`}
          className={
            idx !== sortedMenu.length ? "border-t border-neutral-200" : ""
          }
          number={idx + 1}
        />
      ))}
    </div>
  );
};

export default MenuList;
