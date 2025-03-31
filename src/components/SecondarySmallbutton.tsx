import { HTMLAttributes } from "react";

const SecondarySmallbutton = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={
        "flex px-4 py-1 text-sm font-median items-center justify-center bg-white border border-neutral-300 rounded-lg " +
        props.className
      }
    >
      {props.children}
    </div>
  );
};

export default SecondarySmallbutton;
