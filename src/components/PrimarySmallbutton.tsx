import { HTMLAttributes } from "react";

const PrimarySmallbutton = ({
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        "cursor-pointer flex px-4 py-1 text-sm font-bold items-center justify-center text-white bg-blue-500 rounded-lg " +
        (props.className ?? "")
      }
    >
      {props.children}
    </button>
  );
};

export default PrimarySmallbutton;
