"use server";

import { LaravelInstance } from "./axios";

export async function getAdminDashboard(): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/admin/dashboard");

    return response.data;
  } catch (err) {
    console.warn(
      "Error in getAdminDashboard API call:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return { status: false, message: "Error fetching dashboard data" };
  }
}

export async function addWeddingAPI(
  formData: Record<string, any>
): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post(
      "/admin/dashboard/wedding/addwedding",
      formData
    );

    if (response.status !== 200) {
      throw new Error(`Failed to add wedding. HTTP Status: ${response.status}`);
    }

    return response.data;
  } catch (err) {
    console.error(
      "Error in addWeddingAPI API call:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return {
      status: false,
      message: "Failed to add wedding. Please try again later.",
    };
  }
}

export async function getAllWedding(): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/admin/dashboard/wedding/getAll");

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch weddings. HTTP Status: ${response.status}`
      );
    }

    return response.data;
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
