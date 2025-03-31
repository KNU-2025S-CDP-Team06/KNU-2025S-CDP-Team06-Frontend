import { InputHTMLAttributes } from "react";

const TextInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={
        "cursor-pointer px-4 py-3 bg-neutral-100 placeholder-neutral-400 text-black text-base font-normal rounded-lg border border-neutral-300" +
        (props.className ?? "")
      }
    />
  );
};

export default TextInput;
