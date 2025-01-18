import { Box, Button, Typography } from "@mui/material";

export default function Card({ wedding, weddingDetails, setReady }) {
  return (
    <>
      {/* Top Text */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Playfair Display', serif", // Classy font
            fontWeight: 700,
            color: "#333", // Dark text
          }}
        >
          {wedding.groom_name} & {wedding.bride_name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "'Playfair Display', serif",
            color: "#666", // Subtle gray for secondary text
            marginTop: "10px",
          }}
        >
          {weddingDetails.wedding_date}
        </Typography>
      </Box>

      {/* Bottom Button */}
      <Button
        sx={{
          position: "absolute",
          bottom: "30px",
          backgroundColor: "transparent",
          color: "white",
          border: "2px solid white",
          padding: "10px 30px",
          fontSize: "18px",
          borderRadius: "25px",
          textTransform: "uppercase",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "500",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => setReady(true)}
      >
        TAP TO START
      </Button>
    </>
  );
}
