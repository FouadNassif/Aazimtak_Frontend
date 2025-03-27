import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
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

interface WeddingDetailsProps {
  weddingDetails: {
    wedding_date: string;
    ceremony_time: string;
    ceremony_place: string;
    ceremony_city: string;
    ceremony_maps: string;
    party_time: string;
    party_place: string;
    party_city: string;
    party_maps: string;
    gift_type: string;
    gift_details: string;
  };
  guest: {
    name: string;
    number_of_people: number;
    number_of_kids: number;
  };
}

const imageUrls = [
  "/assets/img/img1.jpg",
  "/assets/img/Welcome.jpg",
  "/assets/img/Support.jpg",
  "/assets/img/Welcome2.jpg",
  "/assets/img/Welcome3.jpg",
];

export default function WeddingCard({
  weddingDetails,
  guest,
}: WeddingDetailsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            setLoadedImages((prev) => prev + 1);
            resolve(url);
          };
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f3e5ab, #f8f5f2)",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CircularProgress
            size={60}
            sx={{
              color: "#d4a373",
              marginBottom: "20px",
            }}
          />
          <Box
            sx={{
              color: "#2c3e50",
              fontSize: "18px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Loading your invitation...
          </Box>
          <Box
            sx={{
              color: "#666",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            {Math.round((loadedImages / imageUrls.length) * 100)}% complete
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <ImagesLayout5
        image1="/assets/img/img1.jpg"
        image2="/assets/img/Welcome.jpg"
        image3="/assets/img/Support.jpg"
        image4="/assets/img/Welcome2.jpg"
        image5="/assets/img/Welcome3.jpg"
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
        image1="/assets/img/img1.jpg"
        image2="/assets/img/Welcome.jpg"
        image3="/assets/img/Support.jpg"
        image4="/assets/img/Welcome2.jpg"
        image5="/assets/img/Welcome3.jpg"
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
        image1="/assets/img/Welcome.jpg"
        image2="/assets/img/Support.jpg"
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
        image1="/assets/img/Support.jpg"
        image2="/assets/img/Welcome2.jpg"
        image3="/assets/img/Welcome3.jpg"
      />
      <GiftRegistry
        weddingDetail={{
          gift_type: weddingDetails.gift_type,
          gift_details: weddingDetails.gift_details,
        }}
      />
      <ImagesLayout4
        image1="/assets/img/Welcome.jpg"
        image2="/assets/img/Support.jpg"
        image3="/assets/img/Welcome2.jpg"
        image4="/assets/img/Welcome3.jpg"
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
