import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/obed/api/user/";

const getAllUsers = () => {
  return axios.get(API_URL + "getAllUsers");
};

const getProfile = () => {
  return axios.get(API_URL + "getProfile", { headers: authHeader() });
};

export default {
  getAllUsers,
  getProfile,
};