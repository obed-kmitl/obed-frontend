import { useState } from "react";
import httpClient from "../utils/httpClient";

export const useCourse = () => {
  const [courses, setCourses] = useState([]);

  async function getCourseByCurriculum(id) {
    return await httpClient
      .get(`/course/getAllByCurriculum/${id}`)
      .then((response) => {
        setCourses(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        const resMessage = error.message || error.toString();
        return resMessage;
      });
  }

  async function createCourse(curriculum_id, values) {
    return await httpClient
      .post("/course/create", {
        curriculum_id: curriculum_id,
        course_id: values.course_id,
        course_name_en: values.course_name_en,
        course_name_th: values.course_name_th,
        pre_course_id:
          values.pre_course_id === "" ? null : values.pre_course_id,
      })
      .then((response) => {
        setCourses([...courses, response]);
        return response.data.data;
      })
      .catch((error) => {
        const resMessage = error.message || error.toString();
        return resMessage;
      });
  }

  async function updateCourse(course_id, values) {
    return await httpClient
      .put(`/course/update/${course_id}`, {
        course_id: values.course_id,
        pre_course_id: values.pre_course_id,
        course_name_en: values.course_name_en,
        course_name_th: values.course_name_th,
      })
      .then((response) => {
        let newCourses = [...courses];
        newCourses = newCourses.map((ele) => {
          if (ele.course_id === course_id) {
            return {
              course_id: response.data.data.course_id,
              pre_course_id: response.data.data.pre_course_id,
              course_name_en: response.data.data.course_name_en,
              course_name_th: response.data.data.course_name_th,
            };
          }
          return ele;
        });
        setCourses(newCourses);
        return response.data.data;
      })
      .catch((error) => {
        const resMessage = error.message || error.toString();
        return resMessage;
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
        return response.data.data;
      })
      .catch((error) => {
        const resMessage = error.message || error.toString();
        return resMessage;
      });
  }

  return {
    createCourse,
    updateCourse,
    removeCourse,
    getCourseByCurriculum,
    courses,
  };
};
