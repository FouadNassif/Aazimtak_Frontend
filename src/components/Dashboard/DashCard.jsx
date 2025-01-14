import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Avatar,
    Link,
} from "@mui/material";

export default function DashCard({data}) {
    return (
        <>
            
            <Box
                sx={{
                    boxShadow: "-5px 4px 15px 3px rgba(0,0,0,0.3)",
                    width: "300px", // Fixed width for card
                    padding: "20px",
                    borderRadius: "15px",
                    backgroundColor: "#fff", // White card background
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <Typography variant="h3" fontWeight="bold">
                    {data}
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    textAlign="center"
                >
                    Total Guests
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    textAlign="center"
                >
                    People + Kids
                </Typography>
            </Box>
        </>
    );
}
