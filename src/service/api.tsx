import axios from "axios";

export const baseURl = `https://localhost:7146/api/`;

const axiosConfig = () => {
  const api = axios.create({
    baseURL: baseURl,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  return api;
};

export const api = axiosConfig();
