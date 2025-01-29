"use server";
import { LaravelInstance } from "./axios";

async function handleRequest(endpoint: string, data: object): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post(endpoint, data);

    if (response.status !== 200) {
      throw new Error(
        `Request to ${endpoint} failed. HTTP Status: ${response.status}`
      );
    }

    return response.data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Error in API call to ${endpoint}:`, errorMessage);
    throw new Error(errorMessage);
  }
}

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
  return await handleRequest("/wedding/showWeddingCard", {
    wedding_id,
    guest_name,
    groom_name,
    bride_name,
  });
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
  return await handleRequest("/wedding/setAttendance", {
    guest_name,
    attending,
    message,
  });
}
