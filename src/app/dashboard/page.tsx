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
  IconButton,
  Tooltip,
  useMediaQuery,
  Button,
  LinearProgress,
  Chip,
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
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme as useCustomTheme } from "@/context/theme-context";

interface DashboardData {
  wedding_id: number;
  attending_count: number;
  not_attending_count: number;
  pending_count: number;
  attending_percentage: number;
  pending_percentage: number;
  not_attending_percentage: number;
  people_percentage: number;
  kids_percentage: number;
  total_people: number;
  total_kids: number;
  total_guests: number;
  total_guests_count: number;
  total_invitations: number;
  average_response_time: number;
  wedding_date: string | null;
  days_until_wedding: number;
  trends: {
    attending: number;
    pending: number;
    not_attending: number;
  };
  response_rate: {
    current: number;
    previous: number;
  };
  demographics: {
    adults: number;
    children: number;
    adults_percentage: number;
    children_percentage: number;
  };
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  subtitle: string;
  trend?: number;
  chip?: {
    label: string;
    color: "success" | "error" | "warning" | "info";
  };
}

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { showError } = useToast();
  const theme = useTheme();
  const { mode } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchDashboardData = async () => {
    try {
      const result = await getDashboardData({ userId: user.id });
      if (result) {
        setDashboardData(result);
        setIsLoading(false);
        setIsDataFetched(true);
        setIsRefreshing(false);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      showError("Failed to load dashboard data. Please try again.");
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [router, isDataFetched, user?.id]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDashboardData();
  };

  const handleAddGuest = () => {
    router.push("/dashboard/guests/add");
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

  const StatCard = ({ title, value, icon, color, subtitle, trend, chip }: StatCardProps) => (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
        border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0"}`,
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: mode === "dark" ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: color,
              width: 48,
              height: 48,
              boxShadow: `0 4px 12px ${color}40`,
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ ml: 2, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {value}
              </Typography>
              {chip && (
                <Chip
                  label={chip.label}
                  color={chip.color}
                  size="small"
                  sx={{ height: 20 }}
                />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          {trend && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {trend > 0 ? (
                <TrendingUpIcon color="success" />
              ) : (
                <TrendingDownIcon color="error" />
              )}
              <Typography
                variant="body2"
                color={trend > 0 ? "success.main" : "error.main"}
              >
                {Math.abs(trend)}%
              </Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <DashboardClientLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* Header Section */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: mode === "dark" ? "#fff" : "#1a1a1a",
                mb: 1,
              }}
            >
              Welcome back, {user?.username}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: mode === "dark" ? "#999" : "#666",
              }}
            >
              Here&apos;s what&apos;s happening with your wedding planning
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Tooltip title="Refresh Data">
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
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddGuest}
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

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Guests"
              value={dashboardData?.total_guests || 0}
              icon={<GroupIcon />}
              color="primary.main"
              subtitle={`${dashboardData?.total_people || 0} Adults, ${dashboardData?.total_kids || 0} Children`}
              trend={5}
              chip={{ label: "Active", color: "success" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Attending"
              value={dashboardData?.attending_count || 0}
              icon={<PeopleIcon />}
              color="success.main"
              subtitle={`${dashboardData?.attending_percentage?.toFixed(1) || 0}% Response Rate`}
              trend={2}
              chip={{ label: "Confirmed", color: "success" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Not Attending"
              value={dashboardData?.not_attending_count || 0}
              icon={<PersonOffIcon />}
              color="error.main"
              subtitle={`${dashboardData?.not_attending_percentage?.toFixed(1) || 0}% of Total Guests`}
              trend={-1}
              chip={{ label: "Declined", color: "error" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending"
              value={dashboardData?.pending_count || 0}
              icon={<ChildCareIcon />}
              color="warning.main"
              subtitle="Awaiting Response"
              trend={-3}
              chip={{ label: "Pending", color: "warning" }}
            />
          </Grid>
        </Grid>

        {/* Additional Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Invitations"
              value={dashboardData?.total_invitations || 0}
              icon={<EmailIcon />}
              color="info.main"
              subtitle="Sent to Guests"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Average Response Time"
              value={`${dashboardData?.average_response_time || 0} days`}
              icon={<AccessTimeIcon />}
              color="secondary.main"
              subtitle="Time to RSVP"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Wedding Date"
              value={dashboardData?.wedding_date ? new Date(dashboardData.wedding_date).toLocaleDateString() : 'Not Set'}
              icon={<CalendarTodayIcon />}
              color="primary.main"
              subtitle={`${dashboardData?.days_until_wedding ? Math.round(dashboardData.days_until_wedding) : 0} days until wedding`}
            />
          </Grid>
        </Grid>

        {/* Response Rate Progress */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
            border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0"}`,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Response Rate</Typography>
            <Typography variant="h6" color="primary">
              {dashboardData?.attending_percentage?.toFixed(1) || 0}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={dashboardData?.attending_percentage || 0}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "#f5f5f5",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
              },
            }}
          />
        </Paper>

        {/* Charts Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
                border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0"}`,
                borderRadius: 2,
                height: "100%",
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
                      dashboardData?.attending_count || 0,
                      dashboardData?.pending_count || 0,
                      dashboardData?.not_attending_count || 0,
                    ],
                    color: theme.palette.primary.main,
                  },
                ]}
                height={300}
                width={isMobile ? 300 : 500}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
                border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0"}`,
                borderRadius: 2,
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Guest Demographics
              </Typography>
              <BarChart
                xAxis={[{ scaleType: "band", data: ["Adults", "Children"] }]}
                series={[
                  {
                    data: [dashboardData?.total_people || 0, dashboardData?.total_kids || 0],
                    color: theme.palette.secondary.main,
                  },
                ]}
                height={300}
                width={isMobile ? 300 : 500}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>

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
