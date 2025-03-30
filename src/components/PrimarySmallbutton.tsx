import { HTMLAttributes } from "react";

const PrimarySmallbutton = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={
        "flex px-4 py-1 text-sm font-bold items-center justify-center text-white bg-blue-500 rounded-lg " +
        props.className
      }
    >
      {props.children}
    </div>
  );
};

export default PrimarySmallbutton;
