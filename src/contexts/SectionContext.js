import { createContext, useContext, useState,useEffect } from "react";

const SectionContext = createContext();
export const SECTION_CONTEXT_KEY = "sidkey"

export const SectionContextProvider = ({ children }) => {
    const [section, setSection] = useState();

    useEffect(() => {
        const sectionId = JSON.parse(localStorage.getItem(SECTION_CONTEXT_KEY))
        setSection(sectionId)
    }, [])
    
    const handleSetSection = (section_id) => {
        setSection(section_id)
        localStorage.setItem(SECTION_CONTEXT_KEY,JSON.stringify(section_id))
    }
    return <SectionContext.Provider value={{ section, setSection:handleSetSection }}>{children}</SectionContext.Provider>
}

export const useSectionContext = () => {
    return useContext(SectionContext)
}