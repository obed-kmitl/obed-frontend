import { useState } from "react";

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
];

export const useGoogleClassroom = () => {
  const [allGClass, setAllGClass] = useState(mockGoogleClassroom);
  const [selectedGClass, setselectedGClass] = useState(null);
  const [ggClassroomVisible, setggClassroomVisible] = useState(false);
  const [linkedGClass, setLinkedGClass] = useState(null);
  const [changeCard, setChangeCard] = useState(false);
  function handleAddGClass() {
    setggClassroomVisible(true);
  }
  function handleCardClick(id) {
    setselectedGClass(id);
  }
  function handleOk() {
    setLinkedGClass(allGClass.find((e) => e.id === selectedGClass) || null);
    setggClassroomVisible(false);
    setChangeCard(false);
  }
  function handleCancel(changeCard) {
    setselectedGClass(changeCard === true ? linkedGClass.id : null);
    setggClassroomVisible(false);
  }

  function handleChangeGClass() {
    setggClassroomVisible(true);
    setLinkedGClass(
      allGClass.find((e) => e.id === selectedGClass) || linkedGClass
    );
    setChangeCard(true);
  }
  function handleDeleteGClass() {
    setselectedGClass(null);
    setLinkedGClass(null);
  }

  return [
    allGClass,
    selectedGClass,
    ggClassroomVisible,
    handleAddGClass,
    handleOk,
    handleCancel,
    handleCardClick,
    linkedGClass,
    handleChangeGClass,
    changeCard,
    handleDeleteGClass,
  ];
};
