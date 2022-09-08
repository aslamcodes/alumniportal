import React, { useEffect } from "react";
import GalleryTemplate from "components/GalleryComponents/GalleryTemplate";
import { useGetGalleryImages } from "hooks/useGetGalleryImages";
import { useAlertContext } from "context/alert/alertContext";

function AllPhotos() {
  const { isLoading, error, images } = useGetGalleryImages(0);
  const { successAlert, errorAlert } = useAlertContext();

  useEffect(() => {
    if (error) errorAlert(error);
  }, [error, errorAlert]);

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
