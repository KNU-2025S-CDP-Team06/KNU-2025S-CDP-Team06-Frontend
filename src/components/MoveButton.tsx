import { HTMLAttributes } from "react";
import { MoveIcon } from "./Icons";
const MoveButton = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={
        "flex px-3 py-2 gap-2 text-base font-median text items-center justify-center bg-white border border-neutral-200 rounded-lg " +
        props.className
      }
    >
      <MoveIcon className="w-4 h-4" />
      {props.children}
    </div>
  );
};

export default MoveButton;
