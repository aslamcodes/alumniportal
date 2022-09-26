import React from "react";
import GalleryTemplate from "components/GalleryComponents/GalleryTemplate";
import { useGetGalleryImages } from "hooks/useGetGalleryImages";
import ErrorDialogue from "components/UI/ErrorDialogue";
import styles from "./Gallery.module.css";

function AlumniMeet() {
  const { isLoading, error, images } = useGetGalleryImages(2);

  if (error)
    return (
      <div className={styles.error_container}>
        <ErrorDialogue errorMessage={error.message} />
      </div>
    );

  return (
    <GalleryTemplate
      fname="ALUMNI"
      sname="MEET"
      isLoading={isLoading}
      data={images}
    />
  );
}

export default AlumniMeet;
