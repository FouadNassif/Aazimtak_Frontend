import { Box } from "@mui/material";
import React from "react";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Use Intl.DateTimeFormat to format the date
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const DateDisplay = ({ date }: { date: string }) => {
  return (
    <Box marginY={5}>
      <p>{formatDate(date)}</p>
    </Box>
  );
};

export default DateDisplay;
