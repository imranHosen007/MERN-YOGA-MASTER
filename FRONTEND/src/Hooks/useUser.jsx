import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/email/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email && !!localStorage.getItem("token"),
  });
  return { currentUser, isLoading, refetch };
};

export default useUser;
