import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/obed/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  return axios
    .get(API_URL + "logout", { headers: authHeader() })
    .then((response) => {
      if (response.success) {
        localStorage.removeItem("user");
      }
      return response.message;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
