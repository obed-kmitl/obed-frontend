import { message } from 'antd';
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
                        return null
                    })
                    return null
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
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function fetchMapping() {
        return httpClient
            .get(`/mapStandard/get/${selectedCurriculum}`)
            .then((response) => {
                //console.log(response.data.data)
                if (response.data.data !== undefined) {
                    console.log(response.data.data)
                    setMapping(response.data.data);
                    setMainStdId(response.data.data.main_std_id);
                    setRelativeStdId(response.data.data.relative_std_id);
                    return response.data.data
                }else{
                    const noData =  
                    {
                        curriculum_id: selectedCurriculum,
                        main_std_id: undefined,
                        relative_std_id: undefined,
                        map_sub_standards: []
                    }
                    setMapping(noData);
                    setMainStdId(undefined);
                    setRelativeStdId(undefined)
                }
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
        setMainStdId(value)
        if (mapping !== undefined) {
            let newMapping = mapping
            newMapping.main_std_id = value
            newMapping.map_sub_standards=[]
            setMapping(newMapping);

            standardList.forEach(element => {
                element.details.forEach(standard=>{
                    standard.subStandard.forEach(subStd=>{
                        subStd.mapping=[]
                    })
                })
                
            });
        }


    }
    function onRelativeSelectChange(value) {
        setRelativeStdId(value)
        if (mapping !== undefined) {
            let newMapping = mapping
            newMapping.relative_std_id = value
            newMapping.map_sub_standards=[]
            setMapping(newMapping);

            standardList.forEach(element => {
                element.details.forEach(standard=>{
                    standard.subStandard.forEach(subStd=>{
                        subStd.mapping=[]
                    })
                })
                
            });
        }
    }
    function swapStandard() {
        const tempM = mainStdId;
        const tempR = relativeStdId;

        let newMapping = mapping
        newMapping.main_std_id = tempR
        newMapping.relative_std_id = tempM
        newMapping.map_sub_standards=[]
        setMapping(newMapping);

        setMainStdId(tempR);
        setRelativeStdId(tempM);

       
        standardList.forEach(element => {
            element.details.forEach(standard=>{
                standard.subStandard.forEach(subStd=>{
                    subStd.mapping=[]
                })
            })
            
        });

    
    }
    async function handleSaveBtn() {
        console.log(mapping)
        return await httpClient
        .post(`/mapStandard/save`,mapping)
        .then((response) => {
            //console.log(response.data.data)
            message.success("Save Mapping Successfully")
            setIsEditing(false)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCurriculum]);

    return [
        standardList,
        mainStdId,
        relativeStdId,
        mapping,
        setMapping,
        isEditing,
        setIsEditing,
        onMainSelectChange,
        onRelativeSelectChange,
        swapStandard,
        handleSaveBtn,
    ]
}
