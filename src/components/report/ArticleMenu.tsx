import ArticleThumbnail from "@components/ui/ArticleThumbnail";
import { useEffect } from "react";
import { Sales } from "@/models/sales.model";
import MenuElement from "@components/ui/MenuElement";
import { HTMLAttributes } from "react";
import { useGetSales } from "@/hooks/api/sales";
import useSortMenu from "@/hooks/useSortMenu";
import { getThisDay } from "@/utils/day";
import Skeleton from "@components/ui/Skeleton";
import { useNavigate } from "react-router-dom";
import MokiLogo from "@components/MokiLogo";

const ArticleMenu = () => {
  const today = getThisDay();
  const navigate = useNavigate();

  const { data: menuList, isLoading: isMenuLoading } = useGetSales({
    startDate: today.subtract(1, "days").format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
  });

  const hasTodayData =
    !!menuList?.length && menuList.slice(-1)[0].sales_data.length > 0;

  return (
    <ArticleThumbnail
      title="메뉴별 판매 리포트"
      onClick={() => {
        navigate("/report/menu");
      }}
    >
      {isMenuLoading ? (
        <Skeleton height={217} />
      ) : (
        <div className="flex flex-col flex-grow gap-2 text-black">
          <h1 className="text-base font-semibold">
            오늘 가장 많이 판매된 메뉴
          </h1>
          {!hasTodayData ? (
            <div
              className="flex items-center justify-center gap-2 text-lg font-semibold text-neutral-500 rounded-xl bg-neutral-100"
              style={{ height: "calc(75vw + 8.125rem)", maxHeight: "88px" }}
            >
              판매 데이터가 존재하지 않습니다
            </div>
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
          {hasTodayData ? (
            <ArticleIncreaseSale
              title={"수요가 증가한 메뉴"}
              data={menuList!.slice(-1)[0].sales_data}
              prevData={menuList!.slice(-2, -1)[0].sales_data}
              maxShownSize={2}
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-2 text-lg font-semibold text-neutral-500 rounded-xl bg-neutral-100"
              style={{ height: "calc(75vw + 8.125rem)", maxHeight: "48px" }}
            >
              판매 데이터가 존재하지 않습니다
            </div>
          )}
        </div>
      )}
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
  const [sortedMenu, sortMenu] = useSortMenu(data, prevData);
  useEffect(() => {
    sortMenu((a, b) => b.totalCount - a.totalCount);
  }, []);

  return (
    <div className="flex flex-col gap-2 overflow-hidden bg-white">
      {sortedMenu.slice(0, maxShownSize).map((m, idx) => (
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
  const [sortedMenu, sortMenu] = useSortMenu(data, prevData);
  useEffect(() => {
    sortMenu((a, b) => b.compareCount - a.compareCount);
  }, []);

  return (
    <div className="flex flex-row px-2 overflow-hidden bg-white">
      {sortedMenu.slice(0, maxShownSize).map((m) => (
        <ArticleMenuElement
          className="flex-grow text-sm font-medium"
          image={m.image}
          title={`${m.totalCount}개`}
          paragraph={`(${m.compareCount >= 0 ? "+" : ""}${m.compareCount}개)`}
        />
      ))}
    </div>
  );
};

interface MenuElementProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
  paragraph: string;
  title: string;
}

const ArticleMenuElement = ({ image, ...props }: MenuElementProps) => {
  return (
    <div
      {...props}
      className={
        "gap-2 flex text-base font-medium items-center justify-center text-black " +
        (props.className ?? "")
      }
    >
      <div className={"flex w-12 h-12 items-center justify-center"}>
        {image ? (
          <img
            src={(import.meta.env.VITE_PROXY_URL ?? "") + image}
            alt="메뉴 이미지"
            className="flex-shrink-0 object-cover w-12 h-12 border rounded-full border-neutral-300 "
          />
        ) : (
          <MokiLogo className="w-12 h-12  p-0.5 border rounded-full border-neutral-300" />
        )}
      </div>
      <div className="flex items-center gap-1">
        <div className="text-sm font-medium">{props.title}</div>
        <div className="text-sm font-medium text-red-500">
          {props.paragraph}
        </div>
      </div>
    </div>
  );
};

export default ArticleMenu;
