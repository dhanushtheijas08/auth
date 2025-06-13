import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <AuthCard authType="login" />
    </AuthLayout>
  );
};

export default Login;
