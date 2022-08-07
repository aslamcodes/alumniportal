import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetTestimonial = () => {
  const [testimonials, setTestimonial] = useState([]);
  const [refresh, setRefresh] = useState();
  const { isLoading, fetchData, error } = useAxiosWithCallback();

  useEffect(() => {
    const config = {
      url: "/api/v1/testimonial",
    };
    fetchData(config, setTestimonial);
  }, [refresh, fetchData]);

  const trigger = () => {
    setRefresh(Math.random());
  };

  return {
    isLoading,
    error,
    testimonials,
    trigger,
  };
};

export default useGetTestimonial;
