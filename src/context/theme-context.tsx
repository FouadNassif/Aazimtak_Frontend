"use client";
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

interface ThemeContextType {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#999999",
    },
  },
});

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("themeMode");
      if (saved === "dark" || saved === "light") return saved;
    }
    return "light";
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const next = prevMode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("themeMode", next);
      }
      return next;
    });
  };

  // Ensure mode is synced with localStorage on mount (for SSR/CSR consistency)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("themeMode");
      if (saved && saved !== mode) {
        setMode(saved === "dark" ? "dark" : "light");
      }
    }
  }, []);

  const theme = useMemo(() => {
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
