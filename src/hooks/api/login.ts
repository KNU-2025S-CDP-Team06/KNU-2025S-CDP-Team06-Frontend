import { login, LoginPayload } from "@services/login";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { mutate } = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
  });
  return { mutate };
};
