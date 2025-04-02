import { HTMLAttributes } from "react";
import Nav from "./Nav";
import Header from "./Header";

const Layout = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-100">
      <Header />
      <div className="flex-grow max-w-[512px] w-full bg-white">{children}</div>
      <Nav />
    </div>
  );
};

export default Layout;
