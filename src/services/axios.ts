"use client";
import axios from "axios";

// ----------------|| Base Url ||-------------------

export const BASE_URL = "https://fleet-anteater-cleanly.ngrok-free.app/api/";

// -------------|| Axios Declaration ||-------------

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  },
  withCredentials: true
});
