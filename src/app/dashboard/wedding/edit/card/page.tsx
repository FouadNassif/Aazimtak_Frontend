"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Paper, Typography, Grid, Tooltip, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import { useTheme as useCustomTheme } from "@/context/theme-context";
import colorPalettes from "@/data/colorPalettes";
import verses from "@/data/verses";
import fonts from "@/data/fonts";
import { useAuth } from "@/context/AuthProvider";

import { useToast } from "@/hooks/useToast";
const { showSuccess, showError } = useToast();
import { getWeddingData } from "@/actions/clientsDashboard";
import { getWeddingDataType } from "@/types/wedding";
import {
  getWeddingPreferences,
  saveWeddingPreferences,
} from "@/actions/wedding";

export default function Page() {
  const { user } = useAuth();

  const theme = useCustomTheme();
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0]);
  const [selectedFont, setSelectedFont] = useState(fonts[0].css);
  const [welcomeFont, setWelcomeFont] = useState(fonts[0].css);
  const [selectedVerseId, setSelectedVerseId] = useState<number | null>(null);
  const [weddingData, setWeddingData] = useState<getWeddingDataType>({
    groom_name: "",
    groom_lastname: "",
    bride_name: "",
    bride_lastname: "",
    wedding_date: "",
    ceremony_time: "",
    ceremony_place: "",
    ceremony_city: "",
    ceremony_maps: "",
    party_time: "",
    party_place: "",
    party_city: "",
    party_maps: "",
    gift_type: "",
    gift_details: "",
  });

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await getWeddingPreferences({ user_id: user.id });

        if (response?.preferences) {
          const preferences = response.preferences;

          const welcomeScreen = preferences.welcomeScreen || {};
          const weddingCard = preferences.weddingCard || {};
          const verse = preferences.verse || {};

          // Set welcome screen font
          setWelcomeFont(
            fonts.find((f) => f.id === welcomeScreen.font)?.css || fonts[0].css
          );

          // Set wedding card font
          setSelectedFont(
            fonts.find((f) => f.id === weddingCard.font)?.css || fonts[0].css
          );

          // Set selected color palette
          setSelectedPalette(
            colorPalettes.find((p) => p.id == welcomeScreen.palette) ||
              colorPalettes[0]
          );
          if (verse?.id) {
            setSelectedVerseId(verse.id);
          }
        }
      } catch (error) {
        console.error("Error fetching wedding preferences:", error);
        showError("Failed to load preferences. Please try again.");
      }
    };

    if (user?.id) {
      fetchPreferences();
    }
  }, [user?.id]);

  const handleSavePreferences = async () => {
    try {
      const payload = {
        welcomeScreen: {
          palette: selectedPalette.id,
          font: fonts.find((f) => f.css === welcomeFont)?.id,
        },
        weddingCard: {
          font: fonts.find((f) => f.css === selectedFont)?.id,
        },
        verse: {
          id: selectedVerseId,
        },
      };

      await saveWeddingPreferences({
        user_id: user.id,
        wedding_id: user.wedding_id,
        preferences: payload,
      });

      showSuccess("Preferences saved successfully!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      showError("Failed to save preferences.");
    }
  };

  useEffect(() => {
    const fetchWeddingData = async () => {
      try {
        const weddingDetails = await getWeddingData({ userId: user.id });

        if (weddingDetails) {
          const { wedding, wedding_details } = weddingDetails;
          setWeddingData((prevState) => ({
            ...prevState,
            ...wedding,
            ...wedding_details,
          }));
        }
      } catch (error) {
        console.error("Error fetching wedding data:", error);
        showError("Failed to load wedding data. Please try again.");
      }
    };

    fetchWeddingData();
  }, [user?.id]);

  useEffect(() => {
    const selected = fonts.find((f) => f.css === selectedFont);
    if (selected) {
      const existingLink = document.querySelector(
        `link[href="${selected.link}"]`
      );
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = selected.link;
        document.head.appendChild(link);
      }
    }
  }, [selectedFont]);

  useEffect(() => {
    const selected = fonts.find((f) => f.css === welcomeFont);
    if (selected) {
      const existingLink = document.querySelector(
        `link[href="${selected.link}"]`
      );
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = selected.link;
        document.head.appendChild(link);
      }
    }
  }, [welcomeFont]);

  return (
    <DashboardClientLayout>
      <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 1, sm: 2, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, letterSpacing: 1 }}>
          Change Welcome Screen
        </Typography>

        {/* Color Palettes Section */}
        <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, mt: 2, mb: 4, boxShadow: 3, background: '#fafbfc' }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3, letterSpacing: 0.5 }}>
            Choose a Color Palette
          </Typography>

          <Grid container spacing={2}>
            {colorPalettes.map((palette) => (
              <Grid item xs={6} sm={4} md={3} key={palette.id}>
                <Tooltip title={palette.name} arrow>
                  <Paper
                    elevation={selectedPalette.id === palette.id ? 6 : 1}
                    onClick={() => setSelectedPalette(palette)}
                    sx={{
                      cursor: "pointer",
                      p: 2,
                      borderRadius: 3,
                      border:
                        selectedPalette.id === palette.id
                          ? `2.5px solid ${palette.colors.primary}`
                          : "1px solid #ddd",
                      transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                      boxShadow: selectedPalette.id === palette.id ? 6 : 1,
                      minHeight: 90,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: selectedPalette.id === palette.id ? '#f5f5f5' : '#fff',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ mb: 1, fontSize: 15 }}
                    >
                      {palette.name}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {Object.values(palette.colors).slice(0, 4).map((color, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            backgroundColor: color,
                            border: "1.5px solid #ccc",
                          }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Tooltip>
              </Grid>
            ))}
          </Grid>

          <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, mt: 4, background: '#f7f9fa' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Choose a Font for Welcome Screen
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
              {fonts.map((font) => (
                <Button
                  key={font.id}
                  variant={welcomeFont === font.css ? "contained" : "outlined"}
                  onClick={() => setWelcomeFont(font.css)}
                  sx={{
                    fontFamily: font.css,
                    textTransform: "none",
                    borderColor: welcomeFont === font.css ? "#0070f3" : "#ccc",
                    bgcolor: welcomeFont === font.css ? "#e3f2fd" : "#fff",
                    color: welcomeFont === font.css ? "#0070f3" : "#222",
                    fontWeight: 600,
                    fontSize: 16,
                    px: 2.5,
                    py: 1.2,
                    borderRadius: 2,
                    boxShadow: welcomeFont === font.css ? 2 : 0,
                  }}
                >
                  {font.name}
                </Button>
              ))}
            </Box>
          </Paper>

          {/* Live Demo Preview */}
          <Box
            sx={{
              mt: 5,
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              backgroundColor: selectedPalette.colors.background,
              color: selectedPalette.colors.text,
              border: `1.5px solid ${selectedPalette.colors.primary}`,
              boxShadow: `0 4px 24px ${selectedPalette.colors.secondary}30`,
              textAlign: "center",
              maxWidth: 420,
              mx: "auto",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: welcomeFont,
                color: selectedPalette.colors.text,
                mb: 1,
                fontWeight: 700,
                fontSize: { xs: 22, sm: 28 },
                letterSpacing: 1.5,
              }}
            >
              {weddingData.groom_name} & {weddingData.bride_name}
            </Typography>

            <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2, fontSize: { xs: 15, sm: 17 } }}>
              {weddingData.wedding_date}
            </Typography>
            <Divider
              sx={{
                width: "100px",
                height: "3px",
                background: selectedPalette.colors.primary,
                mx: "auto",
                mb: 2,
                borderRadius: "3px",
              }}
            />
            <Button
              sx={{
                backgroundColor: selectedPalette.colors.primary,
                color: "#fff",
                px: 4,
                py: 1.2,
                borderRadius: "30px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: { xs: 13, sm: 15 },
                boxShadow: 2,
                mt: 1,
                '&:hover': {
                  backgroundColor: selectedPalette.colors.secondary,
                },
              }}
            >
              View Invitation
            </Button>
          </Box>
        </Paper>
        {/* Fonts Section */}
        <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, mt: 2, mb: 4, background: '#fafbfc' }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Choose a Font
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
              {fonts.map((font) => (
                <Button
                  key={font.id}
                  variant={selectedFont === font.css ? "contained" : "outlined"}
                  onClick={() => setSelectedFont(font.css)}
                  sx={{
                    fontFamily: font.css,
                    textTransform: "none",
                    borderColor: selectedFont === font.css ? "#0070f3" : "#ccc",
                    bgcolor: selectedFont === font.css ? "#e3f2fd" : "#fff",
                    color: selectedFont === font.css ? "#0070f3" : "#222",
                    fontWeight: 600,
                    fontSize: 16,
                    px: 2.5,
                    py: 1.2,
                    borderRadius: 2,
                    boxShadow: selectedFont === font.css ? 2 : 0,
                  }}
                >
                  {font.name}
                </Button>
              ))}
            </Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Live Preview
            </Typography>

            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                border: "1.5px solid #ccc",
                borderRadius: 3,
                fontFamily: selectedFont,
                maxWidth: 420,
                mx: "auto",
                boxShadow: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: selectedFont,
                  color: selectedPalette.colors.text,
                  mb: 1,
                  fontWeight: 700,
                  fontSize: { xs: 20, sm: 26 },
                  letterSpacing: 1.2,
                }}
              >
                Joseph & Lina
                <br />
                <span style={{ fontSize: isMobile ? "1rem" : "1.2rem" }}>
                  “Therefore what God has joined together, let no one separate.”
                  – Mark 10:9
                </span>
              </Typography>
            </Paper>
          </Box>
        </Paper>

        {/* Wedding Verses Section */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            bgcolor: theme.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
            border: `1.5px solid ${theme.mode === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0"}`,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.mode === "dark" ? "#fff" : "#1a1a1a",
              mb: 2,
              fontSize: { xs: 20, sm: 24 },
            }}
          >
            Wedding Verses
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {isMobile ? (
            <Box>
              {verses.map((verse) => (
                <Accordion
                  key={verse.id}
                  expanded={selectedVerseId === verse.id}
                  onChange={() => setSelectedVerseId(verse.id)}
                  sx={{
                    mb: 1.5,
                    borderRadius: 2,
                    boxShadow: selectedVerseId === verse.id ? 2 : 0,
                    bgcolor:
                      selectedVerseId === verse.id
                        ? theme.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "#d1e7fd"
                        : theme.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "#f8f9fa",
                    border: `2px solid ${
                      selectedVerseId === verse.id
                        ? theme.mode === "dark"
                          ? "#66b3ff"
                          : "#1976d2"
                        : theme.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "#e0e0e0"
                    }`,
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.mode === "dark" ? "#fff" : "#1a1a1a",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      {verse.reference}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.mode === "dark" ? "#fff" : "#333",
                        fontSize: 15,
                        mb: 1,
                      }}
                    >
                      {verse.verse}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {verses.map((verse) => (
                <Paper
                  key={verse.id}
                  elevation={selectedVerseId === verse.id ? 2 : 0}
                  onClick={() => setSelectedVerseId(verse.id)}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor:
                      selectedVerseId === verse.id
                        ? theme.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "#d1e7fd"
                        : theme.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "#f8f9fa",
                    border: `2px solid ${
                      selectedVerseId === verse.id
                        ? theme.mode === "dark"
                          ? "#66b3ff"
                          : "#1976d2"
                        : theme.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "#e0e0e0"
                    }`,
                    cursor: "pointer",
                    transition: "background-color 0.3s, border-color 0.3s",
                    userSelect: "none",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.mode === "dark" ? "#fff" : "#1a1a1a",
                      mb: 1,
                      fontSize: 17,
                      fontWeight: 600,
                    }}
                  >
                    {verse.verse}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.mode === "dark" ? "#999" : "#666",
                    }}
                  >
                    {verse.reference}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Paper>
        {/* Save Button - sticky on mobile */}
        <Box sx={{ textAlign: "center", my: 4, position: { xs: "sticky", sm: "static" }, bottom: { xs: 0, sm: "auto" }, zIndex: 10, bgcolor: { xs: "#fafbfc", sm: "transparent" }, py: { xs: 2, sm: 0 } }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSavePreferences}
            sx={{ px: 4, py: 1.5, borderRadius: "30px", fontWeight: 600, fontSize: 17, boxShadow: 2 }}
          >
            Save Preferences
          </Button>
        </Box>
      </Box>
    </DashboardClientLayout>
  );
}
