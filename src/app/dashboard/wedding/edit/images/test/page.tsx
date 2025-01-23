"use client";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ImagesLayout5 from "@/components/Card/ImagesLayout5";
import Countdown from "@/components/Card/CountDown";
import DateDisplay from "@/components/Card/DateDisplay";
import BibleVerse from "@/components/Card/BibbleVerse";
import ImagesLayout2 from "@/components/Card/ImagesLayout2";
import WeddingDetails from "@/components/Card/WeddingDetails";
import GiftRegistry from "@/components/Card/GiftRegistry";
import ImagesLayout3 from "@/components/Card/ImagesLayout3";
import ImagesLayout4 from "@/components/Card/ImagesLayout4";
import PoweredBy from "@/components/PowerBy";
import { getAllUserImages } from "@/actions/UploadImages";
import { useAuth } from "@/context/AuthProvider";

const weddingDetails = {
  wedding_date: "2027-01-27",
  ceremony_time: "16:00:00",
  ceremony_place: "Chruch",
  ceremony_city: "Earth City",
  ceremony_maps: "/dwdwdwd",
  party_time: "19:00:00",
  party_place: "Restaurant",
  party_city: "Earth City",
  party_maps: "/dwdwdwd",
  gift_type: "Bank Of Earth",
  gift_details: "123-4567-ABC-ZXD",
};

const imgSrc = "http://localhost:8000/storage/";

export default function Test() {
  const { user } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch images only once when the component is mounted
    fetchAllUploadedImages();
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  console.log(uploadedImages);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const fetchAllUploadedImages = async () => {
    if (!user?.id) return; // Ensure user is authenticated before making the request

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

  // Handle image upload
  const handleUpload = async () => {
    if (images.length === 0) {
      setError("Please select images first.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Simulate an image upload process
      setTimeout(() => {
        setUploading(false);
        alert("Images uploaded successfully!");
        setImages([]); // Clear selected images after upload
      }, 2000); // Simulated 2 second upload delay
    } catch (err) {
      setError("Error uploading images. Please try again.");
      setUploading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
      {/* Wedding Card Section */}
      <Box sx={{ width: "60%" }}>
        <ImagesLayout5
          image1={
            imgSrc +
            "user_images/1/XvlWyjVGuC1IYSZxEnDo3JfuVP374bvke3Dhh9Is.png"
          }
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
          <DateDisplay date={weddingDetails.wedding_date} />
          <Countdown targetDate={weddingDetails.wedding_date} />
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
            time: weddingDetails.ceremony_time,
            place: weddingDetails.ceremony_place,
            city: weddingDetails.ceremony_city,
            maps: weddingDetails.ceremony_maps,
          }}
        />
        <ImagesLayout2
          image1="/assets/img/Welcome.jpg"
          image2="/assets/img/Support.jpg"
        />
        <WeddingDetails
          weddingDetail={{
            type: "Wedding Party",
            time: weddingDetails.party_time,
            place: weddingDetails.party_place,
            city: weddingDetails.party_city,
            maps: weddingDetails.party_maps,
          }}
        />
        <ImagesLayout3
          image1="/assets/img/Support.jpg"
          image2="/assets/img/Welcome2.jpg"
          image3="/assets/img/Welcome3.jpg"
        />
        <GiftRegistry
          weddingDetail={{
            gift_type: weddingDetails.gift_type,
            gift_details: weddingDetails.gift_details,
          }}
        />
        <ImagesLayout4
          image1="/assets/img/Welcome.jpg"
          image2="/assets/img/Support.jpg"
          image3="/assets/img/Welcome2.jpg"
          image4="/assets/img/Welcome3.jpg"
        />
        <PoweredBy />
      </Box>

      {/* Image Upload Form Section */}
      <Box
        sx={{
          width: "35%",
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 3,
          marginTop: 2,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Upload Your Wedding Images
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ marginBottom: "20px", width: "100%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            fullWidth
            disabled={uploading}
            sx={{
              padding: "10px",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
            }}
          >
            {uploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Images"
            )}
          </Button>
        </Box>

        {error && (
          <Typography
            color="error"
            sx={{ marginTop: "10px", textAlign: "center" }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
