import { Sales } from "@/models/sales.model";
import { useEffect, useState } from "react";

export type SortedMenu = {
  name: string;
  image: string;
  totalPrice: number;
  totalCount: number;
  compareCount: number;
};

type UseSortMenuReturnType = [
  SortedMenu[],
  (compareFunc: (a: SortedMenu, b: SortedMenu) => number) => void
];
const useSortMenu = (
  data: Sales[],
  prevData: Sales[] = []
): UseSortMenuReturnType => {
  const [array, setArray] = useState<SortedMenu[]>([]);

  useEffect(() => {
    const totalData = data.concat(prevData);

    const menuMap: {
      [menuName: string]: {
        totalPrice: number;
        totalCount: number;
        compareCount: number;
      };
    } = {};

    prevData.forEach((sale) => {
      if (Object.keys(menuMap).some((key) => key == sale.menu.name)) {
        menuMap[sale.menu.name].compareCount -= sale.count;
      } else {
        menuMap[sale.menu.name] = {
          totalCount: 0,
          totalPrice: 0,
          compareCount: -sale.count,
        };
      }
    });

    data.forEach((sale) => {
      if (Object.keys(menuMap).some((key) => key == sale.menu.name)) {
        menuMap[sale.menu.name].totalCount += sale.count;
        menuMap[sale.menu.name].totalPrice += sale.count * sale.menu.price;
        menuMap[sale.menu.name].compareCount += sale.count;
      } else {
        menuMap[sale.menu.name] = {
          totalCount: sale.count,
          totalPrice: sale.count * sale.menu.price,
          compareCount: sale.count,
        };
      }
    });

    const sortArray: SortedMenu[] = Object.entries(menuMap).map(
      ([name, info]) => ({
        name,
        image: totalData.find((d) => d.menu.name === name)!.menu.image,
        totalPrice: info.totalPrice,
        totalCount: info.totalCount,
        compareCount: info.compareCount,
      })
    );

    setArray(sortArray);
  }, []);

  const sortArray = (compareFunc: (a: SortedMenu, b: SortedMenu) => number) => {
    setArray((array) => [...array.sort(compareFunc)]);
  };

  return [array, sortArray];
};

export default useSortMenu;
