"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Navigate to the previous page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#121212", // Black background
        color: "#ffffff", // White text
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", mb: 2 }}>
        403
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        You are not authorized to access this page.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "#9e9e9e" }}>
        If you believe this is a mistake, please contact the administrator.
      </Typography>
      <Button
        variant="contained"
        onClick={handleGoBack}
        sx={{
          backgroundColor: "#ff5722", // Orange button
          color: "#ffffff",
          fontWeight: "bold",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "#e64a19", // Darker orange on hover
          },
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
