import { getRequest } from "@services/api";
import { Sales } from "@/models/sales.model";

export interface MenuListResponse {
  title: string;
  data: Sales[];
  prevData: Sales[];
}

export const getMenuList = async () =>
  getRequest<MenuListResponse>("/mocks/menuListData.json");
