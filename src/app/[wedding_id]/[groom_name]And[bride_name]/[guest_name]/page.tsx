"use client";
export const dynamic = "force-dynamic";

import {
  getWeddingCardDetails,
  getWeddingPreferences,
  getWeddingPreferencesWedding,
} from "@/actions/wedding";
import { Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "@/components/Card/Welcome";
import Loading from "@/components/Loading";
import WeddingCard from "@/components/WeddingCard";
import ErrorMessage from "@/components/ErrorMessage";
import { getAllUserImages, UserImage } from "@/actions/UploadImages";
import { WeddingType, WeddingDetailsType, GuestType } from "@/types/wedding";

const GuestPage = () => {
  const params = useParams();
  const router = useRouter();

  const { wedding_id, guest_name: encodedGuestName } = params;

  const [groom_name, bride_name] = params["groom_name]And[bride_name"]
    ? String(params["groom_name]And[bride_name"])
        .split("And")
        .map((name) => decodeURIComponent(name))
    : [null, null];

  const guest_name = encodedGuestName
    ? decodeURIComponent(String(encodedGuestName))
    : null;
  const weddingIdNumber = wedding_id ? Number(wedding_id) : NaN;

  const [wedding, setWedding] = useState<WeddingType | null>(null);
  const [weddingDetails, setWeddingDetails] =
    useState<WeddingDetailsType | null>(null);
  const [guest, setGuest] = useState<GuestType | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<UserImage[]>([]);
  const [preferences, setPreferences] = useState<any>(null);

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
    const fetchPreferences = async () => {
      try {
        const response = await getWeddingPreferencesWedding({
          wedding_id: weddingIdNumber,
        });

        if (response?.preferences) {
          setPreferences(response.preferences);
        }
      } catch (error) {
        console.error("Error fetching wedding preferences:", error);
      }
    };
    fetchPreferences();
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
        console.error("Error fetching wedding details:", err);
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
      ) : ready && weddingDetails && guest ? (
        <WeddingCard
          weddingDetails={weddingDetails}
          guest={guest}
          images={images}
        />
      ) : wedding && weddingDetails ? (
        <Card
          wedding={wedding}
          weddingDetails={weddingDetails}
          setReady={setReady}
          preferences={preferences}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default GuestPage;
