"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Box, 
  Button, 
  Card, 
  Typography, 
  Snackbar, 
  Alert, 
  CircularProgress, 
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton
} from "@mui/material";
import Image from "next/image";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import { useAuth } from "@/context/AuthProvider";
import { uploadSingleImage, getAllUserImages, type UserImage } from "@/actions/UploadImages";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const LAYOUTS = [2, 3, 4, 5, 6];

export default function EditImages() {
  const { user } = useAuth();
  const [images, setImages] = useState<UserImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{file: File | null, layout: number, position: number}>({
    file: null,
    layout: 2,
    position: 1
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
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

  useEffect(() => {
    if (user?.id) {
      fetchImages();
    }
  }, [user]);

  const fetchImages = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const response = await getAllUserImages(user.id);
      if (response.success) {
        setImages(response.images);
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to fetch images',
          severity: 'error'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to fetch images',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSnackbar({
          open: true,
          message: "Please select an image file",
          severity: "error",
        });
        return;
      }

      setSelectedImage(prev => ({...prev, file}));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage.file || !user?.id) return;
    const formData = new FormData();
    formData.append('image', selectedImage.file);
    formData.append('userId', user.id.toString());
    formData.append('layout', selectedImage.layout.toString());
    formData.append('position', selectedImage.position.toString());
    setIsUploading(true);
    try {
      const response = await uploadSingleImage(formData
      );
      
      setSnackbar({
        open: true,
        message: response.message,
        severity: response.success ? "success" : "error",
      });

      if (response.success) {
        setSelectedImage({file: null, layout: 2, position: 1});
        setPreview(null);
        setIsDialogOpen(false);
        fetchImages(); // Refresh the images
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

  const handleEdit = (layout: number, position: number) => {
    const existingImage = images.find(img => img.layout === layout && img.position === position);
    setSelectedImage(prev => ({
      ...prev, 
      layout, 
      position,
      file: null
    }));
    setPreview(existingImage ? `${process.env.NEXT_PUBLIC_API_URL}${existingImage.path}` : null);
    setIsDialogOpen(true);
  };

  // Group images by layout
  const groupedImages = images.reduce((acc, img) => {
    if (!acc[img.layout]) {
      acc[img.layout] = [];
    }
    acc[img.layout][img.position - 1] = img;
    return acc;
  }, {} as Record<number, UserImage[]>);

  const getPositionsForLayout = (layout: number) => {
    switch (layout) {
      case 2: return 2;
      case 3: return 3;
      case 4: return 4;
      case 5:
      case 6: return 5;
      default: return 0;
    }
  };

  return (
    <DashboardClientLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Wedding Images
        </Typography>

        {isLoading ? (
          <Grid container spacing={3}>
            {[...Array(5)].map((_, index) => (
              <Grid item xs={12} key={index}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))}
          </Grid>
        ) : (
          /* Display images grouped by layout */
          LAYOUTS.map((layout) => (
            <Card key={layout} sx={{ mb: 4, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Layout {layout}
              </Typography>
              <Grid container spacing={2}>
                {Array.from({ length: getPositionsForLayout(layout) }).map((_, index) => {
                  const image = groupedImages[layout]?.[index];
                  return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        sx={{
                          position: 'relative',
                          height: 200,
                          bgcolor: 'grey.100',
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}
                      >
                        {image ? (
                          <>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_URL}${image.path}`}
                              alt={`Layout ${layout} Position ${index + 1}`}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                p: 1,
                                bgcolor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                borderBottomLeftRadius: 1
                              }}
                            >
                              Position {index + 1}
                            </Box>
                            <IconButton
                              sx={{
                                position: 'absolute',
                                right: 8,
                                bottom: 8,
                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                '&:hover': {
                                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                                }
                              }}
                              onClick={() => handleEdit(layout, index + 1)}
                            >
                              <EditIcon />
                            </IconButton>
                          </>
                        ) : (
                          <Box
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 1
                            }}
                          >
                            <Typography color="text.secondary" variant="body2">
                              Position {index + 1}
                            </Typography>
                            <Button
                              variant="outlined"
                              onClick={() => handleEdit(layout, index + 1)}
                            >
                              Add Image
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
          ))
        )}

        {/* Edit Dialog */}
        <Dialog 
          open={isDialogOpen} 
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedImage({file: null, layout: 2, position: 1});
            setPreview(null);
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Edit Image - Layout {selectedImage.layout}, Position {selectedImage.position}
          </DialogTitle>
          <DialogContent>
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
                mt: 2
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
              sx={{ mt: 2 }}
              fullWidth
            >
              Select Image
            </Button>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => {
                setIsDialogOpen(false);
                setSelectedImage({file: null, layout: 2, position: 1});
                setPreview(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!selectedImage.file || isUploading}
              startIcon={isUploading ? <CircularProgress size={20} /> : <SaveIcon />}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

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
