import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.MODE ==="development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true,  // set true if you use cookies across domains
});

export default API;
