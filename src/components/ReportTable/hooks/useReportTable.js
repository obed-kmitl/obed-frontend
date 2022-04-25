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
        const newData = response.data.data.sort((a, b) =>
          a.order_number.localeCompare(b.order_number)
        );
        setReportData(newData);
        return Promise.resolve(newData);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  return { getSectionReport, reportData };
};
