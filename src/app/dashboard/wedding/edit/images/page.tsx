"use client";

import { useEffect, useState } from "react";
import { getAllUserImages } from "@/actions/UploadImages";
import ImagesLayout2 from "@/components/Card/ImagesLayout2";
import ImagesLayout3 from "@/components/Card/ImagesLayout3";
import ImagesLayout4 from "@/components/Card/ImagesLayout4";
import ImagesLayout5 from "@/components/Card/ImagesLayout5";
import { useAuth } from "@/context/AuthProvider";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import WeddingCard from "@/components/WeddingCard";
import { getWeddingData } from "@/actions/clientsDashboard";

const guest = {
  name: "John Doe",
  number_of_people: 2,
  number_of_kids: 1,
};

const WeddingDetails =  {
    wedding_date: "2026-11-23",
    ceremony_time: "11:00",
    ceremony_place: "Somewhere",
    ceremony_city: "Unknow",
    ceremony_maps: "wdwdwd",
    party_time: "16:00",
    party_place: "Somewhere",
    party_city: "Unknow",
    party_maps: "wdwdw",
    gift_type: "Bank",
    gift_details: "Bank-12-23-ADC",
  };
export default function EditImages() {
  const { user } = useAuth();

  const [userImages, setUserImages] = useState<
    { layout: number; path: string }[]
  >([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (!user?.id) return;
      try {
        const images = await getAllUserImages({ userId: user.id });
        setUserImages(images);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, [user]);

  const groupedImages: { [key: number]: string[] } = {};

  Object.entries(userImages).forEach(([layout, images]) => {
    const layoutKey = Number(layout);
    if (!groupedImages[layoutKey]) {
      groupedImages[layoutKey] = [];
    }

    Object.values(images).forEach((path) => {
      groupedImages[layoutKey].push(process.env.NEXT_PUBLIC_API_URL + path);
    });
  });

  return (
    <DashboardClientLayout>
      <h1 className="text-xl font-bold">Edit Images</h1>
      <div className="space-y-4">
        {Object.entries(groupedImages).map(([layout, images]) => {
          switch (parseInt(layout)) {
            case 2:
              return images.length >= 2 ? (
                <ImagesLayout2
                  key={layout}
                  image1={images[0]}
                  image2={images[1]}
                />
              ) : null;
            case 3:
              return images.length >= 3 ? (
                <ImagesLayout3
                  key={layout}
                  image1={images[0]}
                  image2={images[1]}
                  image3={images[2]}
                />
              ) : null;
            case 4:
              return images.length >= 4 ? (
                <ImagesLayout4
                  key={layout}
                  image1={images[0]}
                  image2={images[1]}
                  image3={images[2]}
                  image4={images[3]}
                />
              ) : null;
            case 5:
              return images.length >= 5 ? (
                <ImagesLayout5
                  key={layout}
                  image1={images[0]}
                  image2={images[1]}
                  image3={images[2]}
                  image4={images[3]}
                  image5={images[4]}
                />
              ) : null;
            case 6:
              return images.length >= 5 ? (
                <ImagesLayout5
                  key={layout}
                  image1={images[0]}
                  image2={images[1]}
                  image3={images[2]}
                  image4={images[3]}
                  image5={images[4]}
                />
              ) : null;
            default:
              return null;
          }
        })}
      </div>
      <WeddingCard weddingDetails={WeddingDetails} guest={guest} />
    </DashboardClientLayout>
  );
}
