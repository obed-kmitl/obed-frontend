import { useContext, useState } from "react";
import { useHistory } from "react-router";

import axios from "axios";
import httpClient from "../utils/httpClient";
import config from "../config";
import UserContext from "../contexts/UserContext";

const useAuthen = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  function onLogin(username, password, next = "") {
    setLoading(true);
    return axios
      .post(config.apiUrl + "/auth/login", {
        username,
        password,
      })
      .then(
        (response) => {
          if (response.data.data.accessToken) {
            localStorage.setItem("atk", response.data.data.accessToken);
            localStorage.setItem("rtk", response.data.data.refreshToken);
            setUser(response.data.data.userProfile);
          }
          history.push(next === "" ? "/" : next);
          return response.data;
        },
        (error) => {
          let resMessage = "";
          switch (error.response.data.error.code) {
            case "UNAUTHORIZED":
              resMessage = "Wrong username or password.";
              break;
            case "INTERNAL_SERVER_ERROR":
              resMessage = "Something went wrong, Please check and try again.";
              break;
            default:
              resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              break;
          }
          setMessage(resMessage);
          setLoading(false);
        }
      );
  }

  function onAdminLogin(username, password, next = "") {
    setLoading(true);
    return axios
      .post(config.apiUrl + "/auth/adminLogin", {
        username,
        password,
      })
      .then(
        (response) => {
          if (response.data.data.accessToken) {
            localStorage.setItem("atk", response.data.data.accessToken);
            localStorage.setItem("rtk", response.data.data.refreshToken);
            setUser(response.data.data.userProfile);
          }
          history.push(next === "" ? "/" : next);
          return response.data;
        },
        (error) => {
          let resMessage = "";
          switch (error.response.data.error.code) {
            case "UNAUTHORIZED":
              resMessage = "Wrong username or password.";
              break;
            case "INTERNAL_SERVER_ERROR":
              resMessage = "Something went wrong, Please check and try again.";
              break;
            default:
              resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              break;
          }
          setMessage(resMessage);
          setLoading(false);
        }
      );
  }

  function onLogout() {
    return httpClient.post("/auth/logout").then(() => {
      localStorage.clear();
      setUser({});
      history.push("/login");
    });
  }

  return { onLogin, onAdminLogin, onLogout, message, loading };
};

export default useAuthen;
