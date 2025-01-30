import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditModal({ guest, open, onClose, onSave, onDelete }) {
  // State for editable fields
  const [name, setName] = useState(guest.name);
  const [numberOfPeople, setNumberOfPeople] = useState(guest.numberOfPeople);
  const [numberOfKids, setNumberOfKids] = useState(guest.numberOfKids);

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handle changes in the input fields
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberOfPeopleChange = (event) => {
    setNumberOfPeople(event.target.value);
  };

  const handleNumberOfKidsChange = (event) => {
    setNumberOfKids(event.target.value);
  };

  // Handle save action
  const handleSave = () => {
    const updatedGuest = {
      ...guest,
      name,
      numberOfPeople,
      numberOfKids,
    };
    onSave(updatedGuest); // Pass the updated guest data to the parent component
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    onDelete(guest.id);
    setIsDeleteModalOpen(false); // Close the delete confirmation modal
    onClose();
  };

  return (
    <>
      {/* Edit Modal */}
      <Backdrop open={open} sx={{ zIndex: 10, backdropFilter: "blur(8px)" }}>
        <Card
          sx={{
            width: 400,
            bgcolor: "#fff",
            boxShadow: 6,
            borderRadius: 3,
            padding: 3,
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Edit Guest
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={handleNameChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Number Of People"
              name="number_of_people"
              value={numberOfPeople}
              onChange={handleNumberOfPeopleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Number Of Kids"
              name="number_of_kids"
              value={numberOfKids}
              onChange={handleNumberOfKidsChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Typography sx={{ mt: 2, fontSize: "14px" }}>
              <strong>Attending:</strong> {guest.attendingStatus}
            </Typography>
            <Typography sx={{ mt: 1, fontSize: "14px" }}>
              <strong>Message:</strong> {guest.message ? guest.message : "None"}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#155a9c" },
              }}
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                color: "red",
                borderColor: "red",
                "&:hover": { borderColor: "darkred" },
              }}
              startIcon={<DeleteIcon />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Guest
            </Button>
          </CardContent>
        </Card>
      </Backdrop>

      {/* Delete Confirmation Modal */}
      <Backdrop
        open={isDeleteModalOpen}
        sx={{ zIndex: 20, backdropFilter: "blur(8px)" }}
      >
        <Card
          sx={{
            width: 400,
            bgcolor: "#fff",
            boxShadow: 6,
            borderRadius: 3,
            padding: 3,
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setIsDeleteModalOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Confirm Deletion
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Are you sure you want to delete <strong>{guest.name}</strong>?
              This action cannot be undone.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "red",
                "&:hover": { bgcolor: "darkred" },
              }}
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </Backdrop>
    </>
  );
}
