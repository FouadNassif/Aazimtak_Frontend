"use client";

import { getWeddingCardDetails } from "@/actions/wedding";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "@/components/Card/Welcome";
import Loading from "@/components/Loading";
import WeddingCard from "@/components/WeddingCard";
import ErrorMessage from "@/components/ErrorMessage";
import { getAllUserImages, type UserImage } from "@/actions/UploadImages";

const GuestPage = () => {
  const params = useParams();
  const router = useRouter(); 

  // Ensure params are strings, not arrays
  const wedding_id = Array.isArray(params.wedding_id) ? params.wedding_id[0] : params.wedding_id;
  const encodedGuestName = Array.isArray(params.guest_name) ? params.guest_name[0] : params.guest_name;

  const groomBrideString = Array.isArray(params["groom_name]And[bride_name]"])
    ? params["groom_name]And[bride_name]"][0]
    : params["groom_name]And[bride_name]"];

  const [groom_name, bride_name] = groomBrideString
    ? groomBrideString.split("And").map(decodeURIComponent)
    : [null, null];

  const guest_name = encodedGuestName ? decodeURIComponent(encodedGuestName) : null;
  const weddingIdNumber = wedding_id ? Number(wedding_id) : NaN;

  const [wedding, setWedding] = useState(null);
  const [weddingDetails, setWeddingDetails] = useState(null);
  const [guest, setGuest] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<UserImage[]>([]);

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const response = await getAllUserImages(weddingIdNumber);
        if (response.success) {
          setImages(response.images);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    getAllImages();
  }, [weddingIdNumber]);

  useEffect(() => {
    const handleSubmit = async () => {
      if (isNaN(weddingIdNumber) || !guest_name || !groom_name || !bride_name) {
        setError("Invalid wedding ID, groom/bride name, or guest name");
        return;
      }

      try {
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
        console.log(err);
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
        <WeddingCard weddingDetails={weddingDetails} guest={guest} images={images} />
      ) : wedding && weddingDetails ? (
        <Card wedding={wedding} weddingDetails={weddingDetails} setReady={setReady} />
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default GuestPage;
