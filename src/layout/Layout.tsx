import { HTMLAttributes } from "react";
import Nav from "./Nav";
import Header from "./Header";

const Layout = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-100">
      <div className="flex flex-col flex-grow max-w-[512px] overflow-x-hidden w-full bg-white">
        <Header />
        {children}
        <Nav />
      </div>
    </div>
  );
};

export default Layout;
