"use client";
import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Section = ({ imgSrc, title, description, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: isEven ? "white" : "#f8fafc",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
          direction={isEven ? "row" : "row-reverse"}
        >
          {imgSrc && (
            <Grid item xs={12} md={6}>
              <Box
                component={motion.img}
                src={imgSrc}
                alt={title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
              />
            </Grid>
          )}

          <Grid item xs={12} md={imgSrc ? 6 : 12}>
            <Box
              sx={{
                textAlign: { xs: "center", md: imgSrc ? "left" : "center" },
                maxWidth: imgSrc ? undefined : "800px",
                margin: imgSrc ? undefined : "0 auto",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: "linear-gradient(45deg, #2a5298, #1976d2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                {description}
              </Typography>

              <Button
                variant="contained"
                size="large"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "30px",
                  backgroundImage: "linear-gradient(45deg, #2a5298, #1976d2)",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default function Sections() {
  const sections = [
    {
      imgSrc: "/assets/img/Welcome2.jpg",
      title: "Wedding Websites",
      description:
        "Start a Wedding Website subscription and get everything customized to fit your unique style and needs. Share via Email, Text & WhatsApp!",
    },
    {
      imgSrc: "/assets/img/Welcome3.jpg",
      title: "Online Wedding Invites & Save the Dates",
      description:
        "Send an Online Wedding Invitation, Save the Date, or Rehearsal Dinner Invitation. Send & share via Email, Text, or WhatsApp.",
    },
    {
      imgSrc: "/assets/img/WhyAazimtak.jpg",
      title: "Why Aazimtak?",
      description:
        "For over 10 years, our passion for design and commitment to our customers have been the pillars of our family-owned business.",
    },
    {
      imgSrc: null,
      title: "How It Works",
      description:
        "1. Sign up and create your account. 2. Choose a template and customize your wedding website. 3. Add your guest list and send out invitations. 4. Manage RSVPs and keep track of your wedding details.",
    },
  ];

  return (
    <Box component="section">
      {sections.map((section, index) => (
        <Section key={index} {...section} index={index} />
      ))}
    </Box>
  );
}
