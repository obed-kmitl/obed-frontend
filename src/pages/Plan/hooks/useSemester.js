import { message } from "antd";
import { useState, useEffect } from "react";
import httpClient from "../../../utils/httpClient";

export const useSemester = () => {
  const [allCurriculum, setAllCurriculum] = useState();
  const [allSemester, setAllSemester] = useState();
  const [selectedCurriculum, setSelectedCurriculum] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [allCourse, setAllCourse] = useState([]);
  const [addedCourse, setAddedCourse] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const [teacher, setTeacher] = useState();

  const [duplicateModalVisible, setDuplicateModalVisible] = useState(false);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    // console.log("targetKeys:", nextTargetKeys);
    // console.log("direction:", direction);
    // console.log("moveKeys:", moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    // console.log("sourceSelectedKeys:", sourceSelectedKeys);
    // console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  async function fetchAllCurriculum() {
    return await httpClient
      .get(`/curriculum/getAll`)
      .then((response) => {
        setAllCurriculum(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchAllCourse(value) {
    return await httpClient
      .get(`/course/getAllByCurriculum/${value}`)
      .then((response) => {
        const receivedCourses = response?.data.data.map((course) => ({
          key: course.course_id,
          course_id: course.course_id,
          curriculum_id: course.curriculum_id,
          course_number: course.course_number,
          course_name_en: course.course_name_en,
          course_name_th: course.course_name_th,
          disabled: false,
        }));
        setAllCourse(receivedCourses);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchAllTeacher() {
    return await httpClient
      .get(`/user/getAll`)
      .then((response) => {
        setTeacher(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchAllSemester(value) {
    return await httpClient
      .get(`/semester/getByCurriculum/${value}`)
      .then((response) => {
        setAllSemester(response.data.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //course ใช้เลือกใน Tranfer
  function onChangeCurriculum(value) {
    setSelectedCurriculum(value);
    fetchAllCourse(value);
    fetchAllSemester(value);
  }

  async function onChangeSemester(value) {
    return await httpClient
      .get(`/semester/get/${value}`)
      .then((response) => {
        setSelectedSemester(response.data.data);
        response.data.data.group_sections.forEach((g_sec) => {
            g_sec.sections.forEach((section) => {
                   section.teacher_list = section.teacher_list.map(e => e.user_id)
                })
        })
        setAddedCourse(
          response.data.data.group_sections.sort(
            ({ course_number: first }, { course_number: second }) =>
              first - second
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleAddCourse(targetKeys, semester_id) {
    return await httpClient
      .post(`semester/createGroupSections/${semester_id}`, {
        course_id_list: targetKeys,
      })
      .then((response) => {
        setAddedCourse(
          addedCourse
            .concat(
              response.data.data.map((course) => {
                return {
                  group_sec_id: course.group_sec_id,
                  semester_id: course.semester_id,
                  course_id: course.course_id,
                  curriculum_id: selectedCurriculum,
                  pre_course_id: null,
                  course_number: allCourse.filter(
                    (e) => e.course_id === course.course_id
                  )[0].course_number,
                  course_name_en: allCourse.filter(
                    (e) => e.course_id === course.course_id
                  )[0].course_name_en,
                  course_name_th: allCourse.filter(
                    (e) => e.course_id === course.course_id
                  )[0].course_name_th,
                  sections: [],
                };
              })
            )
            .sort(
              ({ course_number: first }, { course_number: second }) =>
                first - second
            )
        );
        setIsModalVisible(false);
        setTargetKeys([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleDeleteCourse(item) {
    return await httpClient
      .delete(`/semester/removeGroupSection/${item.group_sec_id}`)
      .then((response) => {
        setAddedCourse(
          addedCourse.filter(
            (course) => course.group_sec_id !== item.group_sec_id
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function duplicateYear() {
    return await httpClient
      .post(`/semester/duplicate`, {
        curriculum_id: selectedCurriculum,
      })
      .then((response) => {
        setDuplicateModalVisible(false);
        fetchAllSemester(selectedCurriculum);
        message.success("Duplicate Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function createSemester() {
    return await httpClient
      .post(`semester/create`, {
        curriculum_id: selectedCurriculum,
      })
      .then((response) => {
        setDuplicateModalVisible(false);
        fetchAllSemester(selectedCurriculum);
        message.success("Create Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchAllCurriculum();
    fetchAllTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const alreadyAddedCoursesId = addedCourse?.map((e) => e.course_id);
    allCourse.forEach((element) => {
      if (alreadyAddedCoursesId.includes(element.course_id)) {
        element.disabled = true;
      } else {
        element.disabled = false;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedCourse]);

  return {
    allSemester,
    allCurriculum,
    allCourse,
    addedCourse,
    selectedCurriculum,
    selectedSemester,
    onChangeCurriculum,
    onChangeSemester,
    handleAddCourse,
    isModalVisible,
    setIsModalVisible,
    targetKeys,
    selectedKeys,
    onChange,
    onSelectChange,
    handleDeleteCourse,
    teacher,
    duplicateYear,
    createSemester,
    duplicateModalVisible,
    setDuplicateModalVisible,
  };
};
