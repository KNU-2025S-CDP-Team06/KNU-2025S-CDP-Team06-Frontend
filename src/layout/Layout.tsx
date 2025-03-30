import { HTMLAttributes } from "react";

const Layout = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="bg-neutral-200">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
