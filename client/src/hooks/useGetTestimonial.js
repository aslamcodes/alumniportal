import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

const useGetTestimonial = () => {
  const [testimonials, setTestimonial] = useState([]);
  const { isLoading, fetchData, error } = useAxiosWithCallback();

  useEffect(() => {
    const config = {
      url: "/api/v1/testimonial",
    };
    fetchData(config, setTestimonial);
  }, []);

  return {
    isLoading,
    error,
    testimonials,
  };
};

export default useGetTestimonial;
