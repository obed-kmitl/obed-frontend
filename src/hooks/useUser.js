import { useContext, useState } from "react";

import httpClient from "../utils/httpClient";
import UserContext from "../contexts/UserContext";

const useUser = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  function getProfile() {
    setLoading(true);
    return httpClient.get("/user/getProfile").then(
      (response) => {
        setUser(response.data.data);
        setLoading(false);
        return response.data.data;
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

  return { getProfile, message, loading };
};

export default useUser;
