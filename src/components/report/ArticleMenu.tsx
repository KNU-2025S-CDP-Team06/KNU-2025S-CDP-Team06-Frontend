import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import { useState, useEffect } from "react";
import { Sales } from "@/models/sales.model";
import MenuElement from "@components/ui/MenuElement";
import { HTMLAttributes } from "react";
import { useGetSales } from "@/hooks/api/sales";

const ArticleMenu = () => {
  const { data: menuList, isLoading: isMenuLoading } = useGetSales({
    startDate: "2025-03-01",
    endDate: "2025-04-09",
  });

  return (
    <ArticleThumbnail title="메뉴별 판매 리포트">
      <div className="flex flex-col flex-grow gap-2 text-black">
        <h1 className="text-base font-semibold">오늘 가장 많이 판매된 메뉴</h1>
        {isMenuLoading ? (
          <p>스켈레톤</p>
        ) : (
          <ArticleMenulist
            title={"오늘 가장 많이 판매된 메뉴"}
            data={menuList!.slice(-1)[0].sales_data}
            prevData={menuList!.slice(-2, -1)[0].sales_data}
            maxShownSize={3}
          />
        )}
        <div className="h-[1px] bg-neutral-300 w-full" />
        <h1 className="text-base font-semibold">수요가 증가한 메뉴</h1>

        {isMenuLoading ? (
          <p>스켈레톤</p>
        ) : (
          <ArticleIncreaseSale
            title={"수요가 증가한 메뉴"}
            data={menuList!.slice(-1)[0].sales_data}
            prevData={menuList!.slice(-2, -1)[0].sales_data}
            maxShownSize={2}
          />
        )}
      </div>
    </ArticleThumbnail>
  );
};

interface MenuListProps {
  title: string;
  data: Sales[];
  prevData: Sales[];
  maxShownSize?: number;
}

const ArticleMenulist = ({ data, prevData, maxShownSize }: MenuListProps) => {
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
      .sort((a, b) => b[1].totalCount - a[1].totalCount)
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
    <div className="flex flex-col gap-2 overflow-hidden bg-white">
      {sortedMenu.map((m, idx) => (
        <MenuElement
          style={{
            paddingTop: "0",
            paddingBottom: "0",
          }}
          className="px-2 py-0 text-base font-normal"
          key={m.name}
          image={m.image}
          title={m.name}
          paragraph={`${m.totalCount}개`}
          number={idx + 1}
        />
      ))}
    </div>
  );
};

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
    <div className="flex flex-row px-2 overflow-hidden bg-white">
      {sortedMenu.map((m) => (
        <ArticleMenuElement
          className="flex-grow text-sm font-medium"
          image={m.image}
          title={m.name}
          paragraph={`${m.totalCount}개`}
        />
      ))}
    </div>
  );
};

interface MenuElementProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  paragraph: string;
  title: string;
}

const ArticleMenuElement = ({ ...props }: MenuElementProps) => {
  return (
    <div
      {...props}
      className={
        "gap-2 flex text-base font-medium items-center justify-center text-black " +
        (props.className ?? "")
      }
    >
      <div className={"flex w-12 h-12 items-center justify-center"}>
        <img
          src={props.image}
          alt="메뉴 이미지"
          className="flex-shrink-0 object-cover w-12 h-12 border rounded-full border-neutral-300 "
        />
      </div>

      <div className="flex-grow text-pretty">{props.title}</div>
    </div>
  );
};

export default ArticleMenu;
