import { HTMLAttributes } from "react";

const Title = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={
        "flex items-center justify-between text-black text-xl font-semibold" +
        (props.className ?? "")
      }
    >
      <span>{children}</span>
    </div>
  );
};

export default Title;
