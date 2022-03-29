export const useImportStudent = (sectionId, setValid) => {
  const getStudentListFromExcel = (data, currentList = []) => {
    let students = [];
    let duplicate = [];
    let checkList = [];
    let temp = data.filter((ele) => !isNaN(ele?.__EMPTY));

    // Create list of current student number
    currentList.length !== 0 && currentList.forEach((ele) => {
      checkList.push(parseInt(ele.student_number));
    });

    temp.forEach((ele) => {
      if (typeof ele.__EMPTY_2 === "string") {
        const name = ele.__EMPTY_2.trim().split("  ");
        // Check if student number is exist
        if (checkList.includes(ele.__EMPTY_1)) {
          duplicate.push({
            prefix: name[0].startsWith("นาย") ? "นาย" : "นางสาว",
            firstname: name[0].replace("นาย", "").replace("นางสาว", ""),
            lastname: name[1],
            student_number: ele.__EMPTY_1,
          });
        } else {
          students.push({
            section_id: parseInt(sectionId),
            prefix: name[0].startsWith("นาย") ? "นาย" : "นางสาว",
            firstname: name[0].replace("นาย", "").replace("นางสาว", ""),
            lastname: name[1],
            student_number: ele.__EMPTY_1,
          });
        }
      } else {
        setValid(false);
      }
    });
    return {
      validList: students,
      duplicate,
    };
  };

  return { getStudentListFromExcel };
};
