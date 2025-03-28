import { Box, Typography } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ color: "red", marginBottom: "20px" }}>
        Error
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "#333", textAlign: "center", marginBottom: "20px" }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
