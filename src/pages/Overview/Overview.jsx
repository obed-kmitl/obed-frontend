import { useParams } from "react-router-dom";

export const Overview = () => {
    let {sectionId} = useParams();
  return(
      <div>sectionId: {sectionId}</div>
  );
};
