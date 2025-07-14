import { useMutation } from "@tanstack/react-query";

import type { LoginInput, RegisterInput } from "@auth/shared";
import { authApi } from "@/api/auth";
import { toast } from "sonner";

export const useAuth = () => {
  const login = useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await authApi.login(data);

      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Registration failed");
    },
  });

  const register = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const response = await authApi.register(data);
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Registration failed");
    },
  });
  return { login, register };
};
