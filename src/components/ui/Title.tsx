import { HTMLAttributes } from "react";

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}

const Title = ({ ...props }: TitleProps) => {
  return (
    <div
      className={
        "flex items-center justify-between text-black text-xl font-semibold" +
        (props.className ?? "")
      }
    >
      <span>{props.label}</span>
    </div>
  );
};

export default Title;
