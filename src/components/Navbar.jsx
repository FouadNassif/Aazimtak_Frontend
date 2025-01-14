"use client";
import { logout } from "@/actions/auth";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Link,
} from "@mui/material";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuth, user } = useAuth();
  const { showError, showSuccess } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("✅ Successfully logged out!");
      router.push("/");
    } catch (err) {
      showError("🚨 Failed to log out. Please try again.");
    }
  };

  return (
    <AppBar sx={{ backgroundColor: "white" }} position="sticky">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center" className="flex-1">
            <Link href="/">
              <Avatar
                alt="Aazimtak Logo"
                src="/assets/img/Alogo.png"
                sx={{ width: 40 }}
              />
            </Link>
            <Typography
              variant="h6"
              sx={{
                marginLeft: 1,
                fontWeight: 700,
                color: "#333",
              }}
            >
              AAZIMTAK
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="space-x-4">
            <Link
              href="/"
              sx={{
                color: "2a5298",
                fontWeight: "800",
                cursor: "pointer",
                padding: "10px 20px",
              }}
              underline="none"
            >
              Home
            </Link>

            <Link
              href="/pricing"
              sx={{
                color: "2a5298",
                fontWeight: "800",
                cursor: "pointer",
                padding: "10px 20px",
              }}
              underline="none"
            >
              Pricing & Preview
            </Link>

            {isAuth ? (
              <>
                <Link
                  href="/dashboard"
                  sx={{
                    color: "2a5298",
                    fontWeight: "800",
                    cursor: "pointer",
                    padding: "10px 20px",
                  }}
                  underline="none"
                >
                  Dashboard
                </Link>
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: "#00BFFF",
                    "&:hover": { backgroundColor: "#0099CC" },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                sx={{
                  color: "2a5298",
                  fontWeight: "800",
                  cursor: "pointer",
                  padding: "10px 20px",
                }}
                underline="none"
              >
                Login
              </Link>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
