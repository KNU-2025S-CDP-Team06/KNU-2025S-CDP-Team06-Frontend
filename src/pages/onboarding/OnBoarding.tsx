import LoginButton from "@/components/LoginButton";
import MokiLogo from "@/components/MokiLogo";

const OnBoarding = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-8 pt-32 pb-8">
      <MokiLogo className="w-40" />
      <LoginButton className="w-full">사업자 번호로 로그인 하기</LoginButton>
    </div>
  );
};

export default OnBoarding;
