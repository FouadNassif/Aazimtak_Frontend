"use server";

import { cookies } from "next/headers";
import { LaravelInstance } from "./axios";

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
      throw new Error("Failed to fetch dashboard data: " + response.status);
    }

    return response.data; // Return the dashboard data
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error fetching dashboard data:", errorMessage);
    throw new Error(errorMessage); // Throw only the error message
  }
}
