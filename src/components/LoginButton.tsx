import { HTMLAttributes } from "react";

const LoginButton = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={
        "cursor-pointer flex p-3 text-lg font-bold items-center justify-center text-white bg-black rounded-2xl " +
        (props.className ?? "")
      }
    >
      {props.children}
    </div>
  );
};

export default LoginButton;
