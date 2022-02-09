import { useState, useEffect } from "react";
import httpClient from "../../../utils/httpClient";
import errorTranslate from "../../../utils/errorTranslate";

export const useStudent = () => {
  const [students, setStudents] = useState();
  const [message, setMessage] = useState("");

  async function getStudent(studentId) {
    return httpClient
      .get(`/student/get/${studentId}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function fetchStudents(sectionId) {
    return httpClient
      .get(`/student/getAllBySection/${sectionId}`)
      .then((response) => {
        setStudents(response);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function createStudents(values) {
    return httpClient
      .post(`/student/create`, {
        students: values,
      })
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function updateStudent(values, studentId) {
    return httpClient
      .put(`/student/update/${studentId}`, {
        prefix: values.prefix,
        student_number: values.student_number,
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

  async function removeStudent(studentId) {
    return httpClient
      .delete(`/student/remove/${studentId}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  return {
    students,
    getStudent,
    fetchStudents,
    createStudents,
    updateStudent,
    removeStudent,
    message,
    setMessage,
  };
};
