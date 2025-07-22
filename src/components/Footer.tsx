"use client";

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        color: "text.secondary",
        py: { xs: 4, sm: 6 },
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <Image src="/assets/img/Alogo.png" alt="Aazimtak Logo" width={40} height={40} />
              <Typography variant="h6" color="text.primary" sx={{ ml: 1, fontWeight: 700 }}>
                Aazimtak
              </Typography>
            </Box>
            <Typography variant="body2">
              Your perfect wedding, planned to perfection. We handle the details, so you can enjoy the moment.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1, "&:hover": { color: 'primary.main' } }}>Home</Link>
            <Link href="/pricing" color="inherit" display="block" sx={{ mb: 1, "&:hover": { color: 'primary.main' } }}>Pricing</Link>
            <Link href="/learn-more" color="inherit" display="block" sx={{ mb: 1, "&:hover": { color: 'primary.main' } }}>Learn More</Link>
            <Link href="/login" color="inherit" display="block" sx={{ "&:hover": { color: 'primary.main' } }}>Login</Link>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" color="inherit" aria-label="Facebook"><FacebookIcon /></IconButton>
              <IconButton href="#" color="inherit" aria-label="Twitter"><TwitterIcon /></IconButton>
              <IconButton href="#" color="inherit" aria-label="Instagram"><InstagramIcon /></IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Aazimtak. All Rights Reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link href="#" color="inherit" sx={{ mx: 1 }}>Privacy Policy</Link>
            |
            <Link href="#" color="inherit" sx={{ mx: 1 }}>Terms of Service</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 