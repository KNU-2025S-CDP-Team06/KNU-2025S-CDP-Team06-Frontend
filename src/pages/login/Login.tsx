import Button from "@components/Button";
import MokiLogo from "@components/MokiLogo";
import TextInput from "@components/TextInput";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center gap-32 px-8 pt-32">
      <MokiLogo
        onClick={() => {
          navigate("/");
        }}
        className="w-40"
      />
      <section className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">아이디</p>
          <TextInput placeholder="사업자 번호" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold">비밀번호</h2>
          <TextInput placeholder="계정 비밀번호" type="password" />
        </div>
        <div className="pt-4">
          <Button className="w-full">로그인</Button>
        </div>
      </section>
    </main>
  );
};

export default Login;
