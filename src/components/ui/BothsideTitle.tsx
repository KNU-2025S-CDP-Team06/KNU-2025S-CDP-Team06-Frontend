import { HTMLAttributes } from "react";

interface BothsideTitleProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
}

const BothsideTitle = ({ ...props }: BothsideTitleProps) => {
  return (
    <div
      className={
        "flex items-center justify-between text-black text-lg font-medium" +
        (props.className ?? "")
      }
    >
      <span>{props.label}</span>
      <span>{props.value}</span>
    </div>
  );
};

export default BothsideTitle;
