"use client";
import React from "react";
import { PricingSection } from "@/components/PricingSection";
import { PackagesSection } from "@/components/PackagesSection";
import Navbar from "@/components/Navbar";
import { Box, Container, Typography } from "@mui/material";

const PricingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: {
          xs: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          md: "linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <PricingSection />
      <PackagesSection />
      </Box>
      <Box
        component="footer"
        sx={{
          py: 4,
          mt: 6,
          background: "rgba(42,82,152,0.07)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Aazimtak. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default PricingPage;
