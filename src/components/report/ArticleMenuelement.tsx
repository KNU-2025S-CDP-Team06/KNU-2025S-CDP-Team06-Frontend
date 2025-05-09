import { HTMLAttributes } from "react";
interface MenuElementProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  paragraph: string;
  title: string;
}

const ArticleMenuElement = ({ ...props }: MenuElementProps) => {
  return (
    <div
      {...props}
      className={
        "gap-2 py-2 flex text-base font-medium items-center justify-center text-black " +
        (props.className ?? "")
      }
    >
      <div className={"flex w-12 h-12 items-center justify-center"}>
        <img
          src={props.image}
          alt="메뉴 이미지"
          className="rounded-full object-cover border border-neutral-300 "
        />
      </div>

      <div className="flex-grow">{props.paragraph}</div>
      <div>{props.title}</div>
    </div>
  );
};

export default ArticleMenuElement;
