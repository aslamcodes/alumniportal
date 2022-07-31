import React from "react";
import GalleryTemplate from "components/GalleryComponents/GalleryTemplate";
import { useGetGalleryImages } from "hooks/useGetGalleryImages";
import Loader from "components/UI/Loader";

function AllPhotos() {
  const { isLoading, error, images } = useGetGalleryImages(0);
  // console.log(images);
  return <GalleryTemplate fname="ALL" sname="PHOTOS" data={images} />;
}

export default AllPhotos;
