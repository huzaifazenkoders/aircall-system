"use client";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next/client";

// ----------------|| Base Url ||-------------------

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// -------------|| Axios Declaration ||-------------

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie("token");
      window.location.href = "/auth/sign-in";
    }
    return Promise.reject(error);
  }
);
