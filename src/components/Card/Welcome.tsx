import { Box, Button, Typography } from "@mui/material";

export default function Card({ wedding, weddingDetails, setReady }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: "#f8f5f2", // Soft, warm background
        padding: "20px",
      }}
    >
      {/* Wedding Invitation Card */}
      <Box
        sx={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {/* Wedding Names */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bold",
            color: "#2c3e50",
            letterSpacing: "1px",
            marginBottom: "8px",
          }}
        >
          {wedding.groom_name} & {wedding.bride_name}
        </Typography>

        {/* Wedding Date */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          {new Date(weddingDetails.wedding_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>

        {/* Soft Decorative Line */}
        <Box
          sx={{
            width: "60px",
            height: "2px",
            backgroundColor: "#d4a373",
            margin: "10px auto 20px",
            borderRadius: "5px",
          }}
        ></Box>

        {/* Elegant Button */}
        <Button
          sx={{
            backgroundColor: "#d4a373", // Soft warm gold
            color: "#fff",
            padding: "12px 32px",
            fontSize: "14px",
            borderRadius: "30px",
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            boxShadow: "0px 4px 12px rgba(212, 163, 115, 0.3)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#b5835a",
              transform: "scale(1.05)",
              boxShadow: "0px 6px 18px rgba(212, 163, 115, 0.5)",
            },
          }}
          onClick={() => setReady(true)}
        >
          View Invitation
        </Button>
      </Box>
    </Box>
  );
}
