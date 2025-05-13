import LoginButton from "@components/ui/LoginButton";
import MoveButton from "@components/ui/MoveButton";
import { useGetStoreData } from "@/hooks/api/storeData";
const Mypage = () => {
  const { data: storeData, isLoading: isStoreLoading } = useGetStoreData({
    id: 1,
  });

  return (
    <main className="flex flex-col items-center ">
      <section className="flex flex-col w-full gap-4 px-4 py-3">
        <div className="text-xl text-pretty font-semibold">
          {isStoreLoading ? <>스켈레톤</> : storeData!.name}
          <p className="text-base font-normal text-neutral-400">
            {isStoreLoading ? <>스켈레톤</> : storeData!.address}
          </p>
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
