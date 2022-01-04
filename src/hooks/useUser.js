import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import httpClient from "../utils/httpClient";
import UserContext from "../contexts/UserContext";

const useUser = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);

  function getProfile(roles) {
    return httpClient.get("/user/getProfile").then(
      (response) => {
        const { role } = response.data.data;
        setUser(response.data.data);
        if (!roles.includes(role)) {
          if (role === "ADMIN") {
            history.push("/");
          } else history.push("/");
        }
        return Promise.resolve(response.data.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        return Promise.reject(resMessage);
      }
    );
  }

  return { getProfile, message };
};

export default useUser;
