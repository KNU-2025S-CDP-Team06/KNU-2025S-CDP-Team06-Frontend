import LoginButton from "@components/ui/LoginButton";
import MokiLogo from "@/components/MokiLogo";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center justify-between flex-grow px-8 pt-32 pb-8">
      <MokiLogo className="w-40" />
      <LoginButton
        onClick={() => {
          navigate("/login");
        }}
        className="w-full"
      >
        사업자 번호로 로그인 하기
      </LoginButton>
    </main>
  );
};

export default OnBoarding;
