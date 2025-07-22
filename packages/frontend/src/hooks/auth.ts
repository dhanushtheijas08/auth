import { useMutation, useQuery } from "@tanstack/react-query";
import type { LoginInput, RegisterInput } from "@auth/shared";
import { authApi } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();
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

  const logout = useMutation({
    mutationFn: async () => {
      const response = await authApi.logout();
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Logout failed");
    },
  });

  const getUser = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await authApi.getUser();
      if (!response.success) {
        toast.error(response.message);
        navigate("/auth/login", { replace: true });
      }
      return response;
    },
    staleTime: Infinity,
  });

  return { login, register, logout, getUser };
};
