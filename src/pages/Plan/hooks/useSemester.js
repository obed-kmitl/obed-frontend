import { useState, useEffect } from "react"
import httpClient from "../../../utils/httpClient"

export const useSemester = () => {

    const [allCurriculum, setAllCurriculum] = useState()
    const [allSemester, setAllSemester] = useState()
    const [selectedCurriculum, setSelectedCurriculum] = useState();
    const [selectedSemester, setSelectedSemester] = useState()
    const [allCourse, setAllCourse] = useState([])
    const [addedCourse, setAddedCourse] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);


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
                setAllCurriculum(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function fetchAllCourse(value) {
        return await httpClient
            .get(`/course/getAllByCurriculum/${value}`)
            .then((response) => {
                console.log(response.data.data)
                const receivedCourses = response?.data.data.map((course) => ({
                    key: course.course_id,
                    course_id: course.course_id,
                    curriculum_id: course.curriculum_id,
                    course_number: course.course_number,
                    course_name_en: course.course_name_en,
                    course_name_th: course.course_name_th,
                    disabled: false
                }))
                setAllCourse(receivedCourses);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //course ใช้เลือกใน Tranfer
    function onChangeCurriculum(value) {
        setSelectedCurriculum(value)
        setAllSemester([
            {
                semester_id: 1,
                year_number: 2021,
                semester_number: 1,
            },
            {
                semester_id: 2,
                year_number: 2021,
                semester_number: 2,
            },
            {
                semester_id: 3,
                year_number: 2021,
                semester_number: 3,
            },
            {
                semester_id: 4,
                year_number: 2022,
                semester_number: 1,
            },
            {
                semester_id: 5,
                year_number: 2022,
                semester_number: 2,
            },
            {
                semester_id: 6,
                year_number: 2022,
                semester_number: 3,
            }
        ])
        fetchAllCourse(value)
        // return await httpClient
        //     .get(`/course/getAllByCurriculum/${value}`)
        //     .then((response) => {
        //         console.log(response.data.data)
        //         const receivedCourses = response?.data.data.map((course) => ({
        //             key: course.course_id,
        //             course_id: course.course_id,
        //             curriculum_id: course.curriculum_id,
        //             course_number: course.course_number,
        //             course_name_en: course.course_name_en,
        //             course_name_th: course.course_name_th,
        //             disabled: false
        //         }))
        //         setAllCourse(receivedCourses);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    async function onChangeSemester(value) {
        return await httpClient.get(`/semester/get/${value}`)
            .then((response) => {
                //console.log(response.data.data)
                setSelectedSemester(response.data.data)
                setAddedCourse(response.data.data.group_sections.sort(({ course_number: first }, { course_number: second }) => first - second))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function handleAddCourse(targetKeys, semester_id) {
        console.log(targetKeys, semester_id)
        return await httpClient
            .post(`semester/createGroupSections/${semester_id}`, {
                course_id_list: targetKeys
            })
            .then((response) => {
                console.log(addedCourse);
                console.log(response.data.data)
                setAddedCourse(addedCourse.concat(response.data.data.map(course => {
                    return (
                        {
                            group_sec_id: course.group_sec_id,
                            semester_id: course.semester_id,
                            course_id: course.course_id,
                            curriculum_id: selectedCurriculum,
                            pre_course_id: null,
                            course_number: allCourse.filter((e) => e.course_id === course.course_id)[0].course_number,
                            course_name_en: allCourse.filter((e) => e.course_id === course.course_id)[0].course_name_en,
                            course_name_th: allCourse.filter((e) => e.course_id === course.course_id)[0].course_name_th,
                            sections: []
                        }
                    )
                })).sort(({ course_number: first }, { course_number: second }) => first - second)
                )
                setIsModalVisible(false)
                setTargetKeys([]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function handleDeleteCourse(item) {
        return await httpClient.delete(`/semester/removeGroupSection/${item.group_sec_id}`)
            .then((response) => {
                setAddedCourse(addedCourse.filter((course) => course.group_sec_id !== item.group_sec_id))
            })
            .catch((error) => {
                console.log(error);
            });
        // setCourseList((courseList) => [...courseList, item]);
        // setCourseList((courseList) =>
        //   courseList.sort((a, b) =>
        //     a.course_id > b.course_id ? 1 : b.course_id > a.course_id ? -1 : 0
        //   )
        // );
        // setCourses(courses.filter((course) => course.course_id !== item.course_id));
    };



    useEffect(() => {
        fetchAllCurriculum();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     console.log(selectedSemester);
    //     console.log(allCourse)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectedSemester]);

    // useEffect(() => {
    //     console.log(addedCourse)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [addedCourse]);

    useEffect(() => {

        const alreadyAddedCoursesId = addedCourse?.map((e) => e.course_id)
        //console.log(allCourse,alreadyAddedCoursesId)
        //let newAllCourses =[...allCourse]
        allCourse.forEach(element => {
            if (alreadyAddedCoursesId.includes(element.course_id)) {
                element.disabled = true
            } else {
                element.disabled = false
            }
        });
    }, [addedCourse]);


    return [
        allSemester,
        allCurriculum,
        allCourse,
        //setAllCourse,
        addedCourse,
        setAddedCourse,
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
        handleDeleteCourse

    ]
}
