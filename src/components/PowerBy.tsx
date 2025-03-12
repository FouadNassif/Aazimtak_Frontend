import React from "react";
import { Box, Link, Typography } from "@mui/material";

const PoweredBy = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={7}
      mb={10}
      width="100%"
    >
      <Typography variant="body1" color="textSecondary" align="center" mr={1}>
        Powered by
      </Typography>
      <Link href="/">
      <Typography
        variant="body1"
        color="primary"
        display="flex"
        alignItems="center"
        sx={{
          textDecoration: "none"
        }}
      >
        <img
          src="/assets/img/Alogo.png"
          alt="AAZIMTAK Logo"
          style={{ width: "40px", marginRight: "8px" }}
        />
        AAZIMTAK
      </Typography>
      </Link>
    </Box>
  );
};

export default PoweredBy;
