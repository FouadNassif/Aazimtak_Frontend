"use client";

import { useState, useRef } from "react";
import { Box, Button, Card, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import Image from "next/image";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import { useAuth } from "@/context/AuthProvider";
import { uploadSingleImage } from "@/actions/UploadImages";

export default function EditImages() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?.id) return;

    setIsUploading(true);
    try {
      const response = await uploadSingleImage(user.id, selectedFile);
      
      setSnackbar({
        open: true,
        message: response.message,
        severity: response.success ? "success" : "error",
      });

      if (response.success) {
        setSelectedFile(null);
        setPreview(null);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : "Failed to upload image",
        severity: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardClientLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Upload Wedding Image
        </Typography>

        <Card
          sx={{
            p: 3,
            maxWidth: 500,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 300,
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "grey.100",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Typography color="text.secondary">
                No image selected
              </Typography>
            )}
          </Box>

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileSelect}
          />

          <Button
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            Select Image
          </Button>

          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            sx={{ minWidth: 200 }}
          >
            {isUploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Image"
            )}
          </Button>
        </Card>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </DashboardClientLayout>
  );
}
