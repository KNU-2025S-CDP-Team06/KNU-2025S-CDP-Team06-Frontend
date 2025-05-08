import { HTMLAttributes } from "react";
import { IncreaseIcon } from "@components/Icons";
interface BothsideTextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  valueColor?: string;
}

const MoreSales = ({
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
        <IncreaseIcon className="w-4 h-4 text-red-500 "></IncreaseIcon>
        <div className="text-black">{label}</div>
      </div>

      <span className="text-red-500 ">{value}</span>
    </div>
  );
};

export default MoreSales;
