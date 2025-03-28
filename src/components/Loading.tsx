"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500); // Update every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress
        size={60}
        thickness={2}
        sx={{ color: "#000" }} // Primary color
      />
      <Typography marginTop={4}>Loading{dots}</Typography>
    </Box>
  );
}
