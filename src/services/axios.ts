"use client";
import axios from "axios";
import { getCookie } from "cookies-next/client";

// ----------------|| Base Url ||-------------------

export const BASE_URL = "http://localhost:5000/api/";
// export const BASE_URL = "https://fleet-anteater-cleanly.ngrok-free.app/api/";

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
