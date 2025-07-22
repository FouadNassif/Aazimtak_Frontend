"use client";
export const dynamic = "force-dynamic";

import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/context/AuthProvider";
import { getWeddingData, saveWeddingData } from "@/actions/clientsDashboard";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import { getWeddingDataType } from "@/types/wedding";
import { useTheme as useCustomTheme } from "@/context/theme-context";

export default function EditWedding() {
  const { user } = useAuth();
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const theme = useCustomTheme();

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

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    setIsAuthenticated(true);
  }, [user, router]);

  useEffect(() => {
    const fetchWeddingData = async () => {
      if (!isAuthenticated || !user?.id) return;

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
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingData();
  }, [isAuthenticated, user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeddingData({ ...weddingData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await saveWeddingData({
        userId: user.id,
        weddingData,
      });
      if (results.status) {
        router.refresh();
        showSuccess("Wedding details saved successfully!");
      }
    } catch (error) {
      console.error("Error saving wedding data:", error);
      showError("Failed to save wedding data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: theme.mode === "dark" ? "#fff" : "#1a1a1a",
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {children}
    </Box>
  );

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <DashboardClientLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 64px)", // Adjust based on your header height
          }}
        >
          <CircularProgress />
        </Box>
      </DashboardClientLayout>
    );
  }

  return (
    <DashboardClientLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: theme.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
            border: `1px solid ${
              theme.mode === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0"
            }`,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: theme.mode === "dark" ? "#fff" : "#1a1a1a",
              mb: 1,
            }}
          >
            Wedding Details
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.mode === "dark" ? "#999" : "#666",
              mb: 4,
            }}
          >
            Manage your wedding information and preferences
          </Typography>

          <form onSubmit={handleSubmit}>
            {renderSection(
              "Couple Information",
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Groom's Name"
                    name="groom_name"
                    value={weddingData.groom_name}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Groom's Last Name"
                    name="groom_lastname"
                    value={weddingData.groom_lastname}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Bride's Name"
                    name="bride_name"
                    value={weddingData.bride_name}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Bride's Last Name"
                    name="bride_lastname"
                    value={weddingData.bride_lastname}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {renderSection(
              "Wedding Date",
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Wedding Date"
                    type="date"
                    name="wedding_date"
                    value={weddingData.wedding_date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {renderSection(
              "Ceremony Details",
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Ceremony Time"
                    type="time"
                    name="ceremony_time"
                    value={weddingData.ceremony_time}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Ceremony Place"
                    name="ceremony_place"
                    value={weddingData.ceremony_place}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Ceremony City"
                    name="ceremony_city"
                    value={weddingData.ceremony_city}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Ceremony Maps Link"
                    name="ceremony_maps"
                    value={weddingData.ceremony_maps}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {renderSection(
              "Reception Details",
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Reception Time"
                    type="time"
                    name="party_time"
                    value={weddingData.party_time}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Reception Place"
                    name="party_place"
                    value={weddingData.party_place}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Reception City"
                    name="party_city"
                    value={weddingData.party_city}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Reception Maps Link"
                    name="party_maps"
                    value={weddingData.party_maps}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {renderSection(
              "Gift Registry",
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Gift Type"
                    name="gift_type"
                    value={weddingData.gift_type}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Gift Details"
                    name="gift_details"
                    value={weddingData.gift_details}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color:
                          theme.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                        "&.Mui-focused": {
                          color: theme.mode === "dark" ? "#fff" : "#000",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}

            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </DashboardClientLayout>
  );
}
