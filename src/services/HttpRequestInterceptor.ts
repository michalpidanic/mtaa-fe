import axios from "axios";
import promise from "promise";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";
import StorageService from "../services/StorageService";

// Add a request interceptor
var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async function (config) {
    try {
      const authData = await AsyncStorage.getItem("@AuthData");
      const authDataJson = JSON.parse(authData);
      if (authDataJson) {
        var accessToken = authDataJson.accessToken;
      }
    } catch (error) {
      console.log(error);
    }

    if (accessToken) {
      if (config.method !== "OPTIONS") {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  function (error) {
    return promise.reject(error);
  }
);

export default axiosInstance;
