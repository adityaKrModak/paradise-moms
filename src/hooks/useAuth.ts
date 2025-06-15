// hooks/useAuth.ts
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";

export const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);

  return { isAuthenticated, user, isLoading, error };
};
