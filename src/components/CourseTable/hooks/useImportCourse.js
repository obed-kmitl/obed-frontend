export const useImportCourse = (setValid) => {
  const getCourseListFromExcel = (data) => {
    const courses = data;
    const checkValid = (ele) => Object.keys(ele).length !== 3;
    const valid = !courses.some(checkValid);

    if (courses[0] && valid) {
      return courses;
    } else {
      setValid(false);
      return [];
    }
  };

  return { getCourseListFromExcel };
};
