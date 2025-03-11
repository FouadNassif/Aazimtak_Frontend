"use client";
import { login } from "@/actions/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/context/AuthProvider";
import Input from "@/components/form/input";
import {
  Box,
  TextField,
  Link,
  Avatar,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();

  const [nameEmail, setNameEmail] = useState("");
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
    if (nameEmail && password) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [nameEmail, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await login({ nameEmail, password });
      console.log("wwwww");
      console.log(result);
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
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "400px",
            minWidth: "300px", // Make it responsive
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              alignSelf: "flex-start",
              color: "#00BFFF",
              borderColor: "#00BFFF",
              "&:hover": { borderColor: "#0099CC", backgroundColor: "#0099CC" },
            }}
            onClick={() => router.back()}
          >
            Back
          </Button>

          <Box display="flex" alignItems="center" justifyContent="center">
            <Link href="/" underline="none">
              <Avatar
                alt="Aazimtak Logo"
                src="/assets/img/Alogo.png"
                sx={{
                  width: 50,
                  height: 50,
                  marginRight: 2,
                  border: "2px solid #00BFFF",
                }}
              />
            </Link>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#00BFFF",
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              AAZIMTAK
            </Typography>
          </Box>

          <Input label="Username or Email" value={nameEmail} onChange={(e) => setNameEmail(e.target.value)} type="text"/>
          <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "#00BFFF",
              "&:hover": { backgroundColor: "#0099CC" },
              height: "45px",
            }}
            disabled={disableSubmit}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography
            sx={{
              textAlign: "center",
              color: "#CCC",
              fontSize: "0.875rem",
            }}
          >
            By logging in, you agree to our{" "}
            <Link href="/terms" sx={{ color: "#00BFFF" }}>
              Terms and Services
            </Link>
          </Typography>

          <Typography sx={{
              textAlign: "center",
              color: "#CCC",
              fontSize: "0.875rem",
            }}>
            Don't have an account?{" "}
            <Link href="/signup" sx={{ color: "#00BFFF" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </form>
  );
}
