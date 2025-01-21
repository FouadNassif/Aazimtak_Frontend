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

export default function WeddingCard({
  weddingDetails,
  guest,
}: WeddingDetailsProps) {
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
