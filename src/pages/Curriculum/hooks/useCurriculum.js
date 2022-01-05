import { useState } from "react";
import errorTranslate from "../../../utils/errorTranslate";
import httpClient from "../../../utils/httpClient";

export const useCurriculum = () => {
  const [message, setMessage] = useState("");
  const [curriculum, setCurriculum] = useState([]);

  async function create(values) {
    return await httpClient
      .post("/curriculum/create", {
        title: values.title,
        university: values.university,
        faculty: values.faculty,
        department: values.department,
      })
      .then((response) => {
        getAll();
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function get(id) {
    return await httpClient
      .get(`/curriculum/get/${id}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function getAll() {
    return await httpClient
      .get(`/curriculum/getAll`)
      .then((response) => {
        setCurriculum(response.data.data);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function update(id, values) {
    return await httpClient
      .put(`/curriculum/update/${id}`, {
        title: values.title,
        university: values.university,
        faculty: values.faculty,
        department: values.department,
      })
      .then((response) => {
        getAll();
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function remove(id) {
    return await httpClient
      .delete(`/curriculum/remove/${id}`)
      .then((response) => {
        getAll();
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  return {
    create,
    get,
    getAll,
    update,
    remove,
    message,
    setMessage,
    curriculum,
  };
};
