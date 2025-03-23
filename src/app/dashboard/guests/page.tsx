"use client";

import { useAuth } from "@/context/AuthProvider";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllGuests, editGuest, deleteGuest } from "@/actions/clientsDashboard";
import { useToast } from "@/hooks/useToast";
import { DataGrid } from "@mui/x-data-grid";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import EditModal from "@/components/Dashboard/EditModal";

export default function Guests() {
  const { isAuth, user } = useAuth();
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await getAllGuests({ userId: user?.id });
        if (result) {
          const mappedGuests = result.guests.map((guest: any) => ({
            id: guest.id,
            name: guest.name,
            weddingLink: guest.wedding_link,
            attendingStatus: guest.attending_status,
            numberOfPeople: guest.number_of_people,
            numberOfKids: guest.number_of_kids,
            edit: guest.id,
          }));
          setRows(mappedGuests);
          setIsLoading(false);
          setIsDataFetched(true);
        }
      } catch (err) {
        showError("Failed to load dashboard data. Please try again.");
        setIsLoading(false);
      }
    };

    if (!isDataFetched) {
      fetchDashboardData();
    }
  }, [isAuth, user?.id, router, showError, isDataFetched]);

  const handleEditClick = (guestId: string) => {
    const guest = rows.find((row) => row.id === guestId);
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuest(null);
  };

  const handleSaveChanges = async (updatedGuest) => {
    try {
      const result = await editGuest({
        guestId: updatedGuest.id,
        guestName: updatedGuest.name,
        numberOfPeople: updatedGuest.numberOfPeople,
        numberOfKids: updatedGuest.numberOfKids,
      });

      if (result) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === updatedGuest.id ? { ...row, ...updatedGuest } : row
          )
        );
        showSuccess("Guest updated successfully!");
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error updating guest:", err);
      showError("Failed to update guest. Please try again.");
    }
  };

  const handleDeleteGuest = async (guestId: number) => {
    try {
      const result = await deleteGuest({ guestId });

      if (result) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== guestId));
        showSuccess("Guest deleted successfully!");
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error deleting guest:", err);
      showError("Failed to delete guest. Please try again.");
    }
  };

  const handleCopyLink = (weddingLink: string) => {
    navigator.clipboard.writeText(weddingLink);
    showSuccess("Wedding link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    { field: "name", headerName: "Name", width: 220, headerClassName: 'header' },
    { field: "weddingLink", headerName: "Wedding Link", width: 300, headerClassName: 'header' },
    { field: "attendingStatus", headerName: "Attending Status", width: 200, headerClassName: 'header' },
    { field: "numberOfPeople", headerName: "Number of People", width: 220, headerClassName: 'header' },
    { field: "numberOfKids", headerName: "Number of Kids", width: 220, headerClassName: 'header' },
    {
      field: "edit",
      headerName: "Actions",
      width: 340,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEditClick(params.value)}
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteGuest(params.value)}
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<LinkIcon />}
            onClick={() => handleCopyLink(params.row.weddingLink)}
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Copy Link
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <DashboardClientLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto",
          paddingTop: 10,
        }}
      >
        <Typography
          sx={{
            fontSize: "26px",
            fontWeight: "600",
            mb: 3,
            color: "#2a5298", // Add color for text
            textAlign: 'center',
          }}
        >
          All Guests
        </Typography>
        <div style={{ width: "100%", maxWidth: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSizeOptions={[10, 20, 30, 40, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            sx={{
              width: "100%",
              borderRadius: '8px',
              boxShadow: 3,
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#2a5298',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px 8px 0 0',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          />
        </div>
      </Box>
      {isModalOpen && selectedGuest && (
        <EditModal
          guest={selectedGuest}
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          onDelete={handleDeleteGuest}
        />
      )}
    </DashboardClientLayout>
  );
}
