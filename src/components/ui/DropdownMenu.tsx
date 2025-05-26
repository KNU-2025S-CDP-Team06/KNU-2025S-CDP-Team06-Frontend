import { HTMLAttributes, useState } from "react";
import { DownIcon } from "@components/Icons";

interface DropdownMenuProps extends HTMLAttributes<HTMLButtonElement> {
  dropdownMenuList: string[];
  stateHandler?: (index: number) => void;
}

const DropdownMenu = ({
  onClick,
  stateHandler,
  dropdownMenuList,
  ...props
}: DropdownMenuProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="relative">
      <button
        {...props}
        onClick={(e) => {
          if (onClick != undefined) onClick(e);
          setIsDropdownVisible((isDropdownVisible) => !isDropdownVisible);
        }}
        className={
          "cursor-pointer flex pl-3 px-2 py-1 gap-1 text-xs font-semibold text-nowrap items-center justify-center bg-white border border-neutral-200 rounded-lg " +
          (props.className ?? "")
        }
      >
        {dropdownMenuList[selectedIndex]}
        <DownIcon className="w-4 h-4" />
      </button>
      <div
        className="fixed top-0 left-0 z-[1] h-full w-screen"
        onClick={() => {
          setIsDropdownVisible(false);
        }}
        style={{
          zIndex: isDropdownVisible ? "2" : "-1",
        }}
      />
      <div
        className="absolute top-0 right-0 p-4 bg-white rounded-lg"
        style={{
          boxShadow: "0 0 16px #00000020",
          transition: "0.2s ease-in-out",
          opacity: isDropdownVisible ? "1" : "0",
          zIndex: isDropdownVisible ? "3" : "-1",
          transform: isDropdownVisible ? "translateY(2rem)" : "",
        }}
      >
        {dropdownMenuList.map((dropdownMenu, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setIsDropdownVisible(false);
                if (stateHandler != undefined) stateHandler(index);
              }}
              className={
                "px-2 py-1 rounded cursor-pointer text-md text-nowrap " +
                (selectedIndex == index
                  ? "bg-neutral-100 font-bold"
                  : "font-medium")
              }
            >
              {dropdownMenu}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownMenu;
