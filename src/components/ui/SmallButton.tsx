import { HTMLAttributes } from "react";

interface SmallButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isSecondary?: boolean;
}

const SmallButton = ({ isSecondary, ...props }: SmallButtonProps) => {
  if (isSecondary) {
    return (
      <button
        {...props}
        className={
          "cursor-pointer flex px-4 py-1 text-sm font-medium items-center justify-center bg-white border border-neutral-300 rounded-lg " +
          (props.className ?? "")
        }
      >
        {props.children}
      </button>
    );
  }

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

export default SmallButton;
