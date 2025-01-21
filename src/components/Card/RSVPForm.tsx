import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { setAttendance } from "@/actions/wedding";
import { useToast } from "@/hooks/useToast";

interface Guest {
  name: string;
  number_of_people: number;
  number_of_kids: number;
}

interface Props {
  guest: Guest;
  date: string;
}

const RSVPForm: React.FC<Props> = ({ guest, date }) => {
  const { showSuccess, showError } = useToast();
  const [attending, setAttending] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [replyByDate, setReplyByDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const targetDate = new Date(date);
    targetDate.setDate(targetDate.getDate() - 14);

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(targetDate);

    setReplyByDate(formattedDate);
  }, [date]);

  const handleAttendingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAttending(event.target.value as string);
  };

  const handleMessageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMessage(event.target.value as string);
  };

  const handleSubmit = async () => {
    if (!attending) {
      showError("Please select your attendance status.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await setAttendance({
        guest_name: guest.name,
        attending: attending,
        message: message,
      });
      if (result) {
        showSuccess("Thank you! Your RSVP has been submitted successfully.");
      }
    } catch (err) {
      showError("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
        mb: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 600, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
            Be Our Guest
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            Please reply before {replyByDate}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Number of Persons:
              </Typography>
              <Typography variant="body1">{guest.number_of_people}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Number of Kids:
              </Typography>
              <Typography variant="body1">{guest.number_of_kids}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
            {guest.name}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Are You Attending?
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="attending-select-label">Select</InputLabel>
            <Select
              labelId="attending-select-label"
              value={attending}
              onChange={handleAttendingChange}
              label="Are You Attending?"
              sx={{ fontSize: "1rem" }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="attending">Yes, Attending</MenuItem>
              <MenuItem value="not attending">Not Attending</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Share Your Love and Wishes
          </Typography>

          <TextField
            id="outlined-multiline-flexible"
            label="Write a Message (Optional)"
            multiline
            maxRows={4}
            value={message}
            onChange={handleMessageChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                textTransform: "none",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "RSVP"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RSVPForm;
