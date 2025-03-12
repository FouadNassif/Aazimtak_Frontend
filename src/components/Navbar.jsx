"use client";
import { logout } from "@/actions/auth";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Link,
  Container,
} from "@mui/material";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuth, user } = useAuth();
  const { showError, showSuccess } = useToast();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <AppBar
      elevation={scrolled ? 2 : 0}
      sx={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        transition: "all 0.3s ease-in-out",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display="flex" alignItems="center">
              <Link
                href="/"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Avatar
                  alt="Aazimtak Logo"
                  src="/assets/img/Alogo.png"
                  sx={{
                    width: { xs: 20, sm: 45 },
                    width: { xs: 20, sm: 45 },
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: 0, sm: 30 },
                    ml: 1.5,
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #2a5298, #1976d2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AAZIMTAK
                </Typography>
              </Link>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              {["Home", "Pricing"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : "/pricing"}
                  sx={{
                    color: scrolled ? "#2a5298" : "#fff",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    position: "relative",
                    padding: {xs: "0px", sm: "8px 16px"},
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "#1976d2",
                      "&::after": {
                        width: "100%",
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "0%",
                      height: "2px",
                      backgroundColor: "#1976d2",
                      transition: "width 0.2s ease-in-out",
                    },
                  }}
                >
                  {item}
                </Link>
              ))}

              {isAuth ? (
                <>
                  <Link
                    href={
                      user.role === "admin" ? "/admin/dashboard" : "/dashboard"
                    }
                    sx={{
                      color: scrolled ? "#2a5298" : "#fff",
                      fontWeight: 600,
                      textDecoration: "none",
                      padding: "8px 16px",
                      "&:hover": { color: "#1976d2" },
                    }}
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{
                      backgroundImage:
                        "linear-gradient(45deg, #2a5298, #1976d2)",
                      color: "white",
                      px: 3,
                      py: 1,
                      borderRadius: "25px",
                      textTransform: "none",
                      fontWeight: 600,
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                      },
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  href="/login"
                  variant="contained"
                  sx={{
                    backgroundImage: "linear-gradient(45deg, #2a5298, #1976d2)",
                    color: "white",
                    px: 3,
                    py: 1,
                    borderRadius: "25px",
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    },
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
