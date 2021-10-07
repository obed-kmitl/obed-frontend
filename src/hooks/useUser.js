import { useContext, useState } from "react";
import { useHistory } from "react-router";

import httpClient from "../utils/httpClient";
import UserContext from "../contexts/UserContext";

const useUser = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  function getProfile() {
    return httpClient.get("/user/getProfile").then(
      (response) => {
        setUser(response.data.data);
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
      }
    );
  }

  return { getProfile, message, loading };
};

export default useUser;
