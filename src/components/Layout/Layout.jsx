import styles from "./Layout.module.scss";
import Navbar from "./Navbar/Navbar";
import { useState } from 'react'
import SectionContext from "../../contexts/SectionContext";

function MyLayout({ children }) {
  const [section, setSection] = useState();
  return (
    <SectionContext.Provider value={{ section, setSection }}>
      <div className={styles.layout}>
        <Navbar />
        <div className={styles.container}>{children}</div>
      </div>
    </SectionContext.Provider>
  );
}
export { MyLayout as Layout };
