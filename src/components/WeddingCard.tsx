"use client";

import { Box } from "@mui/material";
import ImagesLayout5 from "@/components/Card/ImagesLayout5";
import Countdown from "@/components/Card/CountDown";
import DateDisplay from "@/components/Card/DateDisplay";
import BibleVerse from "@/components/Card/BibbleVerse";
import ImagesLayout2 from "@/components/Card/ImagesLayout2";
import WeddingDetails from "@/components/Card/WeddingDetails";
import GiftRegistry from "@/components/Card/GiftRegistry";
import ImagesLayout3 from "@/components/Card/ImagesLayout3";
import ImagesLayout4 from "@/components/Card/ImagesLayout4";
import RSVPForm from "./Card/RSVPForm";
import PoweredBy from "@/components/PowerBy";

import { WeddingDetailsPropsType } from "@/types/wedding";

const defaultImages = {
  layout2: ["/assets/img/Welcome.jpg", "/assets/img/Welcome2.jpg"],
  layout3: [
    "/assets/img/Welcome.jpg",
    "/assets/img/Welcome2.jpg",
    "/assets/img/Welcome3.jpg",
  ],
  layout4: [
    "/assets/img/Welcome.jpg",
    "/assets/img/Welcome2.jpg",
    "/assets/img/Welcome3.jpg",
    "/assets/img/Support.jpg",
  ],
  layout5: [
    "/assets/img/Welcome.jpg",
    "/assets/img/Welcome2.jpg",
    "/assets/img/Welcome3.jpg",
    "/assets/img/Support.jpg",
    "/assets/img/img1.jpg",
  ],
};

export default function WeddingCard({
  weddingDetails,
  guest,
  images,
}: WeddingDetailsPropsType) {
  const getLayoutImages = (layout: number, count: number): string[] => {
    if (!images || images.length === 0) {
      return (
        defaultImages[`layout${count}` as keyof typeof defaultImages] || []
      );
    }

    const layoutImages = images.filter((img) => img.layout === layout);
    if (layoutImages.length === 0) {
      return (
        defaultImages[`layout${count}` as keyof typeof defaultImages] || []
      );
    }

    return layoutImages
      .slice(0, count)
      .map((img) => process.env.NEXT_PUBLIC_BACKEND_URL + img.path);
  };

  return (
    <>
      <ImagesLayout5
        image1={getLayoutImages(5, 5)[0]}
        image2={getLayoutImages(5, 5)[1]}
        image3={getLayoutImages(5, 5)[2]}
        image4={getLayoutImages(5, 5)[3]}
        image5={getLayoutImages(5, 5)[4]}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom={25}
      >
        <BibleVerse
          verse="Therefore what God has joined together, let no one separate."
          reference="Mark 12:9"
        />
        <DateDisplay date={weddingDetails.wedding_date} />
        <Countdown targetDate={weddingDetails.wedding_date} />
      </Box>
      <ImagesLayout5
        image1={getLayoutImages(6, 5)[0]}
        image2={getLayoutImages(6, 5)[1]}
        image3={getLayoutImages(6, 5)[2]}
        image4={getLayoutImages(6, 5)[3]}
        image5={getLayoutImages(6, 5)[4]}
      />
      <WeddingDetails
        weddingDetail={{
          type: "Wedding Ceremony",
          time: weddingDetails.ceremony_time,
          place: weddingDetails.ceremony_place,
          city: weddingDetails.ceremony_city,
          maps: weddingDetails.ceremony_maps,
        }}
      />
      <ImagesLayout2
        image1={getLayoutImages(2, 2)[0]}
        image2={getLayoutImages(2, 2)[1]}
      />

      <WeddingDetails
        weddingDetail={{
          type: "Wedding Party",
          time: weddingDetails.party_time,
          place: weddingDetails.party_place,
          city: weddingDetails.party_city,
          maps: weddingDetails.party_maps,
        }}
      />
      <ImagesLayout3
        image1={getLayoutImages(3, 3)[0]}
        image2={getLayoutImages(3, 3)[1]}
        image3={getLayoutImages(3, 3)[2]}
      />
      <GiftRegistry
        weddingDetail={{
          gift_type: weddingDetails.gift_type,
          gift_details: weddingDetails.gift_details,
        }}
      />
      <ImagesLayout4
        image1={getLayoutImages(4, 4)[0]}
        image2={getLayoutImages(4, 4)[1]}
        image3={getLayoutImages(4, 4)[2]}
        image4={getLayoutImages(4, 4)[3]}
      />
      <RSVPForm
        guest={{
          name: guest.name,
          number_of_people: guest.number_of_people,
          number_of_kids: guest.number_of_kids,
        }}
        date={weddingDetails.wedding_date}
      />
      <PoweredBy />
    </>
  );
}
