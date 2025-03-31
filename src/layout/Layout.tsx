import { HTMLAttributes } from "react";

const Layout = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-100">
      <div className="flex-grow max-w-[512px] w-full bg-white">{children}</div>
    </div>
  );
};

export default Layout;
