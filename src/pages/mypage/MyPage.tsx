import LoginButton from "@components/ui/LoginButton";
import MoveButton from "@components/ui/MoveButton";
import { useGetStoreData } from "@/hooks/api/storeData";
import { useNavigate } from "react-router-dom";
import Skeleton from "@components/ui/Skeleton";
const Mypage = () => {
  const { data: storeData, isLoading: isStoreLoading } = useGetStoreData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <main className="flex flex-col items-center ">
      <section className="flex flex-col w-full gap-4 px-4 py-3">
        <div className="text-xl font-semibold text-pretty">
          {isStoreLoading ? (
            <Skeleton height={52} />
          ) : (
            <div className="text-pretty">
              <div className="text-xl font-semibold">{storeData!.name}</div>
              <div className="text-base font-normal text-neutral-400">
                {storeData!.address}
              </div>
            </div>
          )}
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
        <LoginButton onClick={() => logoutHandler()} className="w-full">
          로그아웃
        </LoginButton>
      </section>
    </main>
  );
};

export default Mypage;
