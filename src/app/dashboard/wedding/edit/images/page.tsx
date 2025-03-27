"use client";

import { useEffect, useState } from "react";
import { getAllUserImages, uploadImages } from "@/actions/UploadImages";
import { useAuth } from "@/context/AuthProvider";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Image from "next/image";

interface LayoutImage {
  id: number;
  path: string;
  layout: number;
  position: number;
}

interface LayoutConfig {
  id: number;
  name: string;
  requiredImages: number;
  component: string;
}

const layouts: LayoutConfig[] = [
  { id: 2, name: "Two Images", requiredImages: 2, component: "ImagesLayout2" },
  { id: 3, name: "Three Images", requiredImages: 3, component: "ImagesLayout3" },
  { id: 4, name: "Four Images", requiredImages: 4, component: "ImagesLayout4" },
  { id: 5, name: "Five Images", requiredImages: 5, component: "ImagesLayout5" },
];

export default function EditImages() {
  const { user } = useAuth();
  const [images, setImages] = useState<LayoutImage[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<LayoutConfig | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchImages();
    }
  }, [user]);

  const fetchImages = async () => {
    try {
      const response = await getAllUserImages({ userId: user!.id });
      const formattedImages: LayoutImage[] = [];
      
      // Convert the response paths array to our LayoutImage format
      response.paths.forEach((path, index) => {
        formattedImages.push({
          id: Math.random(),
          path: path,
          layout: 2, // Default layout, you might want to adjust this
          position: index + 1,
        });
      });
      
      setImages(formattedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleLayoutSelect = (layout: LayoutConfig) => {
    setSelectedLayout(layout);
    setOpenDialog(true);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?.id) return;

    setLoading(true);
    try {
      const response = await uploadImages({
        userId: user.id,
        images: [selectedFile],
      });

      // Add new image to state
      const newImage: LayoutImage = {
        id: Math.random(),
        path: response[0],
        layout: selectedLayout?.id || 2,
        position: images.filter(img => img.layout === (selectedLayout?.id || 2)).length + 1,
      };

      setImages(prev => [...prev, newImage]);
      setOpenDialog(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (image: LayoutImage) => {
    // TODO: Implement delete functionality
    setImages(prev => prev.filter(img => img.id !== image.id));
  };

  return (
    <DashboardClientLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Wedding Images
        </Typography>

        <Grid container spacing={3}>
          {layouts.map((layout) => (
            <Grid item xs={12} md={6} key={layout.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {layout.name}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                    {images
                      .filter((img) => img.layout === layout.id)
                      .map((image) => (
                        <Box
                          key={image.id}
                          sx={{
                            position: "relative",
                            width: 150,
                            height: 150,
                          }}
                        >
                          <Image
                            src={image.path}
                            alt={`Layout ${layout.id} Image ${image.position}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                          <IconButton
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              bgcolor: "rgba(255,255,255,0.8)",
                            }}
                            onClick={() => handleDelete(image)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleLayoutSelect(layout)}
                    disabled={
                      images.filter((img) => img.layout === layout.id).length >=
                      layout.requiredImages
                    }
                  >
                    Add Image
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add Image to {selectedLayout?.name}</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Select Image
                </Button>
                {selectedFile && (
                  <Typography variant="body2" color="text.secondary">
                    Selected: {selectedFile.name}
                  </Typography>
                )}
              </label>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              onClick={handleUpload}
              variant="contained"
              disabled={!selectedFile || loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardClientLayout>
  );
}
