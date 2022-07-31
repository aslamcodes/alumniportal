import React, { useEffect } from "react";
import GalleryTemplate from "components/GalleryComponents/GalleryTemplate";
import { useGetGalleryImages } from "hooks/useGetGalleryImages";

function AllPhotos() {
  const { isLoading, error, images } = useGetGalleryImages(0);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <GalleryTemplate
      fname="ALL"
      sname="PHOTOS"
      data={images}
      isLoading={isLoading}
    />
  );
}

export default AllPhotos;
