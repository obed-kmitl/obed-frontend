import { useState } from "react";
import httpClient from "../../../utils/httpClient";
import errorTranslate from "../../../utils/errorTranslate";

export const useReportTable = () => {
  const [reportData, setReportData] = useState();
  const [message, setMessage] = useState("");

  async function getSectionReport(sectionId) {
    return httpClient
      .get(`/summary/getCLOSummaryBySection/${sectionId}`)
      .then((response) => {
        setReportData(response.data.data);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  return { getSectionReport, reportData };
};
