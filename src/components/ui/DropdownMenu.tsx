import { HTMLAttributes } from "react";
import { DownIcon } from "@components/Icons";
const DropdownMenu = ({ ...props }: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        "cursor-pointer flex px-2 py-1 gap-1 text-xs font-semibold  items-center justify-center bg-white border border-neutral-200 rounded-lg " +
        (props.className ?? "")
      }
    >
      {props.children}
      <DownIcon className="w-4 h-4" />
    </button>
  );
};

export default DropdownMenu;
