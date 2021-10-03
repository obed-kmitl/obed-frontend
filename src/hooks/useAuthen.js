import { useState } from "react";
import { useHistory } from "react-router";

import axios from "axios";
import httpClient from "../utils/httpClient";
import config from "../config";

const useAuthen = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function onLogin(username, password) {
    return axios
      .post(config.apiUrl + "/auth/login", {
        username,
        password,
      })
      .then(
        (response) => {
          if (response.data.data.accessToken) {
            //   localStorage.setItem("user", JSON.stringify(response.data.data));
            localStorage.setItem("atk", response.data.data.accessToken);
            localStorage.setItem("rtk", response.data.data.refreshToken);
          }
          history.push("/");
          return response.data;
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setLoading(false);
        }
      );
  }

  function onLogout() {
    return httpClient.post("/auth/logout").then(history.push("/login"));
  }

  return { onLogin, onLogout, message, loading };
};

export default useAuthen;
