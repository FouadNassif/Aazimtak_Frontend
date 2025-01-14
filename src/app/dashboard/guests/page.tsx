"use client";

import { useAuth } from "@/context/AuthProvider";
import DashboardNav from "../../../components/Dashboard/DashboardNav";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { PieChart, BarChart } from "@mui/x-charts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllGuests } from "@/actions/clientsDashboard";
import { useToast } from "@/hooks/useToast";
import { DataGrid } from "@mui/x-data-grid";

export default function Guests() {
  const { isAuth, user } = useAuth();
  const router = useRouter();
  const { showError, showSuccess } = useToast();

  const [allGuests, setAllGuests] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]); // State for rows

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) {
        showError("User is not Authenticated. Please login again.");
        return;
      }

      try {
        const result = await getAllGuests({ userId: user.id });
        if (result) {
          setAllGuests(result);
          console.log(result.guests);

          // Map over the guests to only extract the necessary fields
          const mappedGuests = result.guests.map((guest: any) => ({
            id: guest.id,
            name: guest.name,
            weddingLink: guest.wedding_link,
            attendingStatus: guest.attending_status,
            numberOfPeople: guest.number_of_people,
            numberOfKids: guest.number_of_kids,
          }));

          setRows(mappedGuests); // Set rows with the mapped guests
          setIsLoading(false);
          setIsDataFetched(true);
        }
      } catch (err) {
        showError("Failed to load dashboard data. Please try again.");
        setIsLoading(false);
      }
    };

    if (!isAuth) {
      router.push("/login");
    } else if (!isDataFetched) {
      fetchDashboardData();
    }
  }, [isAuth, user?.id, router, showError, isDataFetched]);

  if (!isAuth) {
    return null;
  }

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
    { field: "edit", headerName: "Edit", width: 150 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DashboardNav />

      <Typography sx={{
        fontSize: "25px",
        fontWeight: "600",
        my: 5,
      }}>
        ALL GUESTS
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSizeOptions={[10, 20, 30, 40, 50]} // Replaces rowsPerPageOptions
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10, // Default 10 rows per page
              page: 0, // Start at the first page
            },
          },
        }}
      />
    </Box>
  );
}
