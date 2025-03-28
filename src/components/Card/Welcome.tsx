"use client";

import { Box, Button, Typography, Fade } from "@mui/material";
import { motion } from "framer-motion";

interface WelcomeProps {
  wedding: {
    groom_name: string;
    bride_name: string;
  };
  weddingDetails: {
    wedding_date: string;
  };
  setReady: (ready: boolean) => void;
}

export default function Card({ wedding, weddingDetails, setReady }: WelcomeProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        background: "linear-gradient(135deg, #f3e5ab, #f8f5f2)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('/wedding-background.jpg') no-repeat center center",
          backgroundSize: "cover",
          opacity: 0.1,
          zIndex: 1,
          animation: "fadeIn 2s ease-in-out",
        }}
      />

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          background: "url('/floral-corner.png') no-repeat center center",
          backgroundSize: "contain",
          opacity: 0.2,
          transform: "rotate(-45deg)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "100px",
          height: "100px",
          background: "url('/floral-corner.png') no-repeat center center",
          backgroundSize: "contain",
          opacity: 0.2,
          transform: "rotate(135deg)",
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <Fade in timeout={1000}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "48px",
            boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.15)",
            maxWidth: "500px",
            width: "100%",
            position: "relative",
            zIndex: 2,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Wedding Names */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "bold",
              color: "#2c3e50",
              letterSpacing: "3px",
              marginBottom: "16px",
              textTransform: "uppercase",
              lineHeight: "1.4",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {wedding.groom_name} & {wedding.bride_name}
          </Typography>

          {/* Wedding Date */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Roboto', sans-serif",
              color: "#666",
              marginBottom: "40px",
              fontSize: "18px",
              fontStyle: "italic",
              letterSpacing: "1px",
            }}
          >
            {new Date(weddingDetails.wedding_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>

          {/* Decorative Line */}
          <Box
            sx={{
              width: "100px",
              height: "3px",
              background: "linear-gradient(90deg, #d4a373, #e9edc9)",
              margin: "30px auto",
              borderRadius: "3px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />

          {/* Elegant Button */}
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              backgroundColor: "#d4a373",
              color: "#fff",
              padding: "16px 40px",
              fontSize: "16px",
              borderRadius: "40px",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "bold",
              boxShadow: "0px 8px 20px rgba(212, 163, 115, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "2px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#b5835a",
                boxShadow: "0px 12px 30px rgba(212, 163, 115, 0.5)",
              },
            }}
            onClick={() => setReady(true)}
          >
            View Invitation
          </Button>
        </Box>
      </Fade>

      {/* Floating Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "60px",
          height: "60px",
          background: "url('/floating-flower.png') no-repeat center center",
          backgroundSize: "contain",
          opacity: 0.3,
          animation: "float 6s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "30%",
          left: "15%",
          width: "40px",
          height: "40px",
          background: "url('/floating-flower.png') no-repeat center center",
          backgroundSize: "contain",
          opacity: 0.3,
          animation: "float 8s ease-in-out infinite",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
