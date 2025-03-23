"use client";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/context/AuthProvider";
import { getWeddingData, saveWeddingData } from "@/actions/clientsDashboard";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import verses from "@/data/verses";
import Input from "@/components/form/input";

export default function EditWedding() {
  const { user } = useAuth();
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [weddingData, setWeddingData] = useState({
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

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchWeddingData = async () => {
      setLoading(true); // Start loading
      try {
        const weddingDetails = await getWeddingData({ userId: user.id });

        if (weddingDetails) {
          const { wedding, wedding_details } = weddingDetails;

          setWeddingData((prevState) => ({
            ...prevState,
            ...wedding,
            ...wedding_details,
          }));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeddingData();
  }, [user?.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeddingData({ ...weddingData, [name]: value });
  };

  const handleSubmit = async (e) => {
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
      showError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardClientLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#F1F5F9",
        }}
      >
        {loading ? ( // Show loading spinner if data is fetching
          <CircularProgress />
        ) : (
          <Paper
            elevation={3}
            sx={{
              padding: 5,
              borderRadius: 4,
              width: "100%",
              maxWidth: 900,
            }}
          >
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" fontWeight={600} mt={2}>
                Edit Wedding Details
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Groom's Name"
                    name="groom_name"
                    value={weddingData.groom_name}
                    onChange={handleChange}
                    fullWidth
                    required
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
                  />
                </Grid>

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
                  />
                </Grid>

                {[
                  {
                    label: "Ceremony Time",
                    name: "ceremony_time",
                    type: "time",
                  },
                  { label: "Ceremony Place", name: "ceremony_place" },
                  { label: "Ceremony City", name: "ceremony_city" },
                  { label: "Ceremony Maps", name: "ceremony_maps" },
                  { label: "Party Time", name: "party_time", type: "time" },
                  { label: "Party Place", name: "party_place" },
                  { label: "Party City", name: "party_city" },
                  { label: "Party Maps", name: "party_maps" },
                ].map((field, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <TextField
                      label={field.label}
                      type={field.type || "text"}
                      name={field.name}
                      value={(weddingData as any)[field.name]}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                ))}

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Gift Type"
                    name="gift_type"
                    value={weddingData.gift_type}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Gift Details"
                    name="gift_details"
                    value={weddingData.gift_details}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Box mt={4} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ padding: "10px 50px" }}
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          </Paper>
        )}
        <Paper
          elevation={3}
          sx={{
            marginTop: "30px",
            padding: 5,
            borderRadius: 4,
            width: "100%",
            maxWidth: 900,
          }}
        >

          <Box textAlign="center" mb={3}>
            <Typography variant="h4" fontWeight={600} mt={2}>
              Edit Verse
            </Typography>
          </Box>

          <Box sx={{
            display: "flex",
            flexWrap: "wrap",
          }}>
            {verses.map((verse) => (
              <Paper elevation={4} key={verse.id} sx={{padding: 2, width: "100%", marginY: 2}}>
                <Typography sx={{fontSize: "18px"}}>{verse.verse}</Typography>
                <Typography sx={{fontSize: "14px"}}>{verse.reference}</Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Box>
    </DashboardClientLayout>
  );
}
