"use server";

import { LaravelInstance } from "./axios";

interface UploadResponse {
  success: boolean;
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
  formData: FormData
): Promise<UploadResponse> {
  try {
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

    console.log('Upload response:', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('Upload error details:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      response: error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data 
        : null
    });
    
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
