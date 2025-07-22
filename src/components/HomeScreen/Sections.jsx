"use client";
import React from "react";
import Image from "next/image";
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const Section = ({ imgSrc, title, description, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isEven = index % 2 === 0;

  // Define section IDs for the Learn More page
  const sectionIds = [
    "wedding-website",
    "digital-invitations",
    "why-aazimtak",
    "how-it-works",
  ];

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      sx={{
        py: { xs: 6, md: 12 },
        backgroundColor: isEven ? "#f8f9fa" : "#ffffff",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: isEven 
            ? "linear-gradient(135deg, rgba(42, 82, 152, 0.05) 0%, rgba(25, 118, 210, 0.05) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          direction={isMobile ? "column" : (isEven ? "row" : "row-reverse")}
        >
          {imgSrc && (
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "300px", md: "400px" },
                  borderRadius: { xs: "20px", md: "30px" },
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
                  },
                }}
              >
                <Image
                  src={imgSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={imgSrc ? 6 : 12}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              sx={{
                textAlign: { xs: "center", md: imgSrc ? "left" : "center" },
                maxWidth: imgSrc ? undefined : "800px",
                margin: imgSrc ? undefined : "0 auto",
                position: "relative",
                zIndex: 2,
                px: { xs: 2, md: 0 },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  background: "linear-gradient(45deg, #2a5298, #1976d2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
                  letterSpacing: "-0.5px",
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
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  maxWidth: "600px",
                  marginLeft: { xs: "auto", md: imgSrc ? "0" : "auto" },
                  marginRight: { xs: "auto", md: imgSrc ? "0" : "auto" },
                }}
              >
                {description}
              </Typography>

              <Link href={`/learn-more?section=${sectionIds[index]}`} passHref>
                <Button
                  variant="contained"
                  size="large"
                  component={motion.button}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(25, 118, 210, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    px: { xs: 4, md: 6 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: "30px",
                    backgroundImage: "linear-gradient(45deg, #2a5298, #1976d2)",
                    textTransform: "none",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(25, 118, 210, 0.4)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Link>
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
      title: "Create Your Dream Wedding Website",
      description:
        "Transform your wedding planning journey with our stunning, customizable wedding websites. Share your love story, event details, and beautiful photos in one elegant space. Perfect for couples who want to create a memorable digital experience for their guests.",
    },
    {
      imgSrc: "/assets/img/Welcome3.jpg",
      title: "Digital Invitations That Make an Impact",
      description:
        "Go paperless with our elegant digital invitations and save-the-dates. Share your special day instantly through email, text, or WhatsApp. Track RSVPs in real-time, save on printing costs, and make a positive environmental impact.",
    },
    {
      imgSrc: "/assets/img/WhyAazimtak.jpg",
      title: "Your Trusted Wedding Planning Partner",
      description:
        "With over a decade of experience, we've helped thousands of couples create their perfect wedding experience. Our family-owned business combines personalized service with cutting-edge technology to bring your wedding vision to life.",
    },
    {
      imgSrc: null,
      title: "Simple Steps to Your Perfect Wedding Website",
      description:
        "1. Choose your dream template from our curated collection\n2. Personalize every detail to match your wedding theme\n3. Add your photos, story, and event information\n4. Share with guests and manage everything in one place\n5. Enjoy a stress-free wedding planning experience",
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
