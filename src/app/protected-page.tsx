
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
export const ProtectedPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>This page is protected and can only be accessed by authenticated users.</p>
    </div>
  );
};
