import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";

const Register = () => {
  return (
    <AuthLayout>
      <AuthCard authType="register" />
    </AuthLayout>
  );
};

export default Register;
