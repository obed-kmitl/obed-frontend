import { useState, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import httpClient from "../../../utils/httpClient";
import { useContext } from "react";
import { useModal } from "../../../hooks";
import { useSectionContext } from "../../../contexts/SectionContext";
import { useForm } from "antd/lib/form/Form";
import { Modal } from "antd";

export const useGoogleClassroom = () => {
  const [allGClass, setAllGClass] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [googleActivity, setGoogleActivity] = useState();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [toAddActivityIndex, setToAddActivityIndex] = useState(-1);
  const { visibleModal, setVisibleModal } = useModal();
  const { section: sectionId } = useSectionContext();
  const [addToActivityForm] = useForm();
  const [cloList, setCloList] = useState([]);

  const onCourseChange = async (e) => {
    await listCourseWorks(e.target.value);
  };

  const onAddToActivity = async (index) => {
    setVisibleModal(true);
    setToAddActivityIndex(index);
  };

  const onCancelAddToActivity = async () => {
    setVisibleModal(false);
  };

  const addToActivity = async (formValue) => {
    try {
      await httpClient.post("/activity/createFromClassroom", {
        section_id: sectionId,
        title: googleActivity[toAddActivityIndex].title,
        detail: googleActivity[toAddActivityIndex].description,
        max_score: googleActivity[toAddActivityIndex].maxPoints,
        clos: formValue.clos,
        allowImportStudentScore: formValue.allowImportStudentScore || false,
        googleCourseId: googleActivity[toAddActivityIndex].courseId,
        googleCourseWorkId: googleActivity[toAddActivityIndex].id,
      });

      const newGoogleActivity = [...googleActivity];
      newGoogleActivity[toAddActivityIndex].disabled = true;
      setGoogleActivity(() => newGoogleActivity);
      setVisibleModal(false);
    } catch (err) {
      Modal.error({
        title: "Cannot add classwork to activity.",
      });
    }
  };

  const onGoogleSuccess = async (response) => {
    setLoading(true);
    try {
      console.log(response)
      await httpClient.post("/google/authorize", {
        userId: user.user_id,
        code: response.code,
      });
      await listCourses();
    } catch (err) {
      setAuthorized(false);
    }
    setLoading(false);
  };

  const listCourses = async () => {
    setLoading(true);
    try {
      const res = await httpClient.get(`/google/listCourses`);
      setAllGClass(res.data.data);
      setAuthorized(true);
    } catch (err) {
      setAuthorized(false);
    }
    setLoading(false);
  };

  const listCourseWorks = async (course) => {
    setLoading(true);
    setSelectedCourse(course);
    try {
      const res = await httpClient.get(`/google/listCourseWorks/${course.id}`);
      setGoogleActivity(res.data.data.map((each) => ({ ...each, disabled: false })));
    } catch (err) {
      setAuthorized(false);
    }
    setLoading(false);
  };

  async function fetchClo() {
    return await httpClient
      .get(`/clo/getAllBySection/${sectionId}`)
      .then((res) => {
        setCloList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (sectionId) {
      fetchClo();
    }
    // eslint-disable-next-line
  }, [sectionId]);

  useEffect(() => {
    listCourses();
  }, []);

  return {
    allGClass,
    authorized,
    onGoogleSuccess,
    selectedCourse,
    setSelectedCourse,
    onCourseChange,
    googleActivity,
    loading,
    onAddToActivity,
    onCancelAddToActivity,
    addToActivity,
    visibleModal,
    setVisibleModal,
    toAddActivityIndex,
    addToActivityForm,
    cloList,
  };
};
