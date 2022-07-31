import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export const useGetGalleryImages = (imageType) => {
  const { isLoading, fetchData, error } = useAxiosWithCallback();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const config = {
      url: `/api/v1/gallery?type=${imageType}`,
    };
    fetchData(config, setImages);
  }, [fetchData, imageType]);

  return { isLoading, images, error };
};
