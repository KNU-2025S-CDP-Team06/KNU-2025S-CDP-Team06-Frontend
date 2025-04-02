import { useNavigate } from "react-router-dom";
import { LeftIcon } from "./Icons";
import MokiLogo from "./MokiLogo";

const Header = ({ text }: { text?: string }) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between h-12 w-full p-3 text-lg font-semibold border-b-[1px] border-b-neutral-300">
      {text ? (
        <LeftIcon
          className="w-6 h-6"
          onClick={() => {
            navigate(-1);
          }}
        />
      ) : (
        <div />
      )}
      {text ?? <MokiLogo className="w-16" />}
      <div />
    </header>
  );
};

export default Header;
