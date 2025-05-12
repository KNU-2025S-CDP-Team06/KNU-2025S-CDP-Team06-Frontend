import { useState, useEffect } from "react";
import { Sales } from "@/models/sales.model";
import MenuElement from "./MenuElement";
import DropdownMenu from "./DropdownMenu";
import useSortMenu from "@/hooks/useSortMenu";

interface MenuListProps {
  title: string;
  data: Sales[];
  prevData: Sales[];
  maxShownSize?: number;
}

const MenuList = ({ title, data, prevData, maxShownSize }: MenuListProps) => {
  const [sortedMenu, sortMenu] = useSortMenu(data, prevData);

  const [sortBy, setSortBy] = useState(0);

  type sortKey = "totalPrice" | "totalCount" | "compareCount";

  const sortTable: sortKey[] = ["totalCount", "totalPrice", "compareCount"];

  const unitTable = ["개", "원", "개"];

  useEffect(() => {
    sortMenu((a, b) => b[sortTable[sortBy]] - a[sortTable[sortBy]]);
  }, [sortBy]);

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
        {sortedMenu.slice(0, maxShownSize).map((m, idx) => (
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
