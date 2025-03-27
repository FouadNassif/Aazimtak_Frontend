"use client";

import { useAuth } from "@/context/AuthProvider";
import { Box, CircularProgress, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Chip, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllGuests, editGuest, deleteGuest } from "@/actions/clientsDashboard";
import { useToast } from "@/hooks/useToast";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import EditModal from "@/components/Dashboard/EditModal";
import { useTheme as useCustomTheme } from "@/context/theme-context";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Guest {
  id: string;
  name: string;
  wedding_link: string;
  attending_status: string;
  number_of_people: number;
  number_of_kids: number;
}

interface GuestRow {
  id: string;
  name: string;
  weddingLink: string;
  attendingStatus: string;
  numberOfPeople: number;
  numberOfKids: number;
  edit: string;
}

interface EditGuestParams {
  guestId: number;
  guestName: string;
  numberOfPeople: number;
  numberOfKids: number;
}

interface DeleteGuestParams {
  guestId: number;
}

export default function Guests() {
  const { isAuth, user } = useAuth();
  const { mode } = useCustomTheme();
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [rows, setRows] = useState<GuestRow[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<GuestRow | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const result = await getAllGuests({ userId: user?.id });
      if (result) {
        const mappedGuests = result.guests.map((guest: Guest) => ({
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
        setIsRefreshing(false);
      }
    } catch (error) {
      console.error("Error fetching guests:", error);
      showError("Failed to load dashboard data. Please try again.");
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await getAllGuests({ userId: user?.id });
        if (result) {
          const mappedGuests = result.guests.map((guest: Guest) => ({
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
          setIsRefreshing(false);
        }
      } catch (error) {
        console.error("Error fetching guests:", error);
        showError("Failed to load dashboard data. Please try again.");
        setIsLoading(false);
        setIsRefreshing(false);
      }
    };

    if (!isDataFetched) {
      fetchDashboardData();
    }
  }, [isAuth, user?.id, router, showError, isDataFetched]);

  const handleEditClick = (guestId: string) => {
    const guest = rows.find((row) => row.id === guestId);
    setSelectedGuest(guest || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuest(null);
  };

  const handleSaveChanges = async (updatedGuest: GuestRow) => {
    try {
      const params: EditGuestParams = {
        guestId: parseInt(updatedGuest.id),
        guestName: updatedGuest.name,
        numberOfPeople: updatedGuest.numberOfPeople,
        numberOfKids: updatedGuest.numberOfKids,
      };

      const result = await editGuest(params);

      if (result) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === updatedGuest.id ? { ...row, ...updatedGuest } : row
          )
        );
        showSuccess("Guest updated successfully!");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating guest:", error);
      showError("Failed to update guest. Please try again.");
    }
  };

  const handleDeleteGuest = async (guestId: string) => {
    try {
      const params: DeleteGuestParams = {
        guestId: parseInt(guestId),
      };

      const result = await deleteGuest(params);

      if (result) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== guestId));
        showSuccess("Guest deleted successfully!");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error deleting guest:", error);
      showError("Failed to delete guest. Please try again.");
    }
  };

  const handleCopyLink = (weddingLink: string) => {
    navigator.clipboard.writeText(weddingLink);
    showSuccess("Wedding link copied to clipboard!");
  };

  const handleDeleteClick = (guestId: string) => {
    setGuestToDelete(guestId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (guestToDelete) {
      await handleDeleteGuest(guestToDelete);
      setIsDeleteDialogOpen(false);
      setGuestToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setGuestToDelete(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDashboardData();
  };

  const handleExport = () => {
    // Convert the data to CSV format
    const headers = ['Name', 'Wedding Link', 'Status', 'Number of People', 'Number of Kids'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => [
        row.name,
        row.weddingLink,
        row.attendingStatus,
        row.numberOfPeople,
        row.numberOfKids
      ].join(','))
    ].join('\n');

    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `guests_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess("Guest list exported successfully!");
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
    { 
      field: "name", 
      headerName: "Name", 
      width: 220,
      headerClassName: 'header',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: "weddingLink", 
      headerName: "Wedding Link", 
      width: 300,
      headerClassName: 'header',
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap' 
          }}>
            {params.value}
          </Typography>
          <Tooltip title="Copy Link">
            <IconButton 
              size="small" 
              onClick={() => handleCopyLink(params.value)}
              sx={{ 
                color: 'primary.main',
                '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' }
              }}
            >
              <LinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    },
    { 
      field: "attendingStatus", 
      headerName: "Status", 
      width: 150,
      headerClassName: 'header',
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === 'attending'
              ? 'success'
              : params.value === 'not attending'
              ? 'error'
              : 'warning'
          }
          sx={{ 
            fontWeight: 500,
            textTransform: 'capitalize'
          }}
        />
      )
    },
    { 
      field: "numberOfPeople", 
      headerName: "People", 
      width: 100,
      headerClassName: 'header',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: "numberOfKids", 
      headerName: "Kids", 
      width: 100,
      headerClassName: 'header',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: "edit",
      headerName: "Actions",
      width: 200,
      headerClassName: 'header',
      renderCell: (params: GridRenderCellParams<GuestRow>) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Edit Guest">
            <IconButton
              color="primary"
              onClick={() => handleEditClick(params.value)}
              sx={{ 
                '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' }
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Guest">
            <IconButton
              color="error"
              onClick={() => handleDeleteClick(params.value)}
              sx={{ 
                '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <DashboardClientLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* Header Section */}
        <Box sx={{ 
          mb: 4, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: 2 
        }}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: mode === "dark" ? "#fff" : "#1a1a1a",
                mb: 1,
              }}
            >
              Guest Management
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: mode === "dark" ? "#999" : "#666",
              }}
            >
              Manage your wedding guests and their responses
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Tooltip title="Refresh">
              <IconButton
                onClick={handleRefresh}
                disabled={isRefreshing}
                sx={{
                  bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "#f5f5f5",
                  "&:hover": {
                    bgcolor: mode === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0",
                  },
                }}
              >
                <RefreshIcon className={isRefreshing ? "rotating" : ""} />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push("/dashboard/guests/add")}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Add Guest
            </Button>
          </Box>
        </Box>

        {/* DataGrid */}
        <Paper
          elevation={0}
          sx={{
            height: "calc(100vh - 300px)",
            backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
            border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0"}`,
            borderRadius: 2,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
                color: mode === 'dark' ? '#fff' : '#000',
                fontWeight: 'bold',
                borderRadius: '8px 8px 0 0',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${mode === 'dark' ? '#333' : 'rgba(224, 224, 224, 1)'}`,
                color: mode === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
              },
            }}
          />
        </Paper>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 300,
            bgcolor: mode === 'dark' ? '#1a1a1a' : '#fff',
          }
        }}
      >
        <DialogTitle sx={{ 
          color: mode === 'dark' ? '#fff' : '#000',
          fontWeight: 600 
        }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ 
            color: mode === 'dark' ? '#999' : '#666',
            mt: 1 
          }}>
            Are you sure you want to delete this guest? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            sx={{ 
              color: mode === 'dark' ? '#999' : '#666',
              textTransform: 'none',
              borderRadius: 1
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ 
              textTransform: 'none',
              borderRadius: 1
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      {isModalOpen && selectedGuest && (
        <EditModal
          guest={selectedGuest}
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          onDelete={handleDeleteGuest}
        />
      )}

      <style jsx global>{`
        @keyframes rotating {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rotating {
          animation: rotating 1s linear infinite;
        }
      `}</style>
    </DashboardClientLayout>
  );
}
