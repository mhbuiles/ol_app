import axios from "axios";

export const publicRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: import.meta.env.DEV
    ? {
        "Access-Control-Allow-Origin": "*",
      }
    : {},
});
