import React from "react";
import { Typography, Button, Box } from "@mui/material";

interface WeddingDetail {
  type: string;
  time: string;
  place: string;
  city: string;
  maps: string;
}

interface Props {
  weddingDetail: WeddingDetail;
}

const WeddingDetails: React.FC<Props> = ({ weddingDetail }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
        mb: 8,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        {weddingDetail.type}
      </Typography>

      <img
        src="/assets/svg/clock.svg"
        alt="Clock Icon"
        style={{ width: "3rem" }}
      />
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {weddingDetail.time}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Beirut Time (GMT+3)
      </Typography>

      <img
        src="/assets/svg/location.svg"
        alt="Location Icon"
        style={{ width: "2.5rem" }}
      />
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {weddingDetail.place}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {weddingDetail.city}
      </Typography>

      <Button
        href={weddingDetail.maps}
        variant="outlined"
        sx={{
          padding: "0.5rem 1.5rem",
          borderColor: "#000",
          color: "#000",
          "&:hover": { borderColor: "#333" },
          mb: 5,
        }}
      >
        LOCATION MAP
      </Button>
    </Box>
  );
};

export default WeddingDetails;
