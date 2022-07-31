import { useAuthContext } from "context/auth/authContext";
import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetRejectedApplications = () => {
  const { isLoading, fetchData, error } = useAxiosWithCallback();
  const [rejectedApplications, setRejectedApplications] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const config = {
      url: `/api/v1/alumni/rejected-applications`,
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    fetchData(config, ({ rejectedApplications }) =>
      setRejectedApplications(rejectedApplications)
    );
  }, [fetchData, user]);

  return { isLoading, rejectedApplications, error };
};

export default useGetRejectedApplications;
