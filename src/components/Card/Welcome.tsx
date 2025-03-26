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
        background: "linear-gradient(135deg, #f3e5ab, #f8f5f2)", // Soft gradient background
        padding: "20px",
      }}
    >
      {/* Wedding Invitation Card */}
      <Box
        sx={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.2)", // Softer shadow
          maxWidth: "450px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Wedding Names */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bold",
            color: "#2c3e50",
            letterSpacing: "2px",
            marginBottom: "12px",
            textTransform: "uppercase",
            lineHeight: "1.4",
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
            marginBottom: "30px",
            fontSize: "16px",
            fontStyle: "italic",
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
            width: "80px",
            height: "2px",
            backgroundColor: "#d4a373", // Soft gold color
            margin: "20px auto",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow under the line
          }}
        ></Box>

        {/* Elegant Button */}
        <Button
          sx={{
            backgroundColor: "#d4a373", // Soft warm gold
            color: "#fff",
            padding: "14px 36px",
            fontSize: "16px",
            borderRadius: "30px",
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            boxShadow: "0px 8px 20px rgba(212, 163, 115, 0.4)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#b5835a",
              transform: "scale(1.05)",
              boxShadow: "0px 12px 30px rgba(212, 163, 115, 0.5)",
            },
          }}
          onClick={() => setReady(true)}
        >
          View Invitation
        </Button>
      </Box>

      {/* Optional Decorative Background */}
      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background: "url('/wedding-background.jpg') no-repeat center center", // Optional decorative background
          backgroundSize: "cover",
          opacity: "0.1",
          zIndex: 1,
        }}
      ></Box>
    </Box>
  );
}
