import axios from "axios";
import config from "../config";

const httpClient = axios.create({
  baseURL: config.apiUrl,
});

function RefreshAccessToken() {
  const rtk = localStorage.getItem("rtk");

  return axios
    .post(config.apiUrl + "/auth/getAccessToken/" + 1, {
      // Hardcoded as userId is 1
      refreshToken: rtk,
    })
    .then((response) => {
      localStorage.setItem("atk", response.data.data.accessToken);
      return response.data.data.accessToken;
    });
}

httpClient.interceptors.request.use((request) => {
  const token = localStorage.getItem("atk");
  if (token != null) {
    request.headers = {
      "x-access-token": "Bearer " + token,
    };
  } else {
    // ## Comment this else{} to DEV without back-end ##
    localStorage.clear();
    return (window.location.href = "/login");
  }
  return request;
});

// Response interceptor for API calls
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (!error.response) {
      // ## Comment this if{} to DEV without back-end ##
      console.log("Please check your connection.");
      localStorage.clear();
      return (window.location.href = "/login");
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = await RefreshAccessToken();
        axios.defaults.headers.common["x-access-token"] =
          "Bearer " + accessToken;
        return httpClient(originalRequest);
      } catch {
        // ## Comment this catch{} to DEV without back-end ##
        localStorage.clear();
        return (window.location.href =
          "/login?sessionExpired=true&nextpage=" + window.location.pathname);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
