import { postRequest } from "./api";

export type LoginPayload = {
  md_id: string;
  password: string;
};

type LoginReturnType = {
  token: string;
};

export const login = async (data: LoginPayload) => {
  const response = await postRequest<LoginReturnType>(
    // "/mocks/login.json", //API URL: `/login`
    "login",
    data
  );
  return response;
};
