"use server";
import { LaravelInstance } from "./axios";
import { DashboardData, Guest, WeddingData, ApiResponse } from "./types";

async function handleRequest<T>(endpoint: string, data: object): Promise<ApiResponse<T>> {
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

export async function getDashboardData({
  userId,
}: {
  userId: number;
}): Promise<DashboardData> {
  const response = await handleRequest<DashboardData>("/dashboard", { userId });
  return response.data;
}

export async function getAllGuests({
  userId,
}: {
  userId: number;
}): Promise<Guest[]> {
  console.log(`Fetching guests for userId: ${userId}`);
  const response = await handleRequest<Guest[]>("/dashboard/guests", { userId });
  return response.data;
}

export async function addGuest({
  userId,
  guestName,
  numberOfPeople,
  numberOfKids,
}: {
  userId: number;
  guestName: string;
  numberOfPeople: number;
  numberOfKids: number;
}): Promise<Guest> {
  const response = await handleRequest<Guest>("/dashboard/guests/add", {
    userId,
    guestName,
    numberOfPeople,
    numberOfKids,
  });
  return response.data;
}

export async function editGuest({
  guestId,
  guestName,
  numberOfPeople,
  numberOfKids,
}: {
  guestId: number;
  numberOfPeople: number;
  numberOfKids: number;
  guestName: string;
}): Promise<Guest> {
  const response = await handleRequest<Guest>("/dashboard/guests/edit", {
    guestId,
    guestName,
    numberOfPeople,
    numberOfKids,
  });
  return response.data;
}

export async function deleteGuest({
  guestId,
}: {
  guestId: number;
}): Promise<void> {
  const response = await handleRequest<void>("/dashboard/guests/delete", {
    guestId,
  });
  return response.data;
}

export async function editAccount({
  userId,
  username,
  old_password,
  password,
}: {
  userId: number;
  username: string;
  old_password: string;
  password: string;
}): Promise<ApiResponse<null>> {
  const response = await handleRequest<ApiResponse<null>>("/dashboard/account/edit", {
    userId,
    username,
    old_password,
    password,
  });
  return response.data;
}

export async function getWeddingData({
  userId,
}: {
  userId: number;
}): Promise<WeddingData> {
  const response = await handleRequest<WeddingData>("/dashboard/wedding/getData", { userId });
  return response.data;
}

export async function saveWeddingData({
  userId,
  weddingData,
}: {
  userId: number;
  weddingData: object;
}): Promise<ApiResponse<null>> {
  const response = await handleRequest<ApiResponse<null>>("/dashboard/wedding/saveData", {
    userId,
    weddingData,
  });
  return response.data;
}
