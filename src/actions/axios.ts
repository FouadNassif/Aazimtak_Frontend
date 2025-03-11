import axios from "axios";
import { cookies } from "next/headers";

export async function LaravelInstance() {
    const cookie = await cookies();
    const token =  cookie.get('token')?.value;
    const axiosInstance = axios.create({
            baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    axiosInstance.interceptors.response.use(
        response => {console.log("Response:", response); return response},
        error => {
            console.log("Response Error:", error);
            return Promise.reject(error);
        }
    )

    axiosInstance.interceptors.request.use(
        request => {
            console.log("Request:", request);
            return request;
        }
    )

    return axiosInstance
}