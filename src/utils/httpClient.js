import axios from "axios";
import config from "../config";

const httpClient = axios.create({
  // Important! credentials should be allow when communicate with api.
  // See more https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
  withCredentials: true,
  baseURL: config.apiUrl,
});

// Response interceptor for API calls
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (!error.response) {
      // ## Comment this if{} to DEV without back-end ##
      console.log("Please check your connection.");
      return (window.location.href = "/login");
    }
    if (error.response.status === 401) {
      return (window.location.href = "/login");
    }

    return Promise.reject(error);
  }
);

export default httpClient;
