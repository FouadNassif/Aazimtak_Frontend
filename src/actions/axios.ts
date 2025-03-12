import axios from "axios";
import { cookies } from "next/headers";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function LaravelInstance() {
    const cookie = await cookies();
    const token =  cookie.get('token')?.value;
    const axiosInstance = axios.create({
            baseURL: apiUrl,
            withCredentials: true,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    axiosInstance.interceptors.response.use(
        response => { return response},
        error => {
            console.log("Response Error:", error);
            return Promise.reject(error);
        }
    )

    axiosInstance.interceptors.request.use(
        request => {
            return request;
        }
    )

    return axiosInstance
}