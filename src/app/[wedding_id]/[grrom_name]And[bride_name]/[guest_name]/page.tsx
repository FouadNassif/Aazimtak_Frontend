"use client";

import { getWeddingCardDetails } from "@/actions/wedding";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "@/components/Card/Welcome";
import Loading from "@/components/Loading";

const GuestPage = () => {
  const params = useParams();
  const { wedding_id } = params;

  const [wedding, setWedding] = useState(null);
  const [weddingDetails, setWeddingDetails] = useState(null);
  const [ready, setReady] = useState(false);

  const weddingIdNumber = wedding_id ? Number(wedding_id) : NaN;

  useEffect(() => {
    const handleSubmit = async () => {
      if (isNaN(weddingIdNumber)) {
        console.log("Invalid wedding ID");
        return;
      }

      try {
        const result = await getWeddingCardDetails({
          wedding_id: weddingIdNumber,
        });
        if (result) {
          setWedding(result.wedding);
          setWeddingDetails(result.wedding_detail);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleSubmit();
  }, [weddingIdNumber]);

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
        <Typography>Hello</Typography>
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
