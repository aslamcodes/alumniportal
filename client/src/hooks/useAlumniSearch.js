import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useAlumniSearch = (query) => {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    fetchData(
      {
        url: `/api/v1/alumni/search/${query}`
      },
      (alumni) => {
        setSearchData(alumni.alumni);

      }
    )
    if (error) {
      setSearchData([]);
    }
  }, [fetchData, query]);
  return { searchData, error }
}

export default useAlumniSearch;