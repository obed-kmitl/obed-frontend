export const useImportStudent = (sectionId) => {
  const getStudentListFromExcel = (data) => {
    let students = [];
    let temp = data.filter((ele) => !isNaN(ele?.__EMPTY));

    temp.map((ele) => {
      const name = ele.__EMPTY_2.trim().split("  ");
      students.push({
        section_id: parseInt(sectionId),
        prefix: name[0].startsWith("นาย") ? "นาย" : "นางสาว",
        firstname: name[0].replace("นาย", "").replace("นางสาว", ""),
        lastname: name[1],
        student_number: ele.__EMPTY_1,
      });
    });
    return students;
  };

  return { getStudentListFromExcel };
};
