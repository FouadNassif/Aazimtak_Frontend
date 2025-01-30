"use client";

import { useAuth } from "@/context/AuthProvider";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllGuests, editGuest, deleteGuest } from "@/actions/clientsDashboard"; // Import editGuest
import { useToast } from "@/hooks/useToast";
import { DataGrid } from "@mui/x-data-grid";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import EditIcon from "@mui/icons-material/Edit";
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
    { field: "name", headerName: "Name", width: 180 },
    { field: "weddingLink", headerName: "Wedding Link", width: 300 },
    { field: "attendingStatus", headerName: "Attending Status", width: 180 },
    { field: "numberOfPeople", headerName: "Number of People", width: 180 },
    { field: "numberOfKids", headerName: "Number of Kids", width: 180 },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params: any) => (
        <EditIcon
          sx={{ cursor: "pointer" }}
          onClick={() => handleEditClick(params.value)}
        />
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
        }}
      >
        <Typography sx={{ fontSize: "25px", fontWeight: "600", my: 5 }}>
          ALL GUESTS
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSizeOptions={[10, 20, 30, 40, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
        />
      </Box>
      {isModalOpen && selectedGuest && (
        <EditModal
          guest={selectedGuest}
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          onDelete={handleDeleteGuest} // Pass the delete function
        />
      )}
    </DashboardClientLayout>
  );
}
