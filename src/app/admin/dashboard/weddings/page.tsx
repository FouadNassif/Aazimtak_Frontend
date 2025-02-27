"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "@/components/Loading";
import AdminLayout from "@/layouts/AdminLayout";
import { getAllWedding } from "@/actions/adminDashboard";

export default function Weddings() {
  const router = useRouter();
  const { showError } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]); // State for rows

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await getAllWedding();
        if (result) {
          const mappedWeddings = result.weddings.map(
            (wedding: any, index: number) => ({
              id: index,
              brideFullName: `${wedding.bride_name} ${wedding.bride_lastname}`,
              groomFullName: `${wedding.groom_name} ${wedding.groom_lastname}`,
              createdAt: new Date(wedding.created_at).toLocaleDateString(),
              updatedAt: new Date(wedding.updated_at).toLocaleDateString(),
            })
          );

          setRows(mappedWeddings);
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
  }, [router, showError, isDataFetched]);

  if (isLoading) {
    return (
      <Box>
        <Loading />
      </Box>
    );
  }

  const columns = [
    {
      field: "brideFullName",
      headerName: "Bride Full Name",
      width: 200,
      renderCell: (params: any) => (
        <Typography sx={{ fontWeight: 500 }}>{params.value}</Typography>
      ),
    },
    {
      field: "groomFullName",
      headerName: "Groom Full Name",
      width: 200,
      renderCell: (params: any) => (
        <Typography sx={{ fontWeight: 500 }}>{params.value}</Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      renderCell: (params: any) => <Typography>{params.value}</Typography>,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
      renderCell: (params: any) => <Typography>{params.value}</Typography>,
    },
  ];

  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "700",
            my: 4,
            color: "#1a237e",
          }}
        >
          All Weddings
        </Typography>

        <Box
          sx={{
            width: "fit-content",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSizeOptions={[10, 20, 30, 40, 50]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 0,
                },
              },
            }}
            sx={{
              "& .MuiDataGrid-cell": {
                py: 2,
              },
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#f5f5f5",
                fontWeight: "bold",
              },
              width: "fit-content",
            }}
          />
        </Box>
      </Box>
    </AdminLayout>
  );
}
