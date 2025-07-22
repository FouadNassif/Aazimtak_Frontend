"use client";
import React from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import Image from 'next/image'

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Image
          src="/assets/img/Welcome.jpg"
          alt="Wedding Planning"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </Box>
      
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
          zIndex: 2,
        }}
      />

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: "center",
              color: "white",
              maxWidth: "800px",
              mx: "auto",
              px: 3,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.1rem", md: "4rem" },
                fontWeight: 800,
                mb: 3,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                background: "linear-gradient(45deg, #fff, #f0f0f0)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Wedding, Your Invitation, Your Story.
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 5,
                fontSize: { xs: "1.3rem", md: "1.7rem" },
                lineHeight: 1.6,
                fontWeight: 400,
                opacity: 0.9,
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Design Stunning Wedding Invitations and Share Them Instantly.
            </Typography>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                href="/dashboard"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  borderRadius: "30px",
                  backgroundImage: "linear-gradient(45deg, #2a5298, #1976d2)",
                  boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
                  transition: "all 0.3s ease",
                  textTransform: "none",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
