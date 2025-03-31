import { HTMLAttributes } from "react";

const TextInput = ({ ...props }: HTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={
        "cursor-pointer px-4 py-3 bg-neutral-100 placeholder-neutral-400 text-black text-base font-normal rounded-lg " +
        (props.className ?? "")
      }
    />
  );
};

export default TextInput;
