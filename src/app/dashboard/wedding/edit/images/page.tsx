"use client";
import React, { useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { uploadImages, getAllUserImages } from "@/actions/UploadImages"; // Adjust the path to your uploadImages function
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import DashboardClientLayout from "@/layouts/DashboardClientLayout";
import ImagesLayout5 from "@/components/Card/ImagesLayout5";
import Countdown from "@/components/Card/CountDown";
import DateDisplay from "@/components/Card/DateDisplay";
import BibleVerse from "@/components/Card/BibbleVerse";
import ImagesLayout2 from "@/components/Card/ImagesLayout2";
import WeddingDetails from "@/components/Card/WeddingDetails";

const ImageUpload: React.FC = () => {
  const { isAuth, user } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // For uploaded image paths
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (images.length === 0) {
      setError("Please select images first.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Upload images
      const response = await uploadImages({ userId: user?.id, images });

      // On success, update the uploaded images
      if (response && response.paths) {
        setUploadedImages((prevImages) => [...prevImages, ...response.paths]);
        setImages([]); // Clear selected images after successful upload
      } else {
        throw new Error("Failed to upload images");
      }
    } catch (err) {
      setError("Error uploading images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Fetch all uploaded images
  const fetchAllUploadedImages = async () => {
    try {
      const response = await getAllUserImages({ userId: user?.id });
      console.log(response);
      if (response && response.uploadedImages) {
        // Assuming the response contains an array of image paths
        setUploadedImages(response.uploadedImages.map((img: any) => img.path));
      }
    } catch (err) {
      setError("Error fetching images. Please try again.");
    }
  };

  return (
    <DashboardClientLayout>
      <ImagesLayout5
        image1="/assets/img/img1.jpg"
        image2="/assets/img/Welcome.jpg"
        image3="/assets/img/Support.jpg"
        image4="/assets/img/Welcome2.jpg"
        image5="/assets/img/Welcome3.jpg"
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom={25}
      >
        <BibleVerse
          verse="Therefore what God has joined together, let no one separate."
          reference="Mark 12:9"
        />
        <DateDisplay date="2025-03-21" />
        <Countdown targetDate="2025-03-21" />
      </Box>
      <ImagesLayout5
        image1="/assets/img/img1.jpg"
        image2="/assets/img/Welcome.jpg"
        image3="/assets/img/Support.jpg"
        image4="/assets/img/Welcome2.jpg"
        image5="/assets/img/Welcome3.jpg"
      />
      <WeddingDetails
        weddingDetail={{
          type: "Wedding Ceremony",
          time: "10:39:00",
          place: "Garden of Edeewdwddd",
          city: "Zgharta",
          maps: "dewdwdwdwdw",
        }}
      />
      <ImagesLayout2
        image1="/assets/img/Welcome.jpg"
        image2="/assets/img/Support.jpg"
      />

      <WeddingDetails
        weddingDetail={{
          type: "Wedding Ceremony",
          time: "10:39:00",
          place: "Garden of Edeewdwddd",
          city: "Zgharta",
          maps: "dewdwdwdwdw",
        }}
      />
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6">Upload Your Wedding Images</Typography>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ marginTop: "10px" }}
        />
        <Box sx={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Images"
            )}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ marginTop: "20px" }}>
            {error}
          </Typography>
        )}

        {/* Button to fetch all uploaded images */}
        <Box sx={{ marginTop: "20px" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={fetchAllUploadedImages}
          >
            Get All Uploaded Images
          </Button>
        </Box>

        {/* Display uploaded images */}
        {uploadedImages.length > 0 && (
          <Box sx={{ marginTop: "30px" }}>
            <Typography variant="h6">Uploaded Images</Typography>
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              {uploadedImages.map((imagePath, index) => (
                <Grid item xs={4} key={index}>
                  <Image
                    alt="hello"
                    width={500} // Fixed width based on image size
                    height={300} // Fixed height based on image size
                    src={"http://localhost:8000/storage/" + imagePath}
                    quality={90}
                    style={{ objectFit: "cover", borderRadius: "8px" }} // Use objectFit for better scaling control
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </DashboardClientLayout>
  );
};

export default ImageUpload;
