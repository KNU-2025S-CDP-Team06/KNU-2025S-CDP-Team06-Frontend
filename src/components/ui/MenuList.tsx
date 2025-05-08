import { useState, useEffect } from "react";
import { Sales } from "@/models/sales.model";
import MenuElement from "./MenuElement";
import DropdownMenu from "./DropdownMenu";

interface MenuListProps {
  title: string;
  data: Sales[];
  prevData: Sales[];
  maxShownSize?: number;
}

const MenuList = ({ title, data, prevData, maxShownSize }: MenuListProps) => {
  const [sortedMenu, setSortedMenu] = useState<
    {
      name: string;
      image: string;
      totalPrice: number;
      totalCount: number;
      compareCount: number;
    }[]
  >([]);

  const [sortBy, setSortBy] = useState(0);

  type sortKey = "totalPrice" | "totalCount" | "compareCount";

  const sortTable: sortKey[] = ["totalCount", "totalPrice", "compareCount"];

  const unitTable = ["개", "원", "개"];

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

    const sortedMenu = Object.entries(menuMap)
      .sort((a, b) => b[1][sortTable[sortBy]] - a[1][sortTable[sortBy]])
      .slice(0, maxShownSize);

    setSortedMenu(
      sortedMenu.map(([name, info]) => ({
        name,
        image: data.find((d) => d.menu.name === name)!.menu.image,
        totalPrice: info.totalPrice,
        totalCount: info.totalCount,
        compareCount: info.compareCount,
      }))
    );
  }, [data, prevData, sortBy]);

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="relative flex">
        <div className="w-full text-lg font-semibold">{title}</div>
        <DropdownMenu
          dropdownMenuList={["판매량 순", "매출 순", "판매량 증가 순"]}
          stateHandler={setSortBy}
        />
      </div>
      <div className="overflow-hidden bg-white">
        {sortedMenu.map((m, idx) => (
          <MenuElement
            key={m.name}
            image={m.image}
            title={m.name}
            paragraph={`${m[sortTable[sortBy]].toLocaleString("ko-KR")}${
              unitTable[sortBy]
            }`}
            className={
              idx !== sortedMenu.length ? "border-t border-neutral-200" : ""
            }
            number={idx + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
