"use client";

import { getWeddingCardDetails } from "@/actions/wedding";
import { Box } from "@mui/material";
import { useParams } from "next/navigation"; // Use useParams from next/navigation to get dynamic params
import { useState, useEffect } from "react";
import Card from "@/components/Card/Welcome";
import Loading from "@/components/Loading";
import WeddingCard from "@/components/WeddingCard";


const GuestPage = () => {
  const params = useParams(); // Get dynamic params from URL
  // Extract and decode dynamic params
  const { wedding_id, guest_name: encodedGuestName } = params;
  const guest_name = encodedGuestName
    ? decodeURIComponent(encodedGuestName)
    : null;

  console.log("Params:", params);
  console.log("wedding_id:", wedding_id);
  console.log("Decoded guest_name:", guest_name);

  const [wedding, setWedding] = useState(null);
  const [weddingDetails, setWeddingDetails] = useState(null);
  const [guest, setGuest] = useState(null);
  const [ready, setReady] = useState(false);

  // Handle invalid data and parse the wedding ID
  const weddingIdNumber = wedding_id ? Number(wedding_id) : NaN;

  useEffect(() => {
    const handleSubmit = async () => {
      if (isNaN(weddingIdNumber) || !guest_name) {
        console.log("Invalid wedding ID or guest name");
        return;
      }

      try {
        const result = await getWeddingCardDetails({
          wedding_id: weddingIdNumber,
          guest_name: guest_name,
        });

        if (result) {
          setWedding(result.wedding);
          setWeddingDetails(result.wedding_detail);
          setGuest(result.guest);

          // Do NOT set ready to true here, as it should only change after the user taps
          // setReady(true);
        }
      } catch (err) {
        console.log("API error:", err);
      }
    };

    if (wedding_id && guest_name) {
      handleSubmit();
    } else {
      console.log("Missing wedding_id or guest_name");
    }
  }, [wedding_id, guest_name, weddingIdNumber]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "0 20px",
      }}
    >
      {ready ? (
        <WeddingCard weddingDetails={weddingDetails} guest={guest} />
      ) : wedding && weddingDetails ? (
        <Card
          wedding={wedding}
          weddingDetails={weddingDetails}
          setReady={setReady}
        />
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default GuestPage;
