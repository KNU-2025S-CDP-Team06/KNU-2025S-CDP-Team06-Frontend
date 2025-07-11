import { HTMLAttributes } from "react";
interface ArticleThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}
import { RightIcon } from "../Icons";

const ArticleThumbnail = ({ ...props }: ArticleThumbnailProps) => {
  return (
    <div
      {...props}
      className={
        "w-full cursor-pointer rounded-2xl overflow-hidden drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)] " +
        (props.className ?? "")
      }
    >
      <div
        className={
          "w-full flex p-4 gap-2 text-lg font-bold items-center justify-center text-white bg-white "
        }
      >
        {props.children}
      </div>

      <div className="flex items-center px-6 py-2 text-lg font-bold text-white bg-blue-500">
        <div className="flex-grow">{props.title}</div>
        <RightIcon className="w-6 h-6"></RightIcon>
      </div>
    </div>
  );
};

export default ArticleThumbnail;
