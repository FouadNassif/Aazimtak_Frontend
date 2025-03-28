"use server";

import { LaravelInstance } from "./axios";
interface UserImageResponse {
  message: string;
  image?: {
    path: string;
    layout: number;
    position: number;
  };
  errors?: Record<string, string[]>;
}

export interface UserImage {
  id: number;
  path: string;
  layout: number;
  position: number;
}

interface GetImagesResponse {
  success: boolean;
  images: UserImage[];
  message?: string;
}

interface AxiosErrorResponse {
  response?: {
    status: number;
    data: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
}

export async function uploadSingleImage(
  userId: number, 
  file: File, 
  layout: number, 
  position: number
): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId.toString());
    formData.append('layout', layout.toString());
    formData.append('position', position.toString());

    const axiosClient = await LaravelInstance();
    
    const response = await axiosClient.post<UploadResponse>(
      '/dashboard/wedding/image/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    console.error('Upload error:', error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as AxiosErrorResponse;
      // Handle validation errors
      if (axiosError.response?.status === 422) {
        return {
          success: false,
          message: 'Validation failed',
          errors: axiosError.response.data.errors
        };
      }

      // Handle other errors
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to upload image. Please try again.'
      };
    }

    return {
      success: false,
      message: 'Failed to upload image. Please try again.'
    };
  }
}

export async function getAllUserImages(userId: number): Promise<GetImagesResponse> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.get<GetImagesResponse>(`/dashboard/wedding/images/${userId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch images');
    }

    return {
      success: true,
      images: response.data.images.map(img => ({
        id: img.id,
        path: img.path,
        layout: img.layout,
        position: img.position
      }))
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    return {
      success: false,
      images: [],
      message: error instanceof Error ? error.message : 'Failed to fetch images'
    };
  }
}

export async function deleteImage({
  userId,
  imageId,
}: {
  userId: number;
  imageId: number;
}): Promise<void> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/dashboard/wedding/delete-image", {
      userId,
      imageId,
    });

    if (response.status !== 200) {
      throw new Error("Failed to delete image: " + response.status);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error deleting image:", errorMessage);
    throw new Error(errorMessage);
  }
}
