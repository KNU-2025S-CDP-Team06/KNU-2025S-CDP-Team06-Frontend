import { useNavigate } from "react-router-dom";
import LoginButton from "@/components/LoginButton";
import MoveButton from "@components/MoveButton";

const Mypage = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center gap-32 px-8 pt-32">
      <section className="flex flex-col px-4 py-3 w-full gap-4">
        <div>
          <p className="text-xl font-semibold">해머스미스커피 서여의도점</p>
          <p className="text-base font-norma text-neutral-400">010-0000-0000</p>
        </div>
        <MoveButton
          className="w-full"
          onClick={() => {
            location.href = "https://www.moki.co.kr/";
          }}
        >
          모키 홈페이지 바로가기
        </MoveButton>
        <MoveButton
          className="w-full"
          onClick={() => {
            location.href = "mailto:mobilekiosk@naver.com";
          }}
        >
          이메일 문의하기
        </MoveButton>
        <LoginButton className="w-full">로그아웃</LoginButton>
      </section>
    </main>
  );
};

export default Mypage;
