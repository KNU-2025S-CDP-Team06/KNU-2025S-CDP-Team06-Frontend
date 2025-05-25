import { useLocation, useNavigate } from "react-router-dom";
import { LeftIcon } from "../components/Icons";
import MokiLogo from "../components/MokiLogo";
import { useEffect, useState } from "react";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState<String | null>();
  useEffect(() => {
    switch (pathname) {
      case "/report/menu":
        setText("매뉴별 판매 리포트");
        break;
      case "/report/sales":
        setText("실시간 매출 리포트");
        break;
      case "/report/predict":
        setText("예상 매출 리포트");
        break;
      case "/report/monthly":
        setText("월간 매출 리포트");
        break;
      default:
        setText(null);
    }
  }, [pathname]);
  return (
    <>
      <header
        style={{
          backgroundColor: "#ffffff40",
        }}
        className="fixed top-0 z-10 max-w-[512px] flex items-center justify-between h-12 w-full p-3 text-lg font-semibold border-b-[1px] backdrop-blur-sm border-b-neutral-300"
      >
        {text ? (
          <LeftIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
        ) : (
          <div />
        )}
        {text ?? (
          <MokiLogo
            className="w-16 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        )}
        <div className={text ? "w-6" : ""} />
      </header>
      <div className="mb-12" />
    </>
  );
};

export default Header;
