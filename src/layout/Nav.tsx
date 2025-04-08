import { useEffect, useState } from "react";
import { HomeIcon, ReportIcon, MyPageIcon } from "../components/Icons";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    setIsLogined(!!sessionStorage.getItem("token"));
  }, [pathname]);
  return (
    isLogined && (
      <nav
        className="fixed bottom-0 w-11/12 max-w-[455px] flex px-12 py-2 justify-between rounded-t-2xl bg-white border-t border-r border-l border-neutral-300 text-neutral-300 font-bold drop-shadow-[0_1px_16px_rgba(0,0,0,0.25)]"
        style={{ left: "50%", transform: "translate(-50%, 0)" }}
      >
        <div className="flex flex-col items-center w-12 cursor-pointer">
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold">메인화면</span>
        </div>
        <div className="flex flex-col items-center w-12 cursor-pointer">
          <ReportIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold">리포트</span>
        </div>
        <div className="flex flex-col items-center w-12 cursor-pointer">
          <MyPageIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold">마이페이지</span>
        </div>
      </nav>
    )
  );
};

export default Nav;
