import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useAlumniDataSearch = (query) => {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    fetchData(
      {
        url: `/api/v1/alumni-data/search/${query}`
      },
      (alumni) => {

        setSearchData(alumni);
        console.log(alumni);
      }
    )
    if (error) {
      setSearchData([]);
    }
  }, [fetchData, query]);
  return { searchData, error }
}

export default useAlumniDataSearch;