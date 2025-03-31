import { HTMLAttributes } from "react";
import { HomeIcon, ReportIcon, MyPageIcon } from "./Icons";

const Nav = () => {
  return (
    <nav className="flex px-12 py-2 justify-between rounded-t-2xl bg-white border-t border-r border-l border-neutral-300 text-neutral-300 font-bold drop-shadow-[0_1px_16px_rgba(0,0,0,0.25)]">
      <div className={"cursor-pointer flex flex-col items-center "}>
        <HomeIcon className="w-6 h-6" />
        <span className="text-xs font-bold">메인화면</span>
      </div>
      <div className={"cursor-pointer flex flex-col items-center "}>
        <ReportIcon className="w-6 h-6" />
        <span className="text-xs font-bold">리포트</span>
      </div>
      <div className={"cursor-pointer flex flex-col items-center "}>
        <MyPageIcon className="w-6 h-6" />
        <span className="text-xs font-bold">마이페이지</span>
      </div>
    </nav>
  );
};

export default Nav;
