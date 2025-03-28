"use server";

import { LaravelInstance } from "./axios";

interface ImageUploadData {
  layout: number;
  position: number;
  file: File;
}

interface ImageUploadResponse {
  success: boolean;
  message: string;
  images: {
    path: string;
    layout: number;
    position: number;
  }[];
}

interface UploadResponse {
  success: boolean;
  message: string;
  image?: {
    path: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function uploadImages(
  userId: number,
  images: ImageUploadData[]
): Promise<ImageUploadResponse> {
  try {
    const formData = new FormData();

    // Add each image with its metadata
    images.forEach(({ layout, position, file }, index) => {
      // Append each image with a unique key
      formData.append(`images[${index}]`, file);
      formData.append(`layouts[${index}]`, String(layout));
      formData.append(`positions[${index}]`, String(position));
    });

    // Add user ID
    formData.append('userId', String(userId));

    const axiosClient = await LaravelInstance();
    
    // Log the request details
    console.log('Upload Request Details:', {
      url: '/dashboard/wedding/image/upload',
      userId,
      imageCount: images.length,
      images: images.map(img => ({
        layout: img.layout,
        position: img.position,
        fileName: img.file.name,
        fileSize: img.file.size,
        fileType: img.file.type
      }))
    });

    const response = await axiosClient.post<ImageUploadResponse>(
      '/dashboard/wedding/image/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      }
    );

    // Log the response
    console.log('Upload Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Image upload error:', error);
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Could not connect to the server. Please check if the server is running.');
      }
      throw new Error(error.message);
    }
    throw new Error('Failed to upload images. Please try again.');
  }
}

export async function uploadSingleImage(userId: number, file: File): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId.toString());
    formData.append('layout', '1');
    formData.append('position', '1');

    const response = await fetch(`${API_URL}/dashboard/wedding/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

export async function deleteImage(userId: number, imageId: number): Promise<DeleteResponse> {
  try {
    const response = await fetch(`${API_URL}/dashboard/wedding/image/${imageId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

export async function getAllUserImages(userId: number): Promise<GroupedImages> {
  try {
    const response = await fetch(`${API_URL}/dashboard/wedding/images/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
