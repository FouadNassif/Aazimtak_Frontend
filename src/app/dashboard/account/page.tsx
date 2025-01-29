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

export default function Guests() {
  const { user } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState<string>(user?.username || "");
  const [old_password, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comfirmPassword, setComfirmPassowrd] = useState<string>("");

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (username || (old_password && password && comfirmPassword)) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [username, old_password, password, comfirmPassword, router]);

  async function sucesslogout() {
    await logout();
    router.push("/");
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (password !== comfirmPassword) {
        showError("Passwords do not match. Please try again.");
        setLoading(false);
        return;
      } else if (old_password === password && old_password != "") {
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
          sucesslogout();
        }
      } else {
        showError(
          result?.message || "Failed to update account. Please try again."
        );
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.response?.data?.error) {
        showError(err.response.data.error);
      } else {
        showError("Failed to change settings!");
      }
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
              Update Account Settings
            </Typography>

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              label="Old Password"
              type="password"
              value={old_password}
              onChange={(e) => setOldPassword(e.target.value)}
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
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              label="Confirm Password"
              type="password"
              value={comfirmPassword}
              onChange={(e) => setComfirmPassowrd(e.target.value)}
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
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </form>
    </DashboardClientLayout>
  );
}
