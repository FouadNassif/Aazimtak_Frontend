"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  TrendingUp,
  People,
  Celebration,
  DateRange,
  ArrowUpward,
  ArrowDownward,
  Add as AddIcon,
} from "@mui/icons-material";
import { getAdminDashboard } from "@/actions/adminDashboard";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const COLORS = ["#2196f3", "#1976d2", "#0d47a1"];

interface Activity {
  date: string;
  description: string;
}

interface DashboardData {
  totalWeddings: number;
  recentlyAddedWeddings: number;
  recentActivities: Activity[];
  status: boolean;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    totalWeddings: 0,
    recentlyAddedWeddings: 0,
    recentActivities: [],
    status: false,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await getAdminDashboard();
        
        if (response && response.status) {
          setData(response);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <Loading />;

  const metrics = [
    {
      label: "Total Weddings",
      value: data.totalWeddings || 0,
      icon: <Celebration />,
      trend: "+12%",
      positive: true,
    },
    {
      label: "Recent Weddings",
      value: data.recentlyAddedWeddings || 0,
      icon: <DateRange />,
      trend: `+${(
        ((data.recentlyAddedWeddings || 0) / (data.totalWeddings || 1)) *
        100
      ).toFixed(0)}%`,
      positive: true,
    },
    {
      label: "Total Guests",
      value: "0", // You can add this to your API response
      icon: <People />,
      trend: "+5%",
      positive: true,
    },
    {
      label: "Monthly Growth",
      value: data.recentlyAddedWeddings || 0,
      icon: <TrendingUp />,
      trend: "+8%",
      positive: true,
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f8fafc" }}>
        {/* Header with Action */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
              Dashboard Overview
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your weddings and monitor activities
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/admin/weddings/add")}
            sx={{
              bgcolor: COLORS[0],
              "&:hover": { bgcolor: COLORS[1] },
            }}
          >
            Add Wedding
          </Button>
        </Box>

        {/* Metrics Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MetricCard {...metric} />
            </Grid>
          ))}
        </Grid>

        {/* Recent Activities */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card elevation={0} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Recent Activities
                </Typography>
                <List>
                  {data.recentActivities && data.recentActivities.length > 0 ? (
                    data.recentActivities.map((activity, index) => (
                      <ListItem
                        key={index}
                        divider={index !== data.recentActivities.length - 1}
                      >
                        <ListItemText
                          primary={activity.description}
                          secondary={new Date(
                            activity.date
                          ).toLocaleDateString()}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText
                        primary="No recent activities"
                        secondary="New activities will appear here"
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Guest Statistics */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Guest Status
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { label: "Attending", value: 0, color: "#4caf50" },
                    { label: "Not Attending", value: 0, color: "#f44336" },
                    { label: "Pending", value: 0, color: "#ff9800" },
                  ].map((stat) => (
                    <Box key={stat.label} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {stat.value}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: 4,
                          bgcolor: "#eee",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${(stat.value / 1) * 100}%`,
                            height: "100%",
                            bgcolor: stat.color,
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

// Metric Card Component
const MetricCard = ({ label, value, icon, trend, positive }) => (
  <Card
    elevation={0}
    sx={{
      height: "100%",
      borderRadius: 3,
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
            bgcolor: `${COLORS[0]}15`,
            color: COLORS[0],
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {positive ? (
          <ArrowUpward sx={{ color: "success.main", fontSize: 16 }} />
        ) : (
          <ArrowDownward sx={{ color: "error.main", fontSize: 16 }} />
        )}
        <Typography
          variant="body2"
          color={positive ? "success.main" : "error.main"}
          sx={{ ml: 0.5 }}
        >
          {trend}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
