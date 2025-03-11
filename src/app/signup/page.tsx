"use client";
import { signup } from "@/actions/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/context/AuthProvider";
import Input from "@/components/form/input";
import {
  Box,
  Link,
  Avatar,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function SignUp() {
  const router = useRouter();
  const { isAuth } = useAuth();
  const { showError, showSuccess } = useToast();

  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  useEffect(() => {
    setDisableSubmit(!(username && password && email && confirmPassword && phonenumber));
  }, [username, password, email, confirmPassword, phonenumber]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const result = await signup({ username, password, email, phonenumber });
      if (result) {
        showSuccess("Successfully signed up!");
        router.push("/");
      }
    } catch (err) {
      showError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111927",
        backgroundImage:
            "radial-gradient(at 47% 33%, hsl(218.49, 62%, 33%) 0, transparent 59%), radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0, transparent 55%)",
      }}
    >
      <Box
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 2, color: "#FFF", borderColor: "#FFF" }}
        >
          Back
        </Button>

        <Avatar src="/assets/img/Alogo.png" sx={{ width: 70, height: 70, margin: "auto" }} />
        <Typography variant="h5" fontWeight={700} color="#FFF" mt={2}>
          AAZIMTAK
        </Typography>

        <Box mt={3} display="flex" flexDirection="column" gap={2}>
          <Input label="Username" value={username} onChange={(e) => setName(e.target.value)} type="text" />
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <Input label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />

          <PhoneInput
            placeholder="Enter phone number"
            value={phonenumber}
            onChange={setPhoneNumber}
            defaultCountry="LB"
            international
            countryCallingCodeEditable={false}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "white",
              border: "none",
            }}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "#00BFFF",
              "&:hover": { backgroundColor: "#0099CC" },
              padding: "10px",
            }}
            disabled={disableSubmit || loading}
            onClick={handleSubmit}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>
        </Box>

        <Typography mt={2} color="whitesmoke" fontSize={"0.875rem"}>
          By signing up, you agree to our {" "}
          <Link href="/terms" color="#00BFFF">Terms and Services</Link>
        </Typography>

        <Typography mt={1} color="whitesmoke" fontSize={"0.875rem"}>
          Already have an account? {" "}
          <Link href="/login" color="#00BFFF">Log In</Link>
        </Typography>
      </Box>
    </Box>
  );
}