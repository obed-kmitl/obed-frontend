import { useState, useEffect } from 'react'

import httpClient from '../../../utils/httpClient';

export const useMappingStandard = (selectedCurriculum) => {
    const [standardList, setStandardList] = useState([])

    const [mainStdId, setMainStdId] = useState();
    const [relativeStdId, setRelativeStdId] = useState()


    const [mainStandard, setMainStandard] = useState([])
    const [relativeStandard, setRelativeStandard] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [mapping, setMapping] = useState({})

    async function fetchAllStandards() {
        return await httpClient
            .get(`/standard/getAllByCurriculum/${selectedCurriculum}`)
            .then((response) => {
                const receivedStandard = response?.data.data.map((std) => ({
                    id: std.standard_id,
                    standardTitle: std.title,
                    curriculumId: std.curriculum_id,
                    details: std.group_sub_standards.map((groupSubStd) => ({
                        groupSubStdId: groupSubStd.group_sub_std_id,
                        standardId: groupSubStd.standard_id,
                        standardNo: groupSubStd.order_number,
                        standardName: groupSubStd.title,
                        subStandard: groupSubStd.sub_standards.map((subStd) => ({
                            groupSubStdId: subStd.group_sub_std_id,
                            subStandardId: subStd.sub_std_id,
                            subStandardNo: subStd.order_number,
                            subStandardName: subStd.title,
                            mapping: []
                        }))
                    }))
                }))
                setStandardList(receivedStandard)
                console.log(receivedStandard)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function fetchMapping() {
        return await httpClient
            .get(`/mapStandard/get/${selectedCurriculum}`)
            .then((response) => {
                console.log(standardList)
                console.log(response.data.data);
                setMapping(response.data.data);
                setMainStdId(response.data.data?.main_std_id||null);
                setRelativeStdId(response.data.data?.relative_std_id||null);
            })
            .catch((error) => {
                console.log(error);
            });
    }



    function onMainSelectChange(value) {
        const selected = standardList.filter((e) => e.id === value)
        console.log(selected)
        setMainStdId(value)
        setMainStandard(selected);

    }
    function onRelativeSelectChange(value) {
        const selected = standardList.filter((e) => e.id === value)
        console.log(selected)
        setRelativeStdId(value)
        setRelativeStandard(selected);
    }
    function swapStandard() {
        const temp = mainStandard;
        setMainStandard(relativeStandard);
        setRelativeStandard(temp)
    }
    function handleSaveBtn() {
        console.log(mainStandard)
        setIsEditing(false)
    }

 
    useEffect(() => {
        fetchAllStandards();
        fetchMapping();
console.log("change")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCurriculum]);

    return [
        standardList,
        mainStdId,
        relativeStdId,
        mainStandard,
        relativeStandard,
        mapping,
        isEditing,
        setIsEditing,
        onMainSelectChange,
        onRelativeSelectChange,
        swapStandard,
        handleSaveBtn,
    ]
}
