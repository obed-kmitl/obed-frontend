import { useState } from "react";
import httpClient from "../../../utils/httpClient";
import errorTranslate from "../../../utils/errorTranslate";

export const useTeacherReport = () => {
  const [message, setMessage] = useState("");

  async function getPLOSummaryBySection(sectionId) {
    return httpClient
      .get(`/summary/getPLOSummaryBySection/${sectionId}`)
      .then((response) => {
        const newData = response.data.data.sort((a, b) =>
          a.order_number.localeCompare(b.order_number)
        );
        return Promise.resolve(newData);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function getPLOSummaryByStudentAndSection(sectionId, studentId) {
    return httpClient
      .get(
        `/summary/getPLOSummaryByStudentAndSection/${sectionId}/${studentId}`
      )
      .then((response) => {
        const newData = response.data.data.sort((a, b) =>
          a.order_number.localeCompare(b.order_number)
        );
        return Promise.resolve(newData);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  return { getPLOSummaryBySection, getPLOSummaryByStudentAndSection };
};
