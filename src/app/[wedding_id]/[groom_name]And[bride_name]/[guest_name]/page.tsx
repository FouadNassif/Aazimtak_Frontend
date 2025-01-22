"use client";

import { getWeddingCardDetails } from "@/actions/wedding";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation"; // Added useRouter
import { useState, useEffect } from "react";
import Card from "@/components/Card/Welcome";
import Loading from "@/components/Loading";
import WeddingCard from "@/components/WeddingCard";
import ErrorMessage from "@/components/ErrorMessage";

const GuestPage = () => {
  const params = useParams();
  const router = useRouter(); // Initialize the router for navigation

  // Extract parameters from URL
  const { wedding_id, guest_name: encodedGuestName } = params;

  const [groom_name, bride_name] = params["groom_name]And[bride_name"]
    ? String(params["groom_name]And[bride_name"])
        .split("And")
        .map((name) => decodeURIComponent(name))
    : [null, null];

  const guest_name = encodedGuestName
    ? decodeURIComponent(encodedGuestName)
    : null;
  const weddingIdNumber = wedding_id ? Number(wedding_id) : NaN;

  const [wedding, setWedding] = useState(null);
  const [weddingDetails, setWeddingDetails] = useState(null);
  const [guest, setGuest] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const handleSubmit = async () => {
      // Validate required data before making the API call
      if (isNaN(weddingIdNumber) || !guest_name || !groom_name || !bride_name) {
        setError("Invalid wedding ID, groom/bride name, or guest name");
        return;
      }

      try {
        // Fetch wedding card details
        const result = await getWeddingCardDetails({
          wedding_id: weddingIdNumber,
          guest_name: guest_name,
          groom_name: groom_name,
          bride_name: bride_name,
        });

        if (!result.validdata) {
          setError("No valid wedding invitation link available");
          return;
        }

        if (result) {
          setWedding(result.wedding);
          setWeddingDetails(result.wedding_detail);
          setGuest(result.guest);
        }
      } catch (err) {
        setError("An error occurred while fetching wedding details");
      }
    };

    if (wedding_id && guest_name && groom_name && bride_name) {
      handleSubmit();
    } else {
      setError("Missing wedding_id, groom_name, bride_name, or guest_name");
    }
  }, [wedding_id, guest_name, groom_name, bride_name, weddingIdNumber]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        router.push("/"); 
      }, 3000);
    }
  }, [error, router]);

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
      {error ? (
        <ErrorMessage message={error} />
      ) : ready ? (
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
