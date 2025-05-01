import { HTMLAttributes } from "react";

interface BothsideTextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  valueColor?: string;
}

const BothsideText = ({
  label,
  value,
  valueColor = "text-black",
}: BothsideTextProps) => {
  return (
    <div className={"flex items-center justify-between"}>
      <span className="text-sm font-medium text-neutral-500">{label}</span>

      <span className={`${valueColor} text-sm font-medium`}>{value}</span>
    </div>
  );
};

export default BothsideText;
