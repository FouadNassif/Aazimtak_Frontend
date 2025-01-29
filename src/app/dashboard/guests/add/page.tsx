"use client";

import { useAuth } from "@/context/AuthProvider";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import {
  Box,
  TextField,
  Link,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { addGuest } from "@/actions/clientsDashboard";

export default function Guests() {
  const { user } = useAuth();
  const router = useRouter();

  const [guestName, setGuestName] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [numberOfKids, setNumberOfKids] = useState<number>(0);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (guestName === "" || numberOfPeople === 0) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [guestName, numberOfPeople]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!user?.id) {
      showError("User ID is undefined. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const result = await addGuest({
        userId: user.id,
        guestName,
        numberOfPeople,
        numberOfKids,
      });

      if (result?.guest_Added) {
        showSuccess("Guest Added Successfully!");
        router.push("/dashboard/guests");
      }
    } catch (err) {
      showError(
        err.response?.data?.error ??
          "Failed to add guest. Check if the name already exists."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardClientLayout>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            backgroundColor: "#F1F5F9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "40px",
              width: "100%",
              maxWidth: "480px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Link href="/" underline="none">
                <Avatar
                  alt="Aazimtak Logo"
                  src="/assets/img/Alogo.png"
                  sx={{ width: 50, height: 50 }}
                />
              </Link>
              <Typography variant="h5" sx={{ marginLeft: 2, fontWeight: 700 }}>
                AAZIMTAK
              </Typography>
            </Box>

            <Typography
              variant="h6"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              Add New Guest
            </Typography>

            <TextField
              label="Guest Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#F4F6F8",
                },
                marginBottom: "20px",
              }}
            />

            <TextField
              label="Number of People"
              type="number"
              value={numberOfPeople}
              onChange={(e) => {
                setNumberOfPeople(Number(e.target.value));
                e.target.value = numberOfPeople;
              }}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#F4F6F8",
                },
                marginBottom: "20px",
              }}
            />

            <TextField
              label="Number of Kids"
              type="number"
              value={numberOfKids}
              onChange={(e) => {
                setNumberOfKids(Number(e.target.value));
                e.target.value = numberOfKids;
              }}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#F4F6F8",
                },
                marginBottom: "20px",
              }}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#00BFFF",
                "&:hover": { backgroundColor: "#0099CC" },
                padding: "12px",
                fontWeight: 600,
                textTransform: "none",
              }}
              disabled={disableSubmit}
            >
              {loading ? "Loading..." : "Add Guest"}
            </Button>
          </Box>
        </Box>
      </form>
    </DashboardClientLayout>
  );
}
