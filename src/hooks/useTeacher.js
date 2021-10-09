import { useState, useEffect } from "react";
import httpClient from "../utils/httpClient";

export const useTeacher = (form) => {
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

  function setErrorMessage(error) {
    const resMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    setMessage(resMessage);
  }

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
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  async function register(values) {
    return httpClient
      .post(`/auth/register`, {
        email: values.email,
        username: values.username,
        prefix: values.prefix,
        firstname: values.firstname,
        lastname: values.lastname,
      })
      .then((response) => {
        form.resetFields();
        return response;
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  async function editTeacher(values) {
    let res = await httpClient
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
              id: res.data.data.user_id,
              email: res.data.data.email,
              username: res.data.data.username,
              prefix: getThPrefix[res.data.data.prefix],
              firstname: res.data.data.firstname,
              lastname: res.data.data.lastname,
            };
          }
          return value;
        });
        setTeachers(() => newTeacher);
        return response;
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  async function deleteTeacher(values) {
    return await httpClient.delete(`/user/remove/${values.id}`);
  }

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    teachers,
    setTeachers,
    register,
    editTeacher,
    deleteTeacher,
    message,
    setMessage,
  ];
};
