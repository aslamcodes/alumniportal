import React, { useEffect } from "react";
import GalleryTemplate from "components/GalleryComponents/GalleryTemplate";
import { useGetGalleryImages } from "hooks/useGetGalleryImages";
import { useAlertContext } from "context/alert/alertContext";
import ErrorDialogue from "components/UI/ErrorDialogue";
import styles from "./Gallery.module.css";

function SeminarSessions() {
  const { isLoading, error, images } = useGetGalleryImages(1);

  if (error)
    return (
      <div className={styles.error_container}>
        <ErrorDialogue errorMessage={error.message} />
      </div>
    );

  return (
    <GalleryTemplate
      fname="SEMINAR"
      sname="SESSIONS"
      data={images}
      isLoading={isLoading}
    />
  );
}

export default SeminarSessions;
