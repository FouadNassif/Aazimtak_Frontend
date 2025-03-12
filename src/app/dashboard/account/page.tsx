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
import { editAccount } from "@/actions/clientsDashboard";
import { logout } from "@/actions/auth";
import { useTheme } from "@mui/material/styles";

export default function AccountSettings() {
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const [username, setUsername] = useState<string>(user?.username || "");
  const [old_password, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (username || (old_password && password && confirmPassword)) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [username, old_password, password, confirmPassword]);

  async function successLogout() {
    await logout();
    router.push("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        showError("Passwords do not match. Please try again.");
        setLoading(false);
        return;
      } else if (old_password === password && old_password !== "") {
        showError("New password cannot be the same as the old password.");
        setLoading(false);
        return;
      }

      const result = await editAccount({
        userId: user.id,
        username,
        old_password,
        password,
      });

      if (result?.status) {
        if (result?.username) {
          showSuccess("Username updated successfully!");
          setLoading(false);
        } else if (result?.password) {
          showSuccess("Password updated successfully!");
          setLoading(false);
          successLogout();
        }
      } else {
        showError(result?.message || "Failed to update account. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      showError(err.response?.data?.error || "Failed to change settings!");
    }
  };

  return (
    <DashboardClientLayout>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            padding: "20px",
            backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#F1F5F9",
          }}
        >
          <Box
            sx={{
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              padding: "40px",
              width: "100%",
              maxWidth: "480px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#fff",
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Link href="/" underline="none">
                <Avatar alt="Aazimtak Logo" src="/assets/img/Alogo.png" sx={{ width: 50, height: 50 }} />
              </Link>
              <Typography variant="h5" sx={{ marginLeft: 2, fontWeight: 700 }}>
                AAZIMTAK
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: "center" }}>
              Update Account Settings
            </Typography>

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#2E2E2E" : "#F4F6F8",
                borderRadius: "8px",
              }}
            />

            <TextField
              label="Old Password"
              type="password"
              value={old_password}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#2E2E2E" : "#F4F6F8",
                borderRadius: "8px",
              }}
            />

            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#2E2E2E" : "#F4F6F8",
                borderRadius: "8px",
              }}
            />

            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#2E2E2E" : "#F4F6F8",
                borderRadius: "8px",
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
              {loading ? "Loading..." : "Update Settings"}
            </Button>
          </Box>
        </Box>
      </form>
    </DashboardClientLayout>
  );
}
