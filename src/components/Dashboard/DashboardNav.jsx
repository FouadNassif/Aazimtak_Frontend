"use client";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { useTheme } from "@/context/theme-context";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import Navlinks from "@/components/Dashboard/NavLinks";

export default function DashboardNavBase({
  title,
  username,
  links,
  onLogout,
  children,
}) {
  const { toggleTheme, mode } = useTheme();
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar - remains the same */}
      <Box
        component="nav"
        sx={{
          width: 280,
          flexShrink: 0,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          backgroundColor: mode === "dark" ? "#1a1a1a" : "#fff",
          borderRight: `1px solid ${mode === "dark" ? "#333" : "#e0e0e0"}`,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
          zIndex: 1200,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: `1px solid ${mode === "dark" ? "#333" : "#e0e0e0"}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: mode === "dark" ? "#fff" : "#1a1a1a",
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: mode === "dark" ? "#999" : "#666",
            }}
          >
            Welcome, {username}
          </Typography>
        </Box>

        {/* Navigation Links */}
        <List sx={{ flexGrow: 1, pt: 2 }}>
          {links.map(({ text, link, subLinks }, index) => (
            <div key={index}>
              <ListItem
                button="true"
                onClick={() => subLinks && toggleMenu(text)}
                sx={{
                  py: 1.5,
                  px: 3,
                  color: mode === "dark" ? "#fff" : "#1a1a1a",
                  "&:hover": {
                    backgroundColor:
                      mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                />
                {subLinks &&
                  (activeMenu === text ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>

              {subLinks && (
                <Collapse in={activeMenu === text} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subLinks.map((subLink, subIndex) => (
                      <Navlinks
                        key={subIndex}
                        text={subLink.text}
                        link={subLink.link}
                        mode={mode}
                      />
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>

        {/* Footer Actions */}
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${mode === "dark" ? "#333" : "#e0e0e0"}`,
          }}
        >
          <ListItem
            button="true"
            onClick={toggleTheme}
            sx={{
              borderRadius: 1,
              mb: 1,
              color: mode === "dark" ? "#fff" : "#1a1a1a",
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </ListItemIcon>
            <ListItemText
              primary={`${mode === "light" ? "Dark" : "Light"} Mode`}
            />
          </ListItem>

          <ListItem
            button="true"
            onClick={onLogout}
            sx={{
              borderRadius: 1,
              color: mode === "dark" ? "#fff" : "#1a1a1a",
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Box>
      </Box>

      {/* Main Content Wrapper */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: "280px", // Same as sidebar width
          minHeight: "100vh",
          backgroundColor: mode === "dark" ? "#121212" : "#f5f5f5",
          transition: "all 0.3s ease",
          width: "calc(100% - 280px)", // Subtract sidebar width
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
