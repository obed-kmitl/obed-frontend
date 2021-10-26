import { createContext } from "react";

const SectionContext = createContext({ section: {}, setSection: (sectionId) => {} });

export default SectionContext;
