import { HTMLAttributes } from "react";
import { MoveIcon } from "@components/Icons";
const MoveButton = ({ ...props }: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        "cursor-pointer flex px-3 py-2 gap-2 text-base font-medium text-neutral-500 items-center justify-center bg-white border border-neutral-200 rounded-lg " +
        (props.className ?? "")
      }
    >
      <MoveIcon className="w-4 h-4" />
      {props.children}
    </button>
  );
};

export default MoveButton;
