import { useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";

export const useGetGalleryImages = (imageType) => {
  const { isLoading, fetchData, error } = useAxiosWithCallback();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = (images) => {
      setImages(images);
    };

    const config = {
      url: `/api/v1/gallery?type=${imageType}`,
    };
    fetchData(config, fetchImages);
  }, [fetchData, imageType]);

  return { isLoading, images, error };
};
