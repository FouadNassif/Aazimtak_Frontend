"use server";

import { cookies } from "next/headers";
import { LaravelInstance } from "./axios";


export async function login({ username, password }: { username: string, password: string }): Promise<string> {
    const axiosClient = await LaravelInstance();
    const response = await  axiosClient.post(
        "/login",
        {
            username: username,
            password: password,
        }
    )
    

    console.log(response);
  if (response.status != 200) {
    throw new Error("Login failed: " + response.status);
  }
  const data = response.data;
  const cookie = await cookies()
  cookie.set("token", data.token, {httpOnly: true});
  return data;
}


export async function checkAuth() : Promise<{authenticated : boolean, user : User | null}> {
    try {
        const axiosClient = await LaravelInstance();
    const response = await axiosClient.get("/check-auth");
    if (response.status != 200) {
        throw new Error("Failed to check auth: " + response.status);
    }
    return response.data;
} catch (err) {
    return {authenticated: false, user: null};
}
}


export async function logout() {
    const cookie = await cookies();
    cookie.set("token", "", {
        httpOnly: true,
        expires: new Date(0),  // Expire immediately
        path: "/",
    });
}