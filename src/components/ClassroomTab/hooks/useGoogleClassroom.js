import { useState,useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import httpClient from "../../../utils/httpClient";
import { useContext } from "react";

const mockGoogleClassroom = [
  {
    id: 1,
    name: "ICT_1_2021",
    enrollmentCode: "rs3dpea",
  },
  {
    id: 2,
    name: "CEPP 2021",
    enrollmentCode: "abc5dfa",
  },
  {
    id: 3,
    name: "Project_64_1",
    enrollmentCode: "qd8aexa",
  },
  {
    id: 4,
    name: "OOP_2022_1",
    enrollmentCode: "dfa9edw",
  },
  {
    id: 5,
    name: "CEPP long name test 2021",
    enrollmentCode: "aejkda",
  },
  {
    id: 6,
    name: "Project_64_1",
    enrollmentCode: "qd863ea",
  },
  {
    id: 7,
    name: "OOP_2022_1",
    enrollmentCode: "qegedfa",
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
  const [allGClass, setAllGClass] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [googleActivity, setGoogleActivity] = useState();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const onCourseChange = e => {
    console.log(e.target.value)
    setSelectedCourse(e.target.value);
  };

  const onGoogleSuccess = async (response) => {
    try {
      await httpClient.post("/google/authorize", {
        userId: user.user_id, 
        code: response.code,
      });
      setAuthorized(true)
    } catch (err) {
      console.log(err);
    }
  };

  const listCourses = async () => {
    setLoading(true)
    try {
      const res = await httpClient.get(`/google/listCourses/${user.user_id}`);
      setAllGClass(res.data.data)
      setAuthorized(true)
    } catch (err) {
      setAuthorized(false)
      console.log(err);
    }
    setLoading(false)
  }

  useEffect(() => {
    listCourses();
    setGoogleActivity(mockGGact)
  }, [])

  return { allGClass,
    authorized, 
    onGoogleSuccess, 
    selectedCourse, 
    setSelectedCourse, 
    onCourseChange,
    googleActivity,
    loading
  }
};
