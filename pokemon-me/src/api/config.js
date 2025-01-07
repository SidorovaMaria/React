import axios from "axios";
export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});
// Interceptors for handling global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);
