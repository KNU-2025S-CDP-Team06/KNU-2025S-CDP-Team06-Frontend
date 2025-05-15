import { useEffect, useState } from "react";
import { HomeIcon, ReportIcon, MyPageIcon } from "../components/Icons";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [rootPath, setRootPath] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    setIsLogined(!!sessionStorage.getItem("token"));
    setRootPath(pathname.split("/")[1] ?? "");
  }, [pathname]);
  return (
    isLogined && (
      <>
        <div className="mt-16" />
        <nav
          className="fixed bottom-0 w-11/12 max-w-[455px] flex px-12 py-2 justify-between rounded-t-2xl bg-white border-t border-r border-l border-neutral-300 text-neutral-300 font-bold drop-shadow-[0_1px_16px_rgba(0,0,0,0.25)]"
          style={{ left: "50%", transform: "translate(-50%, 0)" }}
        >
          <div
            onClick={() => {
              navigate("/");
            }}
            className={
              "flex flex-col items-center w-12 cursor-pointer" +
              (rootPath == "" ? " text-blue-400" : "")
            }
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">메인화면</span>
          </div>
          <div
            onClick={() => {
              navigate("/report");
            }}
            className={
              "flex flex-col items-center w-12 cursor-pointer" +
              (rootPath == "report" ? " text-blue-400" : "")
            }
          >
            <ReportIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">리포트</span>
          </div>
          <div
            onClick={() => {
              navigate("/mypage");
            }}
            className={
              "flex flex-col items-center w-12 cursor-pointer" +
              (rootPath == "mypage" ? " text-blue-400" : "")
            }
          >
            <MyPageIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">마이페이지</span>
          </div>
        </nav>
      </>
    )
  );
};

export default Nav;
