"use client";
import { checkAuth, login } from "@/actions/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/context/AuthProvider";
import {
  Box,
  TextField,
  Link,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const { isAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  useEffect(() => {
    if (username && password) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [username, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await login({ username, password });
      if (result) {
        setLoading(false);
        showSuccess("Successfully logged in!");
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      showError("Failed to log in. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          backgroundColor: "#111927",
          backgroundImage:
            "radial-gradient(at 47% 33%, hsl(218.49, 62%, 33%) 0, transparent 59%), radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0, transparent 55%)",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFF",
        }}
      >
        <Box
          sx={{
            backdropFilter: "blur(10px) saturate(200%)",
            backgroundColor: "rgba(17, 25, 40, 0.9)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "400px",
          }}
        >
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>

          <Box display="flex" alignItems="center">
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

          <TextField
            label="Username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "#00BFFF",
              "&:hover": { backgroundColor: "#0099CC" },
            }}
            disabled={disableSubmit}
          >
            {loading ? "Loading..." : "Login In"}
          </Button>

          <Typography sx={{ textAlign: "center", color: "#CCC" }}>
            By logging in, you agree to our{" "}
            <Link href="/terms" sx={{ color: "#00BFFF" }}>
              Terms and Services
            </Link>
          </Typography>
        </Box>
      </Box>
    </form>
  );
}
