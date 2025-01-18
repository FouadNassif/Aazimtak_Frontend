"use server";

import { LaravelInstance } from "./axios";

export async function uploadImages({
  userId,
  images,
}: {
  userId: number;
  images: File[]; // Array of image files
}): Promise<any> {
  try {
    const formData = new FormData();

    // Append images to the FormData object
    images.forEach((image) => {
      formData.append("images[]", image); // 'images[]' is used to pass an array of files
    });

    // Append userId to the FormData
    formData.append("userId", String(userId));

    // Send the request
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post(
      "/dashboard/wedding/upload-images", // Ensure this is your correct API route
      formData, // Pass the FormData object directly, not as part of a JSON object
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type for file uploads
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to upload images: " + response.status);
    }

    return response.data; // Return the response data containing image paths
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error uploading images:", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getAllUserImages({
  userId,
}: {
  userId: number;
}): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post(
      "/dashboard/wedding/getAllUserImages",
      { userId }
    );

    if (response.status !== 200) {
      throw new Error("Failed to upload images: " + response.status);
    }
    return response.data; // Return the response data containing image paths
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error uploading images:", errorMessage);
    throw new Error(errorMessage);
  }
}
