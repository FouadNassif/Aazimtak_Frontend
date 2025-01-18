"use server";

import { cookies } from "next/headers";
import { LaravelInstance } from "./axios";

export async function getDashboardData({
  userId,
}: {
  userId: number;
}): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/dashboard", {
      userId: userId,
    });

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

export async function getAllGuests({
  userId,
}: {
  userId: number;
}): Promise<any> {
  console.log(userId);
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/dashboard/guests", {
      userId: userId,
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
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/dashboard/guests/add", {
      userId: userId,
      guestName: guestName,
      numberOfPeople: numberOfPeople,
      numberOfKids: numberOfKids,
    });

    if (response.status !== 200) {
      throw new Error("Failed to add guest: " + response.status);
    }

    return response.data; // Return the response data
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error adding guest:", errorMessage);
    throw new Error(errorMessage); // Throw only the error message
  }
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
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/dashboard/account/edit", {
      userId: userId,
      username: username,
      old_password: old_password,
      password: password,
    });

    if (response.status !== 200) {
      throw new Error("Failed to edit account: " + response.status);
    }

    return response.data; // Return the response data
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error editing account:", errorMessage);
    throw new Error(errorMessage); // Throw only the error message
  }
}

export async function getWeddingData({
  userId,
}: {
  userId: number;
}): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/dashboard/wedding/getData", {
      userId: userId,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch wedding data: " + response.status);
    }

    return response.data; // Return the response data
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error fetching wedding data:", errorMessage);
    throw new Error(errorMessage); // Throw only the error message
  }
}

export async function saveWeddingData({
  userId,
  weddingData,
}: {
  userId: number;
  weddingData: object;
}): Promise<any> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.post("/dashboard/wedding/saveData", {
      userId: userId,
      weddingData: weddingData,
    });

    if (response.status !== 200) {
      throw new Error("Failed to save wedding data: " + response.status);
    }
    return response.data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error saving wedding data:", errorMessage);
    throw new Error(errorMessage); // Throw only the error message
  }
}
