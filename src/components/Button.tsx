import { HTMLAttributes } from "react";

const Button = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={
        "flex p-2 text-lg font-bold items-center justify-center text-white bg-blue-500 rounded-2xl " +
        props.className
      }
    >
      {props.children}
    </div>
  );
};

export default Button;
