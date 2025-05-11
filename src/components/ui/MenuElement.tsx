import { HTMLAttributes } from "react";
interface MenuElementProps extends HTMLAttributes<HTMLDivElement> {
  number: number;
  image: string;
  title: string;
  paragraph: string;
}

const MenuElement = ({ ...props }: MenuElementProps) => {
  return (
    <div
      {...props}
      className={
        "gap-2 py-2 flex text-base font-medium items-center justify-center text-black " +
        (props.className ?? "")
      }
    >
      <div className="flex items-center justify-center w-6 font-medium">
        {props.number}
      </div>
      <div className={"flex w-6 h-6 items-center justify-center"}>
        <img
          src={props.image}
          alt="메뉴 이미지"
          className="object-cover border rounded-full border-neutral-300 "
        />
      </div>

      <div className="flex-grow">{props.title}</div>
      <div className="font-medium">{props.paragraph}</div>
    </div>
  );
};

export default MenuElement;
