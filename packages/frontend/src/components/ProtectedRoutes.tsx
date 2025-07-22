import { useAuth } from "@/hooks/auth";

export const ProtectedRoutes = () => {
  const { getUser } = useAuth();

  return (
    <div>
      {getUser.status === "pending" ? (
        <p>Loading</p>
      ) : (
        <div>ProtectedRoutes</div>
      )}
    </div>
  );
};
