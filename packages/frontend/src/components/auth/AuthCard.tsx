import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router";

const AuthCard = ({ authType }: { authType: "login" | "register" }) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">
          {authType === "login" ? "Login to your account" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {authType === "login"
            ? "Enter your email below to login to your account"
            : "Enter your details below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {authType === "login" ? <LoginForm /> : <RegisterForm />}
        <div className="mt-4 text-center text-sm">
          {authType === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Button
            type="button"
            variant="link"
            className="underline underline-offset-4  pl-1"
          >
            <Link to={authType === "login" ? "/auth/register" : "/auth/login"}>
              {authType === "login" ? "Register" : "Login"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthCard;
