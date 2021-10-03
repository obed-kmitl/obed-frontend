import axios from "axios";
import config from "../config";

const httpClient = axios.create({
  baseURL: config.apiUrl,
});

httpClient.interceptors.request.use((request) => {
  const token = localStorage.getItem("atk");
  if (token != null) {
    request.headers = {
      "x-access-token": "Bearer " + token,
    };
  }
  return request;
});
export default httpClient;
