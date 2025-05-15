import Button from "@components/ui/Button";
import MokiLogo from "@components/MokiLogo";
import TextInput from "@components/ui/TextInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPayload } from "@services/login";
import { useLogin } from "@/hooks/api/login";
import { WarnIcon } from "@components/Icons";

const Login = () => {
  const [account, setAccount] = useState<LoginPayload>({
    mb_id: "",
    password: "",
  });

  const { mutate: login } = useLogin();

  const navigate = useNavigate();

  const [isWarn, setIsWarn] = useState(false);

  const [warnText, setWarnText] = useState("");

  const handleLogin = () => {
    if (account.mb_id == "" || account.password == "") {
      setWarnText("아이디, 비밀번호를 입력해주세요.");
      setIsWarn(true);
    } else {
      login(account, {
        onSuccess: (res) => {
          sessionStorage.setItem("token", res.token);
          navigate("/");
        },
        onError: () => {
          setWarnText("아이디 또는 비밀번호가 잘못되었습니다.");
          setIsWarn(true);
        },
      });
    }
  };

  useEffect(() => {
    const isLogined = !!sessionStorage.getItem("token");
    if (isLogined) navigate("/");
  }, []);
  return (
    <main className="flex flex-col items-center gap-32 px-8 pt-32">
      {/* <div className="fixed top-0 flex justify-center w-full h-screen">
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.103)",
          }}
          className="fixed flex justify-center items-center top-0 max-w-[512px] w-full h-screen backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center w-3/4 p-4 bg-white border shadow-lg rounded-xl border-neutral-300">
            안녕하세요
          </div>
        </div>
      </div> */}
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
              setAccount({ ...account, mb_id: e.currentTarget.value });
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
                handleLogin();
              }
            }}
            onChange={(e) => {
              setAccount({ ...account, password: e.currentTarget.value });
            }}
          />
        </div>
        <div className="pt-4">
          <Button
            className="w-full"
            onClick={() => {
              handleLogin();
            }}
          >
            로그인
          </Button>
        </div>
        {isWarn && (
          <div className="flex items-center gap-2 px-4 py-4 font-semibold text-white bg-red-500 rounded ">
            <WarnIcon />
            {warnText}
          </div>
        )}
      </section>
    </main>
  );
};

export default Login;
