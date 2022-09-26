import React from "react";
import GalleryTemplate from "components/GalleryComponents/GalleryTemplate";
import { useGetGalleryImages } from "hooks/useGetGalleryImages";

import ErrorDialogue from "components/UI/ErrorDialogue";
import styles from "./Gallery.module.css";

function AllPhotos() {
  const { isLoading, error, images } = useGetGalleryImages(0);

  if (error)
    return (
      <div className={styles.error_container}>
        <ErrorDialogue errorMessage={error.message} />
      </div>
    );

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
