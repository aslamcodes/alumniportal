import React, { useEffect } from "react";
import GalleryTemplate from "components/GalleryComponents/GalleryTemplate";
import { useGetGalleryImages } from "hooks/useGetGalleryImages";
function AlumniMeet() {
  const { isLoading, error, images } = useGetGalleryImages(2);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

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
