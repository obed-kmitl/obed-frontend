import { useState } from "react";
import httpClient from "../../../utils/httpClient";
import errorTranslate from "../../../utils/errorTranslate";

export const useAdminGraph = () => {
  const [message, setMessage] = useState("");

  async function getCurriculumList() {
    return httpClient
      .get("/curriculum/getAll")
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function getPLOSummaryByCourseAndSemester(courseId, semesterId) {
    return httpClient
      .get(
        `/summary/getPLOSummaryByCourseAndSemester/${courseId}/${semesterId}`
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

  async function getPLOSummaryByStudentNumberAndCurriculum(
    curriculumId,
    studentId
  ) {
    return httpClient
      .get(
        `/summary/getPLOSummaryByStudentNumberAndCurriculum/${curriculumId}/${studentId}`
      )
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function getPLOSummaryByCurriculum(curriculumId) {
    return httpClient
      .get(`/summary/getPLOSummaryByCurriculum/${curriculumId}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function getPLOSummaryByCohortAndCurriculum(curriculumId, cohort) {
    return httpClient
      .get(
        `/summary/getPLOSummaryByCohortAndCurriculum/${curriculumId}/${cohort}`
      )
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function getSemesterDropdown(curriculumId) {
    return httpClient
      .get(`/dropdown/semester/${curriculumId}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function getCourseDropdown(semesterId) {
    return httpClient
      .get(`/dropdown/course/${semesterId}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function getStudentDropdown(curriculumId) {
    return httpClient
      .get(`/dropdown/studentNumber/${curriculumId}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  return {
    message,
    getPLOSummaryByCourseAndSemester,
    getPLOSummaryByStudentNumberAndCurriculum,
    getPLOSummaryByCurriculum,
    getPLOSummaryByCohortAndCurriculum,
    getCurriculumList,
    getSemesterDropdown,
    getCourseDropdown,
    getStudentDropdown,
  };
};
