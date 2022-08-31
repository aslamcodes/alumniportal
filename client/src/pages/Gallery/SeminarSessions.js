import React, { useEffect } from "react";
import GalleryTemplate from "components/GalleryComponents/GalleryTemplate";
import { useGetGalleryImages } from "hooks/useGetGalleryImages";
import { useAlertContext } from "context/alert/alertContext";

function SeminarSessions() {
  const { isLoading, error, images } = useGetGalleryImages(1);
  const { success } = useAlertContext();

  useEffect(() => {
    if (error) success(error);
  }, [error, success]);

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
