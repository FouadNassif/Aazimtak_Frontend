import React from "react";
import { Button, Box, Typography } from "@mui/material";

export default function Hero() {
    return (
        <Box
            id="home"
            sx={{
                position: "relative", // Ensure positioning context for the overlay
                backgroundImage: "url('/assets/img/Welcome.jpg')", // Background image
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full viewport height
                textAlign: "center",
                color: "#fff", // White text
                padding: 4,
            }}
        >
            {/* Overlay (like .hero::before) */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)", // Overlay effect
                    zIndex: 1, // Ensures the overlay is above the background but below the text
                }}
            />

            {/* Text content */}
            <Box sx={{ position: "relative", zIndex: 2 }}>
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
                    Wedding planning starts here
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, maxWidth: "600px" }}>
                    Design a personalized website, create an all-in-one registry, and experience wedding planning the way it
                    should be.
                </Typography>
                <Button variant="contained" color="primary" sx={{ padding: "10px 20px", fontSize: "1.1rem" }}>
                    Get Started
                </Button>
            </Box>
        </Box>
    );
}
