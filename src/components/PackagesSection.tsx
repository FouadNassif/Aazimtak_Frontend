"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { packages } from "@/data/packages";
import { motion } from "framer-motion";

export const PackagesSection = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          mb: 4,
          fontWeight: 700,
          background: "linear-gradient(45deg, #2a5298, #1976d2)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Special Packages
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {packages.map((pkg, index) => (
          <Grid item xs={12} md={4} key={pkg.name}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                elevation={pkg.isPopular ? 8 : 1}
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {React.createElement(pkg.icon, {
                      sx: { fontSize: 40, color: "primary.main", mr: 2 },
                    })}
                    <Typography variant="h5" fontWeight={600}>
                      {pkg.name}
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
                    ${pkg.price}
                  </Typography>
                  <List>
                    {pkg.features.map((feature, idx) => (
                      <ListItem key={idx} disableGutters>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {React.createElement(feature.icon)}
                        </ListItemIcon>
                        <ListItemText primary={feature.text} />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      py: 1.5,
                      backgroundImage:
                        "linear-gradient(45deg, #2a5298, #1976d2)",
                    }}
                  >
                    Choose Package
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
