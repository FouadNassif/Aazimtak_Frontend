"use server";

import { cookies } from "next/headers";
import { LaravelInstance } from "./axios";

export async function getWeddingCardDetails({
  wedding_id,
  guest_name,
  groom_name,
  bride_name,
}: {
  wedding_id: number;
  guest_name: string;
  groom_name: string;
  bride_name: string;
}): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/wedding/showWeddingCard", {
      wedding_id: wedding_id,
      guest_name: guest_name,
      groom_name: groom_name,
      bride_name: bride_name,
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

export async function setAttendance({
  guest_name,
  attending,
  message,
}: {
  guest_name: string;
  attending: string;
  message: string;
}): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/wedding/setAttendance", {
      guest_name: guest_name,
      attending: attending,
      message: message,
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
