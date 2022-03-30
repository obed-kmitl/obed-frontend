import { useState,useEffect } from "react";
import httpClient from "../../../utils/httpClient";

const mockGoogleClassroom = [
  {
    id: 1,
    googleClassroom_name: "ICT_1_2021",
    googleClassroom_code: "rs3dpea",
  },
  {
    id: 2,
    googleClassroom_name: "CEPP 2021",
    googleClassroom_code: "abc5dfa",
  },
  {
    id: 3,
    googleClassroom_name: "Project_64_1",
    googleClassroom_code: "qd8aexa",
  },
  {
    id: 4,
    googleClassroom_name: "OOP_2022_1",
    googleClassroom_code: "dfa9edw",
  },
  {
    id: 5,
    googleClassroom_name: "CEPP long name test 2021",
    googleClassroom_code: "aejkda",
  },
  {
    id: 6,
    googleClassroom_name: "Project_64_1",
    googleClassroom_code: "qd863ea",
  },
  {
    id: 7,
    googleClassroom_name: "OOP_2022_1",
    googleClassroom_code: "qegedfa",
  },

];

const mockGGact = [
  {
    id: 1,
    title: "homework 1",
    detail: "detail bla bla bla..."
  },
  {
    id: 2,
    title: "homework 2",
    detail: "detail bla bla bla..."
  },
  {
    id: 3,
    title: "homework 3",
    detail: "detail bla bla bla..."
  },
  {
    id: 4,
    title: "homework 4",
    detail: "detail bla bla bla..."
  }
]

export const useGoogleClassroom = () => {
  const [googleCode, setGoogleCode] = useState();
  const [allGClass, setAllGClass] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [googleActivity, setGoogleActivity] = useState()

  const loginSuccessHandle = async (code) => {
    console.log(code);
    await httpClient.post("/auth/googleAuthToken", {
      code: code,
    }).then(() => setGoogleCode(code.code));
  };

  const onCourseChange = e => {
    console.log(e.target.value)
    setSelectedCourse(e.target.value);
  };

  useEffect(() => {
    setAllGClass(mockGoogleClassroom)
    setGoogleActivity(mockGGact)
  }, [])



  return { googleCode, allGClass, loginSuccessHandle, selectedCourse, setSelectedCourse, onCourseChange,googleActivity }
};
