import { HTMLAttributes } from "react";
import { DecreaseIcon } from "@components/Icons";
interface BothsideTextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  valueColor?: string;
}

const LessSales = ({
  label,
  value,
  valueColor = "text-black",
}: BothsideTextProps) => {
  return (
    <div
      className={
        "flex items-center justify-between text-base font-medium gap-2"
      }
    >
      <div className="flex items-center justify-between gap-2">
        <DecreaseIcon className="w-4 h-4 text-blue-500 "></DecreaseIcon>
        <div className="text-black">{label}</div>
      </div>

      <span className="text-blue-500 ">{value}</span>
    </div>
  );
};

export default LessSales;
