import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: `${import.meta.env.VITE_NODE_ENDPOINT}/api/v1`,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
