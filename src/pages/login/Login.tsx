import Button from "@components/ui/Button";
import MokiLogo from "@components/MokiLogo";
import TextInput from "@components/ui/TextInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  interface Auth {
    id: string;
    password: string;
  }

  const [auth, setAuth] = useState<Auth>({ id: "", password: "" });
  const setToken = () => {
    sessionStorage.setItem("token", auth.id);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isLogined = !!sessionStorage.getItem("token");
    if (isLogined) navigate("/");
  }, []);
  return (
    <main className="flex flex-col items-center gap-32 px-8 pt-32">
      <MokiLogo
        onClick={() => {
          navigate("/");
        }}
        className="w-40 cursor-pointer"
      />
      <section className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">아이디</p>
          <TextInput
            placeholder="사업자 번호"
            onChange={(e) => {
              setAuth({ ...auth, id: e.currentTarget.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold">비밀번호</h2>
          <TextInput
            placeholder="계정 비밀번호"
            type="password"
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                setToken();
                navigate("/");
              }
            }}
            onChange={(e) => {
              setAuth({ ...auth, password: e.currentTarget.value });
            }}
          />
        </div>
        <div className="pt-4">
          <Button
            className="w-full"
            onClick={() => {
              setToken();
              navigate("/");
            }}
          >
            로그인
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Login;
