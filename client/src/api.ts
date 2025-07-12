import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // backend portu
});

export default api;
