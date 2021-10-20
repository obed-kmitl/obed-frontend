import { useState } from "react";
import httpClient from "../utils/httpClient";

export const useCurriculum = () => {
  const [message, setMessage] = useState("");
  const [curriculum, setCurriculum] = useState([]);

  async function create(values) {
    return await httpClient
      .post("/curriculum/create", {
        title: values.title,
        year: values.year,
      })
      .then((response) => {
        getAll();
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        const resMessage = error.message || error.toString();
        setMessage(resMessage);
        console.log(error);
        return Promise.reject(resMessage);
      });
  }

  async function get(id) {
    return await httpClient
      .get(`/curriculum/get/${id}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        const resMessage = error.message || error.toString();
        setMessage(resMessage);
        return Promise.reject(resMessage);
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
        const resMessage = error.message || error.toString();
        setMessage(resMessage);
        return Promise.reject(resMessage);
      });
  }

  async function update(id, values) {
    return await httpClient
      .put(`/curriculum/update/${id}`, {
        title: values.title,
      })
      .then((response) => {
        getAll();
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        const resMessage = error.message || error.toString();
        setMessage(resMessage);
        return Promise.reject(resMessage);
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
        const resMessage = error.message || error.toString();
        setMessage(resMessage);
        return Promise.reject(resMessage);
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
