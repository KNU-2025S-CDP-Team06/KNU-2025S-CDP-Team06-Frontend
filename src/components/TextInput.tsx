import { HTMLAttributes } from "react";

const TextInput = ({ ...props }: HTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={
        "px-4 py-3 placeholder-neutral-400 text-base font-normal " +
        { ...props }
      }
    />
  );
};

export default TextInput;
