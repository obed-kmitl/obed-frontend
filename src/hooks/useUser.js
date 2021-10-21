import { useContext, useState } from "react";

import httpClient from "../utils/httpClient";
import UserContext from "../contexts/UserContext";

const useUser = () => {
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);

  function getProfile() {
    return httpClient.get("/user/getProfile").then(
      (response) => {
        setUser(response.data.data);
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
