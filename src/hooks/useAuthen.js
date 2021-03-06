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
  const { user, setUser } = useContext(UserContext);

  function errorHandler(error) {
    let resMessage = "";
    if (error.response && error.response.data) {
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
    } else {
      setMessage(
        "Cannot connect to server, Please check connection and try again."
      );
      setLoading(false);
    }
  }

  function onLogin(username, password, next = "") {
    setLoading(true);
    setMessage("");
    return axios
      .post(
        config.apiUrl + "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then(
        (response) => {
          if (response.data.data) {
            setUser(response.data.data.userProfile);
          }
          history.push(next === "" ? "/" : next);
          return response.data;
        },
        (error) => {
          errorHandler(error);
        }
      );
  }

  function onAdminLogin(username, password, next = "") {
    setLoading(true);
    setMessage("");
    return axios
      .post(
        config.apiUrl + "/auth/adminLogin",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then(
        (response) => {
          if (response.data.data) {
            setUser(response.data.data.userProfile);
          }
          history.push(next === "" ? "/" : next);
          return response.data;
        },
        (error) => {
          errorHandler(error);
        }
      );
  }

  function onLogout() {
    return httpClient
      .post(`/auth/logout/${user.user_id}`)
      .then((res) => {
        if (user.role === "ADMIN") {
          setUser({});
          history.push("/admin");
        } else {
          setUser({});
          history.push("/login");
        }
      })
      .catch(() => {
        history.push("/login");
      });
  }

  return { onLogin, onAdminLogin, onLogout, message, loading };
};

export default useAuthen;
