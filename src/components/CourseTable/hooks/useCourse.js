import { useState } from "react";
import httpClient from "../../../utils/httpClient";
import errorTranslate from "../../../utils/errorTranslate";

export const useCourse = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  async function getCourseByCurriculum(id) {
    return await httpClient
      .get(`/course/getAllByCurriculum/${id}`)
      .then((response) => {
        setCourses(response.data.data);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function createCourse(curriculum_id, values) {
    return await httpClient
      .post("/course/create", {
        curriculum_id: curriculum_id,
        course_number: values.course_number,
        course_name_en: values.course_name_en,
        course_name_th: values.course_name_th,
        pre_course_id:
          values.pre_course_id === null ? "" : values.pre_course_id,
        relative_standards: values.relative_standards,
      })
      .then((response) => {
        setCourses([...courses, response.data.data]);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function updateCourse(course_id, values) {
    return await httpClient
      .put(`/course/update/${course_id}`, {
        course_number: values.course_number,
        pre_course_id:
          values.pre_course_id === null ? -1 : values.pre_course_id,
        course_name_en: values.course_name_en,
        course_name_th: values.course_name_th,
        relative_standards: values.relative_standards,
      })
      .then((response) => {
        let newCourses = [...courses];
        newCourses = newCourses.map((ele) => {
          if (ele.course_id === course_id) {
            return {
              course_number: response.data.data.course_number,
              pre_course_id: response.data.data.pre_course_id,
              course_name_en: response.data.data.course_name_en,
              course_name_th: response.data.data.course_name_th,
            };
          }
          if (ele.pre_course_id === course_id) {
            return {
              course_number: ele.course_number,
              pre_course_id: response.data.data.course_id,
              course_name_en: ele.course_name_en,
              course_name_th: ele.course_name_th,
            };
          }
          return ele;
        });
        setCourses(newCourses);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function removeCourse(id) {
    return await httpClient
      .delete(`/course/remove/${id}`)
      .then((response) => {
        let newCourses = [...courses];
        newCourses = newCourses
          .filter((ele) => ele.course_id !== id)
          .filter((ele) => ele.pre_course_id !== id);
        setCourses(newCourses);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function getPlo(curriculumId) {
    return await httpClient
      .get(`/mapStandard/getRelativeStandard/${curriculumId}`)
      .then((response) => {
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  async function createAllCourse(curriculum_id, values) {
    const newValues = values.map((ele) => {
      return {
        ...ele,
        course_number: ele.course_number.trim(),
        curriculum_id,
      };
    });
    return await httpClient
      .post("/course/createAll", { courses: newValues })
      .then((response) => {
        setCourses([...courses, ...response.data.data.created_courses]);
        return Promise.resolve(response.data.data);
      })
      .catch((error) => {
        errorTranslate(error, setMessage);
        return Promise.reject(message);
      });
  }

  return {
    createCourse,
    updateCourse,
    removeCourse,
    getCourseByCurriculum,
    createAllCourse,
    getPlo,
    courses,
    message,
    setMessage,
  };
};
