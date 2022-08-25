import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export function useFetchAlumniStoredData({
  registerNumber,
  email,
  department,
}) {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [alumni, setAlumni] = useState();

  useEffect(() => {
    if (email && department) {
      //route
    }
  }, [registerNumber, email, department]);

  return { isLoading, error, alumni };
}
