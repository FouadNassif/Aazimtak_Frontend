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
import PoweredBy from "@/components/PowerBy";
import RSVPForm from "./Card/RSVPForm";

export default function WeddingDemo({ weddingDetails, groupedImages }) {
  const guest = {
    name: "John Doe",
    number_of_people: 2,
    number_of_kids: 1,
  };
  return (
    <Box sx={{ width: "50%" }}>
      {groupedImages[5] && groupedImages[5].length >= 5 && (
        <ImagesLayout5
          image1={groupedImages[5][0]}
          image2={groupedImages[5][1]}
          image3={groupedImages[5][2]}
          image4={groupedImages[5][3]}
          image5={groupedImages[5][4]}
        />
      )}
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

      {groupedImages[2] && groupedImages[2].length >= 2 && (
        <ImagesLayout2
          image1={groupedImages[2][0]}
          image2={groupedImages[2][1]}
        />
      )}

      <WeddingDetails
        weddingDetail={{
          type: "Wedding Ceremony",
          time: weddingDetails.ceremony_time,
          place: weddingDetails.ceremony_place,
          city: weddingDetails.ceremony_city,
          maps: weddingDetails.ceremony_maps,
        }}
      />

      {groupedImages[3] && groupedImages[3].length >= 3 && (
        <ImagesLayout3
          image1={groupedImages[3][0]}
          image2={groupedImages[3][1]}
          image3={groupedImages[3][2]}
        />
      )}

      <WeddingDetails
        weddingDetail={{
          type: "Wedding Party",
          time: weddingDetails.party_time,
          place: weddingDetails.party_place,
          city: weddingDetails.party_city,
          maps: weddingDetails.party_maps,
        }}
      />

      {groupedImages[4] && groupedImages[4].length >= 4 && (
        <ImagesLayout4
          image1={groupedImages[4][0]}
          image2={groupedImages[4][1]}
          image3={groupedImages[4][2]}
          image4={groupedImages[4][3]}
        />
      )}

      <GiftRegistry
        weddingDetail={{
          gift_type: weddingDetails.gift_type,
          gift_details: weddingDetails.gift_details,
        }}
      />
      <RSVPForm
        guest={{
          name: guest.name,
          number_of_people: guest.number_of_people,
          number_of_kids: guest.number_of_kids,
        }}
        date={weddingDetails.wedding_date}
      />
      {groupedImages[5] && groupedImages[6].length >= 5 && (
        <ImagesLayout5
          image1={groupedImages[6][0]}
          image2={groupedImages[6][1]}
          image3={groupedImages[6][2]}
          image4={groupedImages[6][3]}
          image5={groupedImages[6][4]}
        />
      )}
      <PoweredBy />
    </Box>
  );
}
