import { useState } from "react";
import httpClient from "../../../utils/httpClient";
import errorTranslate from "../../../utils/errorTranslate";

export const useTeacherReport = () => {
  const [reportData, setReportData] = useState();
  const [message, setMessage] = useState("");

  async function getReport(sectionId) {
    return httpClient
      .get(`/report/getReportBySection/${sectionId}`)
      .then((response) => {
        setReportData(response.data.data);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function saveReport(values) {
    return httpClient
      .post(`/report/save`, values)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  return { reportData, getReport, saveReport, message };
};
