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

export async function getDashboardData({
  userId,
}: {
  userId: number;
}): Promise<any> {
  return await handleRequest("/dashboard", { userId });
}

export async function getAllGuests({
  userId,
}: {
  userId: number;
}): Promise<any> {
  console.log(`Fetching guests for userId: ${userId}`);
  return await handleRequest("/dashboard/guests", { userId });
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
}): Promise<any> {
  return await handleRequest("/dashboard/guests/add", {
    userId,
    guestName,
    numberOfPeople,
    numberOfKids,
  });
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
}): Promise<any> {
  return await handleRequest("/dashboard/guests/edit", {
    guestId,
    guestName,
    numberOfPeople,
    numberOfKids,
  });
}

export async function deleteGuest({
  guestId,
}: {
  guestId: number;
}): Promise<any> {
  return await handleRequest("/dashboard/guests/delete", {
    guestId,
  });
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
}): Promise<any> {
  return await handleRequest("/dashboard/account/edit", {
    userId,
    username,
    old_password,
    password,
  });
}

export async function getWeddingData({
  userId,
}: {
  userId: number;
}): Promise<any> {
  return await handleRequest("/dashboard/wedding/getData", { userId });
}

export async function saveWeddingData({
  userId,
  weddingData,
}: {
  userId: number;
  weddingData: object;
}): Promise<any> {
  return await handleRequest("/dashboard/wedding/saveData", {
    userId,
    weddingData,
  });
}
