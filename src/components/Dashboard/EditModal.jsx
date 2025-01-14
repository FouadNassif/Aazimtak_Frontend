import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

export default function EditModal({
  guestName,
  numberOfPeople,
  numberOfKids,
  attending,
  message
}) {
  return (
    <Box>
      <TextField
        label="Name"
        name="name"
        value={guestName}
        onChange={null}
        fullWidth
        required
      />
      <TextField
        label="Number Of People"
        name="number_of_people"
        value={numberOfPeople}
        onChange={null}
        fullWidth
        required
      />

      <TextField
        label="Number Of Kids"
        name="number_of_kids"
        value={numberOfKids}
        onChange={null}
        fullWidth
        required
      />

      <Typography>Attending: {attending}</Typography>
      <Typography>Message: {message}</Typography>
    </Box>
  );
}
