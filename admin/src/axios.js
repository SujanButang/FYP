import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/admin",
  withCredentials: true,
});
