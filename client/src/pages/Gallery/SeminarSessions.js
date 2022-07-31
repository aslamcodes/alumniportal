import React, { useEffect } from "react";
import GalleryTemplate from "components/GalleryComponents/GalleryTemplate";
import { useGetGalleryImages } from "hooks/useGetGalleryImages";

function SeminarSessions() {
  const { isLoading, error, images } = useGetGalleryImages(1);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

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
