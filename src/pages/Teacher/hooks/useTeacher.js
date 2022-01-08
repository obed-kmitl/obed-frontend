import { useState, useEffect } from "react";
import httpClient from "../../../utils/httpClient";
import errorTranslate from "../../../utils/errorTranslate";

export const useTeacher = () => {
  const [teachers, setTeachers] = useState();
  const [message, setMessage] = useState("");

  const getEnPrefix = {
    "ศ.ดร.": "PROF_DR",
    "ศ.": "PROF",
    "รศ.ดร.": "ASSOC_PROF_DR",
    "รศ.": "ASSOC_PROF",
    "ผศ.ดร.": "ASST_PROF_DR",
    "ผศ.": "ASST_PROF",
    "ดร.": "DR",
    "อ.": "INSTRUCTOR",
  };
  const getThPrefix = {
    PROF_DR: "ศ.ดร.",
    PROF: "ศ.",
    ASSOC_PROF_DR: "รศ.ดร.",
    ASSOC_PROF: "รศ.",
    ASST_PROF_DR: "ผศ.ดร.",
    ASST_PROF: "ผศ.",
    DR: "ดร.",
    INSTRUCTOR: "อ.",
  };

  async function fetchAllUsers() {
    const getThPrefix = {
      PROF_DR: "ศ.ดร.",
      PROF: "ศ.",
      ASSOC_PROF_DR: "รศ.ดร.",
      ASSOC_PROF: "รศ.",
      ASST_PROF_DR: "ผศ.ดร.",
      ASST_PROF: "ผศ.",
      DR: "ดร.",
      INSTRUCTOR: "อ.",
    };

    return await httpClient
      .get("/user/getAll")
      .then((response) => {
        setTeachers(
          response?.data.data.map((user) => ({
            id: user.user_id,
            prefix: getThPrefix[user.prefix],
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
          }))
        );
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function register(values) {
    return httpClient
      .post(`/auth/register`, {
        email: values.email,
        username: values.username,
        prefix: getEnPrefix[values.prefix],
        firstname: values.firstname,
        lastname: values.lastname,
      })
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function editTeacher(values) {
    return await httpClient
      .put(`/user/update/${values.id}`, {
        email: values.email,
        username: values.username,
        prefix: getEnPrefix[values.prefix],
        firstname: values.firstname,
        lastname: values.lastname,
      })
      .then((response) => {
        let newTeacher = [...teachers];
        newTeacher = newTeacher.map((value) => {
          if (value.id === values.id) {
            return {
              id: response.data.data.user_id,
              email: response.data.data.email,
              username: response.data.data.username,
              prefix: getThPrefix[response.data.data.prefix],
              firstname: response.data.data.firstname,
              lastname: response.data.data.lastname,
            };
          }
          return value;
        });
        setTeachers(newTeacher);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function deleteTeacher(values) {
    return await httpClient
      .delete(`/user/remove/${values.id}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    teachers,
    fetchAllUsers,
    setTeachers,
    register,
    editTeacher,
    deleteTeacher,
    message,
    setMessage,
  ];
};
