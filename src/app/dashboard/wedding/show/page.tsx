"use client";

import { useEffect, useState } from "react";
import { getAllUserImages } from "@/actions/UploadImages";
import ImagesLayout2 from "@/components/Card/ImagesLayout2";
import ImagesLayout3 from "@/components/Card/ImagesLayout3";
import ImagesLayout4 from "@/components/Card/ImagesLayout4";
import ImagesLayout5 from "@/components/Card/ImagesLayout5";
import { useAuth } from "@/context/AuthProvider";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import { getWeddingData } from "@/actions/clientsDashboard";
import WeddingDemo from "@/components/WeddingDemo";

export default function EditImages() {
  const { user } = useAuth();
  const [weddingDetails, setWeddingDetails] = useState(null);
  const [wedding, setWedding] = useState(null);
  const [userImages, setUserImages] = useState<
    { layout: number; path: string }[]
  >([]);

  const getWeddingDeatils = async () => {
    try {
      const WeddingData = await getWeddingData({ userId: user.id });
      setWeddingDetails(WeddingData.wedding_details);
      setWedding(WeddingData.wedding);
    } catch (err) {
      console.error("Error fetching wedding details:", err);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch images
        const images = await getAllUserImages({ userId: user.id });
        setUserImages(images);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    // Fetch wedding details after images
    if (user?.id) {
      getWeddingDeatils();
      fetchImages();
    }
  }, [user]);

  useEffect(() => {
    if (weddingDetails) {
      console.log("Wedding details updated:", weddingDetails);
    }
  }, [weddingDetails]); // This will run every time weddingDetails changes
  const baseUrl = process.env.NEXT_PUBLIC_API_URL; // Base URL

  const groupedImages: { [key: number]: string[] } = {};

  // Ensure userImages is an object and iterate over the keys
  if (userImages && typeof userImages === "object") {
    Object.keys(userImages).forEach((layoutKey) => {
      const layoutImages = userImages[layoutKey];
      if (typeof layoutImages === "object") {
        // Convert the layoutImages object to an array of image URLs
        groupedImages[parseInt(layoutKey)] = Object.values(layoutImages).map(
          (imagePath) => `${baseUrl}${imagePath}`
        );
      }
    });
  } else {
    console.error("userImages is not a valid object", userImages);
  }

  console.log(groupedImages);

  return (
    <DashboardClientLayout>
      {wedding && weddingDetails ? (
        <WeddingDemo
          weddingDetails={weddingDetails}
          groupedImages={groupedImages}
        />
      ) : (
        <p>Loading wedding data...</p>
      )}
    </DashboardClientLayout>
  );
}
