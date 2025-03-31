import { HTMLAttributes } from "react";
import { MoveIcon } from "./Icons";
const MoveButton = ({ ...props }: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        "cursor-pointer flex px-3 py-2 gap-2 text-base font-medium text items-center justify-center bg-white border border-neutral-200 rounded-lg text-neutral-500" +
        (props.className ?? "")
      }
    >
      <MoveIcon className="w-4 h-4 color-" />
      {props.children}
    </button>
  );
};

export default MoveButton;
