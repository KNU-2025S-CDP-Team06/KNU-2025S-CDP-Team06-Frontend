import dayjs from "dayjs";

export const getThisDay = () => {
  return dayjs().tz("Asia/Seoul").startOf("day");
};

export const getThisWeek = () => {
  return dayjs().tz("Asia/Seoul").startOf("week");
};

export const getThisMonth = () => {
  return dayjs().tz("Asia/Seoul").startOf("month");
};
