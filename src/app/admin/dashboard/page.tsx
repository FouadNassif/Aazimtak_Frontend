"use client";

import { useAuth } from "@/context/AuthProvider";
import DashboardClientLayout from "@/layouts/DashboardClientLayout"
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/actions/clientsDashboard";
import { useToast } from "@/hooks/useToast";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export default function Dashboard() {
  const { isAuth, user } = useAuth();
  const router = useRouter();
  const { showError } = useToast();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) {
        showError("User is not Authenticated. Please login again.");
        return;
      }

      try {
        const result = await getDashboardData({ userId: user.id });
        if (result) {
          setDashboardData(result);
          setIsLoading(false);
          setIsDataFetched(true);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
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
        <DashboardNav />
        <Typography variant="h4" sx={{ mt: 3, fontWeight: "bold" }}>
          Wedding Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "gray", mb: 3 }}>
          Track your wedding guest status and progress
        </Typography>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ maxWidth: 1100 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar sx={{ bgcolor: "#4caf50", mx: "auto", mb: 1 }}>
                  <GroupIcon />
                </Avatar>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {dashboardData?.total_guests}
                </Typography>
                <Typography>Total Guests</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography color="text.secondary">
                  {dashboardData?.total_people} People +{" "}
                  {dashboardData?.total_kids} Kids
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar sx={{ bgcolor: "#2196f3", mx: "auto", mb: 1 }}>
                  <PeopleIcon />
                </Avatar>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {dashboardData?.attending_count}
                </Typography>
                <Typography>Attending</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography color="text.secondary">
                  {dashboardData?.attending_percentage.toFixed(1)}% of Guests
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar sx={{ bgcolor: "#f44336", mx: "auto", mb: 1 }}>
                  <PersonOffIcon />
                </Avatar>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {dashboardData?.not_attending_count}
                </Typography>
                <Typography>Not Attending</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography color="text.secondary">
                  {dashboardData?.not_attending_percentage.toFixed(1)}% of
                  Guests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Box display={"flex"} sx={{ gap: 3, mt: 5 }}>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Attending", "Pending", "Not Attending"],
              },
            ]}
            series={[
              {
                data: [
                  dashboardData?.attending_count,
                  dashboardData?.pending_count,
                  dashboardData?.not_attending_count,
                ],
                color: "#1976d2",
              },
            ]}
            barLabel="value"
            width={500}
            height={300}
          />
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["People", "Kids"],
              },
            ]}
            series={[
              {
                data: [dashboardData?.total_people, dashboardData?.total_kids],
                color: "#ff9800",
              },
            ]}
            barLabel="value"
            width={500}
            height={300}
          />
        </Box>
      </Box>
    </DashboardClientLayout>
  );
}
