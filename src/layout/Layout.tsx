import { HTMLAttributes, useEffect, useState } from "react";
import Nav from "./Nav";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    setIsLogined(!!sessionStorage.getItem("token"));
    if (!sessionStorage.getItem("token")) {
      if (pathname != "/" && pathname != "/login") navigate("/");
    }
  }, [pathname]);
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-100">
      <div className="flex flex-col flex-grow max-w-[512px] overflow-x-hidden w-full bg-white">
        {isLogined && <Header />}
        {children}
        {isLogined && <Nav />}
      </div>
    </div>
  );
};

export default Layout;
