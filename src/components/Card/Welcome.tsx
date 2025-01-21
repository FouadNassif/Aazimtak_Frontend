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
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", // Soft gradient background
        padding: "20px",
      }}
    >
      {/* Wedding Names */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: "bold",
          color: "#2c3e50",
          letterSpacing: "1px",
          marginBottom: "10px",
        }}
      >
        {wedding.groom_name} & {wedding.bride_name}
      </Typography>

      {/* Wedding Date */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Playfair Display', serif",
          color: "#34495e",
          marginBottom: "30px",
        }}
      >
        {new Date(weddingDetails.wedding_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>

      {/* Decorative Line */}
      <Box
        sx={{
          width: "100px",
          height: "3px",
          backgroundColor: "#8e44ad",
          borderRadius: "5px",
          margin: "20px 0",
        }}
      ></Box>

      {/* Instructional Text */}
      <Typography
        variant="body1"
        sx={{
          fontFamily: "'Roboto', sans-serif",
          color: "#7f8c8d",
          marginBottom: "40px",
        }}
      >
        Tap the button below to start celebrating with us!
      </Typography>

      {/* Start Button */}
      <Button
        sx={{
          backgroundColor: "#8e44ad",
          color: "#fff",
          padding: "15px 40px",
          fontSize: "16px",
          borderRadius: "30px",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "bold",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#732d91",
          },
        }}
        onClick={() => setReady(true)}
      >
        Tap to Start
      </Button>
    </Box>
  );
}
