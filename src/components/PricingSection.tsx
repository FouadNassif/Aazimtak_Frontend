"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { plans } from "@/data/plans";

export const PricingSection = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: "linear-gradient(45deg, #2a5298, #1976d2)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Choose Your Plan
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Select the perfect plan for your special event
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} md={3} key={plan.name + index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                elevation={plan.isPopular ? 8 : 1}
                sx={{
                  height: "100%",
                  position: "relative",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                  border: plan.isPopular
                    ? `2px solid ${theme.palette.primary.main}`
                    : "none",
                }}
              >
                {plan.isPopular && (
                  <Chip
                    label="Most Popular"
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: 20,
                      px: 2,
                    }}
                  />
                )}
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight={600}
                    gutterBottom
                  >
                    {plan.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline", mb: 4 }}>
                    <Typography variant="h3" component="span" fontWeight={700}>
                      ${plan.price}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>
                  <List sx={{ mb: 4 }}>
                    {plan.features.map((feature, idx) => (
                      <React.Fragment key={idx}>
                        <ListItem disableGutters>
                          <ListItemIcon
                            sx={{
                              minWidth: 40,
                              color: theme.palette.primary.main,
                            }}
                          >
                            {React.createElement(feature.icon)}
                          </ListItemIcon>
                          <ListItemText primary={feature.text} />
                        </ListItem>
                        {idx < plan.features.length - 1 && (
                          <Divider sx={{ my: 1 }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                  <Button
                    variant={plan.isPopular ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                      ...(plan.isPopular && {
                        backgroundImage:
                          "linear-gradient(45deg, #2a5298, #1976d2)",
                      }),
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
