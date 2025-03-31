import { HTMLAttributes } from "react";

const SecondarySmallbutton = ({
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        "cursor-pointer flex px-4 py-1 text-sm font-median items-center justify-center bg-white border border-neutral-300 rounded-lg " +
        (props.className ?? "")
      }
    >
      {props.children}
    </button>
  );
};

export default SecondarySmallbutton;
