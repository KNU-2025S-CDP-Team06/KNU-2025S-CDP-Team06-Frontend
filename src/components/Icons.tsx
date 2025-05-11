import { HTMLAttributes } from "react";

export const MoveIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={
        "icon-[icon-park-outline--to-right] " + (props.className ?? "")
      }
    />
  );
};

export const HomeIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={
        "icon-[material-symbols--home-outline] " + (props.className ?? "")
      }
    />
  );
};

export const ReportIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[carbon--report] " + (props.className ?? "")}
    />
  );
};

export const MyPageIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[material-symbols--person] " + (props.className ?? "")}
    />
  );
};

export const DownIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mingcute--down-line] " + (props.className ?? "")}
    />
  );
};

export const RightIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mingcute--right-line] " + (props.className ?? "")}
    />
  );
};

export const LeftIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mingcute--left-line] " + (props.className ?? "")}
    />
  );
};

export const IncreaseIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[icon-park-solid--up-two] " + (props.className ?? "")}
    />
  );
};

export const DecreaseIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[icon-park-solid--down-two] " + (props.className ?? "")}
    />
  );
};

export const SunnyIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[material-symbols--sunny] " + (props.className ?? "")}
    />
  );
};

export const RainIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={
        "icon-[material-symbols-light--rainy] " + (props.className ?? "")
      }
    />
  );
};

export const CloudyIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[bi--cloudy-fill] " + (props.className ?? "")}
    />
  );
};

export const SnowIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[ion--snow-sharp] " + (props.className ?? "")}
    />
  );
};
