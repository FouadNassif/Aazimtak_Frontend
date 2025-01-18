"use server";

import { cookies } from "next/headers";
import { LaravelInstance } from "./axios";

export async function getWeddingCardDetails({
  wedding_id,
}: {
  wedding_id: number;
}): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/wedding/showWeddingCard", {
      wedding_id: wedding_id,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch guests data: " + response.status);
    }

    return response.data; // Return the dashboard data
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error fetching guests data:", errorMessage);
    throw new Error(errorMessage); // Throw only the error message
  }
}
