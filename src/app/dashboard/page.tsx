"use client";

import { useAuth } from "@/context/AuthProvider";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Avatar,
  useTheme,
  Paper,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/actions/clientsDashboard";
import { useToast } from "@/hooks/useToast";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ChildCareIcon from "@mui/icons-material/ChildCare";

export default function Dashboard() {
  const {user } = useAuth();
  const router = useRouter();
  const { showError } = useToast();
  const theme = useTheme();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await getDashboardData({ userId: user.id });
        if (result) {
          setDashboardData(result);
          setIsLoading(false);
          setIsDataFetched(true);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setIsLoading(false);
      }
    };

      fetchDashboardData();
  }, [router, isDataFetched, user?.id]);

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
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
              mb: 1,
            }}
          >
            Welcome back, {user?.username}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.mode === "dark" ? "#999" : "#666",
            }}
          >
            Here&apos;s what&apos;s happening with your wedding planning
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Total Guests Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "#fff",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "#e0e0e0"
                }`,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <GroupIcon />
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {dashboardData?.total_guests}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Guests
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Adults
                    </Typography>
                    <Typography variant="h6">
                      {dashboardData?.total_people}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Children
                    </Typography>
                    <Typography variant="h6">
                      {dashboardData?.total_kids}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Attending Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "#fff",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "#e0e0e0"
                }`,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "success.main",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <PeopleIcon />
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {dashboardData?.attending_count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Attending
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {dashboardData?.attending_percentage.toFixed(1)}% Response
                  Rate
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Not Attending Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "#fff",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "#e0e0e0"
                }`,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "error.main",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <PersonOffIcon />
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {dashboardData?.not_attending_count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Not Attending
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {dashboardData?.not_attending_percentage.toFixed(1)}% of Total
                  Guests
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "#fff",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "#e0e0e0"
                }`,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "warning.main",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <ChildCareIcon />
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {dashboardData?.pending_count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2" color="text.secondary">
                  Awaiting Response
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "#fff",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "#e0e0e0"
                }`,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Guest Response Status
              </Typography>
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
                    color: theme.palette.primary.main,
                  },
                ]}
                height={300}
                width={500}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "#fff",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "#e0e0e0"
                }`,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Guest Demographics
              </Typography>
              <BarChart
                xAxis={[{ scaleType: "band", data: ["Adults", "Children"] }]}
                series={[
                  {
                    data: [
                      dashboardData?.total_people,
                      dashboardData?.total_kids,
                    ],
                    color: theme.palette.secondary.main,
                  },
                ]}
                height={300}
                width={500}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardClientLayout>
  );
}
