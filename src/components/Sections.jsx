"use client";
import React from "react";
import { Box, Typography, Button, Fade } from "@mui/material";
import { useInView } from "react-intersection-observer";

const Section = ({ imgSrc, title, description }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        width: "50%",
        marginBottom: 4,
        position: "relative",
        height: "100vh", // Set height of each section to fill the viewport
        textAlign: "center", // Centers the text horizontally
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: "60%", // Adjust width as needed
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={imgSrc}
          alt={title}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain", // Ensures the image fits well
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 3,
        }}
      >
        <Fade in={inView} timeout={1000}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Fade>
        <Fade in={inView} timeout={1000}>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {description}
          </Typography>
        </Fade>
        <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default function Sections() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Section
        imgSrc="/assets/img/Welcome2.jpg"
        title="Wedding Websites"
        description="Start a Wedding Website subscription and get everything customized to fit your unique style and needs. Share via Email, Text & WhatsApp! With a Bliss & Bone Wedding Website, you can communicate logistics without compromising on design."
      />

      <Section
        imgSrc="/assets/img/Welcome3.jpg"
        title="Online Wedding Invites & Save the Dates"
        description="Send an Online Wedding Invitation, Save the Date, or Rehearsal Dinner Invitation. Send & share via Email, Text, or WhatsApp. Access thousands of assets to create a dynamic and engaging online experience and get your guests excited to celebrate."
      />

      <Section
        imgSrc="/assets/img/WhyAazimtak.jpg"
        title="Why Aazimtak?"
        description="For over 10 years, our passion for design and commitment to our customers have been the pillars of our family-owned business. Driven by a desire to create high-end wedding technology, Aazimtak allows both beginners and experts to build gorgeous wedding websites with all the tools you'll need to manage your event."
      />

      <Section
        imgSrc={null}
        title="How It Works"
        description="1. Sign up and create your account. 2. Choose a template and customize your wedding website. 3. Add your guest list and send out invitations. 4. Manage RSVPs and keep track of your wedding details."
      />
    </Box>
  );
}
