import axios from "axios";
import { cookies } from "next/headers";

export async function LaravelInstance() {
    const cookie = await cookies();
    const token =  cookie.get('token')?.value;
    const axiosInstance = axios.create({
            baseURL: "https://aazimtak-main-idj1ia.laravel.cloud/api ",
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