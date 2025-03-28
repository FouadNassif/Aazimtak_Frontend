"use client";

import { Box, Typography } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h6" color="error">
        {message}
      </Typography>
    </Box>
  );
}
