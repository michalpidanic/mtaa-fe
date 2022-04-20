import axios from "axios";
import axiosInstance from "./src/services/HttpRequestInterceptor";

export default axios.create({
  baseURL: `http://localhost:8000/`,
});
