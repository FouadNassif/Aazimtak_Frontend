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
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useTheme } from "@/context/theme-context";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Navlinks from "@/components/Dashboard/NavLinks";

export default function DashboardNavBase({ title, username, links, onLogout }) {
  const { toggleTheme, mode } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div>
      {/* Main Menu Icon */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          left: "20px",
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
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#00BFFF",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
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
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: "15px",
              padding: "16px",
              textAlign: "center",
              color: "#f1f1f1",
              fontWeight: "bold",
            }}
          >
            Welcome, {username}
          </Typography>
          <Divider sx={{ backgroundColor: "#333" }} />

          <List>
            {links.map(({ text, link, subLinks }, index) => (
              <div key={index}>
                <ListItem
                  button
                  onClick={() => toggleMenu(text)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#1a2238" },
                  }}
                >
                  <ListItemText primary={text} />
                  {subLinks ? (
                    activeMenu === text ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItem>

                {/* Submenu */}
                {subLinks && (
                  <Collapse
                    in={activeMenu === text}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {subLinks.map((subLink, subIndex) => (
                        <Navlinks
                          key={subIndex}
                          text={subLink.text}
                          link={subLink.link}
                        />
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </List>

          {/* Logout */}
          <ListItemText onClick={() => sucesslogout} primary="Log Out" />
        </Box>
      </Drawer>
    </div>
  );
}
