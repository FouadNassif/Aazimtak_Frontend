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
  Link,
  Drawer,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { useTheme as useCustomTheme } from "@/context/theme-context";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Navlinks from "@/components/Dashboard/NavLinks";

export default function DashboardNavBase({
  title,
  username,
  links,
  onLogout,
  children,
}) {
  const { toggleTheme, mode } = useCustomTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <>
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
              {text === "Dashboard" ? (
                <Link href={link} sx={{ textDecoration: "none", color: "inherit" }}>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                    sx={{
                      cursor: "pointer"
                    }}
                  />
                </Link>
              ) : (
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                  sx={{
                    cursor: "pointer"
                  }}
                />
              )}
              {subLinks && (activeMenu === text ? <ExpandLess /> : <ExpandMore />)}
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
            cursor: "pointer",
            mb: 1,
            color: mode === "dark" ? "#fff" : "#1a1a1a",
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </ListItemIcon>
          <ListItemText primary={`${mode === "light" ? "Dark" : "Light"} Mode`} />
        </ListItem>

        <ListItem
          button="true"
          onClick={onLogout}
          sx={{
            cursor: "pointer",
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
    </>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${240}px)` },
            ml: { sm: `${240}px` },
            bgcolor: mode === "dark" ? "#1a1a1a" : "#fff",
            color: mode === "dark" ? "#fff" : "#1a1a1a",
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "dark" ? "#333" : "#e0e0e0"}`,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: { sm: 240 },
          flexShrink: { sm: 0 },
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 240,
                bgcolor: mode === "dark" ? "#1a1a1a" : "#fff",
                borderRight: `1px solid ${mode === "dark" ? "#333" : "#e0e0e0"}`,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 240,
                bgcolor: mode === "dark" ? "#1a1a1a" : "#fff",
                borderRight: `1px solid ${mode === "dark" ? "#333" : "#e0e0e0"}`,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 0 },
          width: { sm: `calc(100% - ${240}px)` },
          minHeight: "100vh",
          backgroundColor: mode === "dark" ? "#121212" : "#f5f5f5",
          transition: "all 0.3s ease",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
