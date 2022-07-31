import { useAuthContext } from "context/auth/authContext";
import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetNewApplications = () => {
  const { isLoading, fetchData, error } = useAxiosWithCallback();
  const [applications, setApplications] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const config = {
      url: `/api/v1/alumni/requests`,
      headers: {
        Authorization: `Bearer ${user?.token} `,
      },
    };
    fetchData(config, ({ requests }) => setApplications(requests));
  }, [fetchData, user]);

  return { isLoading, applications, error };
};

export default useGetNewApplications;
