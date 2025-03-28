"use server";

import { LaravelInstance } from "./axios";
import { DashboardResponse, AddWeddingRequest, AddWeddingResponse, GetAllWeddingsResponse } from '@/types/admindashboard';

export async function getAdminDashboard(): Promise<DashboardResponse | null> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/admin/dashboard");

    return response.data;
  } catch (err) {
    console.warn(
      "Error in getAdminDashboard API call:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return null; // Return null instead of an object with an unknown property
  }
}

export async function addWeddingAPI(
  formData: AddWeddingRequest
): Promise<AddWeddingResponse> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post(
      "/admin/dashboard/wedding/addwedding",
      formData
    );

    if (response.status !== 200) {
      throw new Error(`Failed to add wedding. HTTP Status: ${response.status}`);
    }

    return response.data;  // The response will be of type AddWeddingResponse
  } catch (err) {
    console.error(
      "Error in addWeddingAPI API call:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return {
      status: false,
      message: "Failed to add wedding. Please try again later.",
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function getAllWedding(): Promise<GetAllWeddingsResponse> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/admin/dashboard/wedding/getAll");

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch weddings. HTTP Status: ${response.status}`
      );
    }

    return response.data as GetAllWeddingsResponse;  // Cast the response data to the expected type
  } catch (err) {
    console.error(
      "Error in getAllWedding API call:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return {
      status: false,
      message: "Failed to fetch weddings. Please try again later.",
    };
  }
}
