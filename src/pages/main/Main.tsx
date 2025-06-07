import SalesReport from "@components/main/SalesReport";
import TodayBestMenu from "@components/main/TodayBestMenu";
import DailyPredict from "@components/main/DailyPredict";
const Main = () => {
  return (
    <div className="flex flex-col gap-3 p-4">
      <SalesReport></SalesReport>
      <div className="h-[1px] bg-neutral-300 w-full" />
      <TodayBestMenu></TodayBestMenu>
      <div className="h-[1px] bg-neutral-300 w-full" />
      <DailyPredict></DailyPredict>
      <div className="h-[1px] bg-neutral-300 w-full" />
    </div>
  );
};
export default Main;
