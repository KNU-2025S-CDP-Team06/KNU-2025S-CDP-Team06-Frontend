export const getPercentByString = (from: number, to: number) => {
  if (from == 0) {
    return "-";
  }
  const percent = ((to - from) / from) * 100;
  return `${percent >= 0 ? "+" : ""}${(((to - from) / from) * 100).toFixed(
    2
  )}%`;
};

export const getPercentAndColor = (
  from: number,
  to: number,
  type: "percent" | "count" = "percent"
) => {
  if (from == 0) {
    return ["-", "text-netural-500"];
  }
  const diff = to - from;

  if (type === "count") {
    return [
      `${from.toLocaleString("ko-KR")}개`,
      diff >= 0 ? "text-red-500" : "text-blue-500",
    ];
  }
  const percent = ((to - from) / from) * 100;
  return [
    `${percent >= 0 ? "+" : ""}${(((to - from) / from) * 100).toFixed(2)}%`,
    percent >= 0 ? "text-red-500" : "text-blue-500",
  ];
};
