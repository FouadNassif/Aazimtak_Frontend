import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useState, useCallback } from "react";

interface GuestRow {
  id: string;
  name: string;
  weddingLink: string;
  attendingStatus: string;
  numberOfPeople: number;
  numberOfKids: number;
  message?: string;
  edit: string;
}

interface EditModalProps {
  guest: GuestRow;
  open: boolean;
  onClose: () => void;
  onSave: (guest: GuestRow) => void;
  onDelete: (guestId: string) => void;
}

export default function EditModal({
  guest,
  open,
  onClose,
  onSave,
  onDelete,
}: EditModalProps) {
  const [editedGuest, setEditedGuest] = useState<GuestRow>(guest);

  const handleChange = useCallback((field: keyof GuestRow, value: string | number) => {
    setEditedGuest((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    onSave(editedGuest);
  }, [editedGuest, onSave]);

  const handleDelete = useCallback(() => {
    onDelete(guest.id);
  }, [guest.id, onDelete]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Edit Guest
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            label="Guest Name"
            value={editedGuest.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.6)',
                '&.Mui-focused': {
                  color: '#000',
                },
              },
            }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Number of People"
              type="number"
              value={editedGuest.numberOfPeople}
              onChange={(e) => handleChange('numberOfPeople', parseInt(e.target.value))}
              fullWidth
              required
              inputProps={{ min: 1 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-focused': {
                    color: '#000',
                  },
                },
              }}
            />
            <TextField
              label="Number of Kids"
              type="number"
              value={editedGuest.numberOfKids}
              onChange={(e) => handleChange('numberOfKids', parseInt(e.target.value))}
              fullWidth
              required
              inputProps={{ min: 0 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-focused': {
                    color: '#000',
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Wedding Link
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                wordBreak: 'break-all',
              }}
            >
              {guest.weddingLink}
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textTransform: 'capitalize',
              }}
            >
              {guest.attendingStatus}
            </Typography>
          </Box>
          {editedGuest.message && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ 
                mb: 1 
              }}>
                Guest Message:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  bgcolor: '#f5f5f5',
                  p: 2,
                  borderRadius: 1,
                  whiteSpace: 'pre-wrap'
                }}
              >
                {editedGuest.message}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={handleDelete}
          variant="outlined"
          color="error"
          sx={{ 
            textTransform: 'none',
            borderRadius: 1
          }}
        >
          Delete
        </Button>
        <Button
          onClick={onClose}
          sx={{ 
            textTransform: 'none',
            borderRadius: 1
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ 
            textTransform: 'none',
            borderRadius: 1
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
} 