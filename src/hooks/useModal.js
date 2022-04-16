import { useState } from "react";

const useModal = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  return {
    visibleModal,
    setVisibleModal,
  };
};

export default useModal;
