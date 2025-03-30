import { HTMLAttributes } from "react";

const Layout = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-100">
      <div className="flex-grow min-w-[512px] bg-white">{children}</div>
    </div>
  );
};

export default Layout;
