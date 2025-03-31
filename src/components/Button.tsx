import { HTMLAttributes } from "react";

const Button = ({ ...props }: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        "cursor-pointer flex p-2 text-lg font-bold items-center justify-center text-white bg-blue-500 rounded-xl " +
        (props.className ?? "")
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
