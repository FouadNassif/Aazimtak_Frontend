"use server";

import { cookies } from "next/headers";
import { LaravelInstance } from "./axios";

export async function login({
  nameEmail,
  password,
}: {
  nameEmail: string;
  password: string;
}): Promise<string> {
  const axiosClient = await LaravelInstance();
  const response = await axiosClient.post("/login", {
    username_or_email: nameEmail,
    password: password,
  });

  console.log(response);
  if (response.status != 200) {
    throw new Error("Login failed: " + response.status);
  }
  const data = response.data;
  const cookie = await cookies();
  cookie.set("token", data.token, { httpOnly: true });
  return data;
}

export async function test(){
  const axiosClient = await LaravelInstance();
  const response = await axiosClient.get("/test");
  console.log(response);
  return response;
}

export async function signup({
  username,
  password,
  email,
  phonenumber
}: {
  username: string;
  password: string;
  email: string;
  phonenumber: string;
}): Promise<string> {
  const axiosClient = await LaravelInstance();
  const response = await axiosClient.post("/signup", {
    username: username,
    password: password,
    email: email,
    phonenumber: phonenumber
  });
  if (response.status != 201) {
    throw new Error("Login failed: " + response.status);
  }
  const data = response.data;
  const cookie = await cookies();
  cookie.set("token", data.token, { httpOnly: true });
  return data;
}

export async function checkAuth(): Promise<{
  authenticated: boolean;
  user: User | null;
}> {
  try {
    const axiosClient = await LaravelInstance();
    const response = await axiosClient.get("/check-auth");
    if (response.status != 200) {
      throw new Error("Failed to check auth: " + response.status);
    }
    return response.data;
  } catch (err) {
    console.log(err)
    return { authenticated: false, user: null };
  }
}

export async function logout() {
  const cookie = await cookies();
  cookie.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}
