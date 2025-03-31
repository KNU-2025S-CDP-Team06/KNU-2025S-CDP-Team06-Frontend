import { HTMLAttributes } from "react";
import { DownIcon, HomeIcon } from "./Icons";
const DropdownMenu = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={
        "flex px-2 py-1 gap-1 text-xs font-semibold  items-center justify-center bg-white border border-neutral-200 rounded-lg " +
        props.className
      }
    >
      {props.children}
      <DownIcon className="w-4 h-4" />
    </div>
  );
};

export default DropdownMenu;
