"use client";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Link,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import Navlinks from "@/components/Dashboard/NavLinks";
import { useTheme } from "@/context/theme-context"; // Import the theme hook
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { logout } from "@/actions/auth";

export default function DashboardNav() {
  const { isAuth, user } = useAuth();
  const { toggleTheme, mode } = useTheme(); // Get the toggleTheme and mode from context
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [weddingOpen, setWeddingOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  async function sucesslogout() {
    await logout();
    router.push("/");
  }

  // Toggle the main drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Toggle each submenu
  const toggleGuests = () => {
    setGuestsOpen(!guestsOpen);
    setWeddingOpen(false);
    setAccountOpen(false);
  };

  const toggleWedding = () => {
    setWeddingOpen(!weddingOpen);
    setGuestsOpen(false);
    setAccountOpen(false);
  };

  const toggleAccount = () => {
    setAccountOpen(!accountOpen);
    setWeddingOpen(false);
    setGuestsOpen(false);
  };

  return (
    <div>
      {/* Button close to the left */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          left: "20px", // Closer to the left
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#00BFFF",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Toggle Dark Mode Button */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: "fixed",
          right: "20px", // Position the button on the right side
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#00BFFF",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}{" "}
        {/* Toggle icon */}
      </IconButton>

      {/* Drawer Sidebar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "#111927",
            color: "#fff",
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ width: 250 }}>
          <Typography
            variant="h6"
            sx={{
              padding: "16px",
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            AAZIMTAK
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "15px",
              padding: "16px",
              textAlign: "center",
              color: "#f1f1f1",
              fontWeight: "bold",
            }}
          >
            Welcome {user.username}
          </Typography>
          <Divider sx={{ backgroundColor: "#333" }} />

          <List>
            <Navlinks text={"Dashboard"} link={"/dashboard"} />

            {/* Guests Menu with Dropdown */}
            <ListItem onClick={toggleGuests} sx={{ cursor: "pointer" }}>
              <ListItemText primary="Guests" />
              {guestsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={guestsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Navlinks text={"Show Guests"} link={"/dashboard/guests"} />
                <Navlinks text={"Add Guests"} link={"/dashboard/guests/add"} />
              </List>
            </Collapse>

            {/* Wedding Menu with Dropdown */}
            <ListItem button onClick={toggleWedding}>
              <ListItemText primary="Wedding" />
              {weddingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={weddingOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Navlinks
                  text={"Edit Wedding"}
                  link={"/dashboard/wedding/edit"}
                />
                <Navlinks
                  text={"Show Wedding"}
                  link={"/dashboard/wedding/show"}
                />
              </List>
            </Collapse>

            {/* Account Menu with Dropdown */}
            <ListItem button onClick={toggleAccount}>
              <ListItemText primary="Account" />
              {accountOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={accountOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Navlinks text={"Edit Account"} link={"/dashboard/account"} />
                <ListItemText onClick={() => sucesslogout} primary="Log Out" />
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
