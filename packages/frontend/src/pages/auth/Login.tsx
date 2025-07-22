import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";
import { useAuth } from "@/hooks/auth";

const Login = () => {
  const { getUser } = useAuth();

  console.log(getUser.data, getUser.isLoading);

  return (
    <AuthLayout>
      <AuthCard authType="login" />
    </AuthLayout>
  );
};

export default Login;
