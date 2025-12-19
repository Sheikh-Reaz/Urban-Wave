import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userData = { role: "buyer", status: "pending" },
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      // return role and status
      return {
        role: res.data?.role || "buyer",
        status: res.data?.status || "pending",
      };
    },
  });

  return { ...userData, roleLoading };
};

export default useRole;


