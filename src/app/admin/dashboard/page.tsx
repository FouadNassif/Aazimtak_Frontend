"use client";

export const dynamic = 'force-dynamic';


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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  People,
  Celebration,
  DateRange,
  ArrowUpward,
  ArrowDownward,
  Add as AddIcon,
  LocationOn,
  Storage,
  Person,
  PhotoCamera,
} from "@mui/icons-material";
import { getAdminDashboard } from "@/actions/adminDashboard";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const COLORS = ["#2196f3", "#1976d2", "#0d47a1"];

interface DashboardData {
  status: boolean;
  weddingStats: {
    totalWeddings: number;
    upcomingWeddings: number;
    totalGuests: number;
    monthlyWeddings: number;
  };
  guestResponses: {
    attending: number;
    notAttending: number;
    pending: number;
  };
  upcomingWeddings: Array<{
    id: number;
    bride_name: string;
    groom_name: string;
    wedding_date: string;
    ceremony_city: string;
    guest_count: number;
  }>;
  recentGuestUpdates: Array<{
    id: number;
    name: string;
    attending_status: string;
    number_of_people: number;
    number_of_kids: number;
    status_changed: string;
    wedding_name: string;
  }>;
  cityDistribution: Array<{
    ceremony_city: string;
    count: number;
  }>;
  systemStats: {
    activeSessions: number;
    totalUsers: number;
    totalImages: number;
    storageUsed: number;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
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
      value: data?.weddingStats.totalWeddings || 0,
      icon: <Celebration />,
      trend: `+${((data?.weddingStats.monthlyWeddings || 0) / (data?.weddingStats.totalWeddings || 1) * 100).toFixed(0)}%`,
      positive: true,
    },
    {
      label: "Upcoming Weddings",
      value: data?.weddingStats.upcomingWeddings || 0,
      icon: <DateRange />,
      trend: "This Month",
      positive: true,
    },
    {
      label: "Total Guests",
      value: data?.weddingStats.totalGuests || 0,
      icon: <People />,
      trend: `+${((data?.guestResponses.attending || 0) / (data?.weddingStats.totalGuests || 1) * 100).toFixed(0)}%`,
      positive: true,
    },
    {
      label: "Monthly Weddings",
      value: data?.weddingStats.monthlyWeddings || 0,
      icon: <TrendingUp />,
      trend: "This Month",
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
              Comprehensive overview of your wedding platform
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

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Upcoming Weddings */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ borderRadius: 3, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Upcoming Weddings
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Couple</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Guests</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.upcomingWeddings.map((wedding) => (
                        <TableRow key={wedding.id}>
                          <TableCell>
                            {wedding.bride_name} & {wedding.groom_name}
                          </TableCell>
                          <TableCell>
                            {new Date(wedding.wedding_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{wedding.ceremony_city}</TableCell>
                          <TableCell>{wedding.guest_count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Guest Response Statistics */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ borderRadius: 3, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Guest Response Statistics
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { label: "Attending", value: data?.guestResponses.attending || 0, color: "#4caf50" },
                    { label: "Not Attending", value: data?.guestResponses.notAttending || 0, color: "#f44336" },
                    { label: "Pending", value: data?.guestResponses.pending || 0, color: "#ff9800" },
                  ].map((stat) => (
                    <Box key={stat.label} sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {stat.value}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(stat.value / (data?.weddingStats.totalGuests || 1)) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: "#eee",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: stat.color,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Guest Updates */}
          <Grid item xs={12} md={8}>
            <Card elevation={0} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Recent Guest Updates
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Guest</TableCell>
                        <TableCell>Wedding</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>People</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.recentGuestUpdates.map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell>{guest.name}</TableCell>
                          <TableCell>{guest.wedding_name}</TableCell>
                          <TableCell>
                            <Chip
                              label={guest.attending_status}
                              color={
                                guest.attending_status === "yes"
                                  ? "success"
                                  : guest.attending_status === "no"
                                  ? "error"
                                  : "warning"
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{guest.number_of_people}</TableCell>
                          <TableCell>
                            {new Date(guest.status_changed).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* System Statistics */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  System Statistics
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Active Sessions"
                      secondary={data?.systemStats.activeSessions}
                      secondaryTypographyProps={{ color: "primary" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Total Users"
                      secondary={data?.systemStats.totalUsers}
                      secondaryTypographyProps={{ color: "primary" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Total Images"
                      secondary={data?.systemStats.totalImages}
                      secondaryTypographyProps={{ color: "primary" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Storage Used"
                      secondary={`${(data?.systemStats.storageUsed / 1024 / 1024).toFixed(2)} MB`}
                      secondaryTypographyProps={{ color: "primary" }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* City Distribution */}
          <Grid item xs={12}>
            <Card elevation={0} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Wedding Locations
                </Typography>
                <Grid container spacing={2}>
                  {data?.cityDistribution.map((city) => (
                    <Grid item xs={12} sm={6} md={4} key={city.ceremony_city}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocationOn sx={{ color: "primary.main", mr: 1 }} />
                        <Typography variant="body1">{city.ceremony_city}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {city.count} weddings
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
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
