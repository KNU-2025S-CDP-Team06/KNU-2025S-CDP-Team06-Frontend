import { useQuery } from "@tanstack/react-query";
import { getMenuList } from "@services/menuList";

export const useGetMenuList = () =>
  useQuery({ queryKey: ["menuList"], queryFn: getMenuList });
