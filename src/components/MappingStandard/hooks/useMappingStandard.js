import { useState, useEffect } from 'react'

import httpClient from '../../../utils/httpClient';

export const useMappingStandard = (selectedCurriculum) => {
    const [standardList, setStandardList] = useState([])

    const [mainStdId, setMainStdId] = useState();
    const [relativeStdId, setRelativeStdId] = useState()

    const [isEditing, setIsEditing] = useState(false)
    const [mapping, setMapping] = useState({})

    function filterMapStandard(currentStandard, currentMainSubStandardId, mapStandards, allStandards) {
        if (currentStandard.standard_id === mapStandards.main_std_id) {
            const relativeStandard = allStandards.filter((std) => std.standard_id === mapStandards.relative_std_id)[0]
            let mappedSubStandard = []

            const matchMainStandard = mapStandards.map_sub_standards.filter((mss) => mss.main_sub_std_id === currentMainSubStandardId)

            if (matchMainStandard.length < 0) return []

            relativeStandard.group_sub_standards.map((r_gss) =>
                r_gss.sub_standards.map((r_ss) => {
                    matchMainStandard.map((mms) => {
                        if (mms.relative_sub_std_id === r_ss.sub_std_id) {
                            mappedSubStandard = [...mappedSubStandard, `${r_gss.group_sub_std_id}.${r_ss.sub_std_id}`]
                        }
                    })
                })
            )


            return mappedSubStandard
        }

        return []
    }

    async function fetchAllStandards(mapStandards) {
        return await httpClient
            .get(`/standard/getAllByCurriculum/${selectedCurriculum}`)
            .then((response) => {
                console.log(mapStandards)
                const mappedStandard = response?.data.data.map((std, index, allStandards) => {
                    return ({
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
                                mapping: filterMapStandard({ ...std }, subStd.sub_std_id, { ...mapStandards }, [...allStandards])
                            }))
                        }))
                    })

                })
                setStandardList(mappedStandard)
                console.log(mappedStandard)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function fetchMapping() {
        return httpClient
            .get(`/mapStandard/get/${selectedCurriculum}`)
            .then((response) => {
                setMapping(response.data.data);
                setMainStdId(response.data.data?.main_std_id || null);
                setRelativeStdId(response.data.data?.relative_std_id || null);
                return response.data.data
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function fetchData() {
        const mapStandards = await fetchMapping()
        await fetchAllStandards(mapStandards);
    }


    function onMainSelectChange(value) {
        // const selected = standardList.filter((e) => e.id === value)
        // console.log(selected)
        // setMainStandard(selected);
        setMainStdId(value)
        let newMapping = mapping
        newMapping.main_std_id = value
        setMapping(newMapping);

    }
    function onRelativeSelectChange(value) {
        // const selected = standardList.filter((e) => e.id === value)
        // console.log(selected)
        //setRelativeStandard(selected);
        setRelativeStdId(value)
        let newMapping = mapping
        newMapping.relative_std_id = value
        setMapping(newMapping);
    }
    function swapStandard() {
        const tempM = mainStdId;
        const tempR = relativeStdId;
        setMainStdId(relativeStdId);
        setRelativeStdId(tempM)

        let newMapping = mapping
        newMapping.main_std_id = tempR
        newMapping.relative_std_id = tempM
        setMapping(newMapping);

    }
    function handleSaveBtn() {
        //console.log(mainStandard)
        setIsEditing(false)
    }


    useEffect(() => {
        // fetchAllStandards();
        // fetchMapping();
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCurriculum]);

    return [
        standardList,
        mainStdId,
        relativeStdId,
        // mainStandard,
        // relativeStandard,
        mapping,
        isEditing,
        setIsEditing,
        onMainSelectChange,
        onRelativeSelectChange,
        swapStandard,
        handleSaveBtn,
    ]
}
