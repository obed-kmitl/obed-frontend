import { useState, useEffect } from "react";
import httpClient from "../../../utils/httpClient";
import { message, Modal } from "antd";
import { useActivityContext } from "../../../contexts/ActivityContext";

export const useActivityGradingGroup = () => {
    const { activityId } = useActivityContext();
    const [group, setGroup] = useState([])
    const [subActivity, setSubActivity] = useState()
    const [editingScore, setEditingScore] = useState([])
    const [scoreValue, setScoreValue] = useState()
    const [importData, setImportData] = useState()
    const [importModalVisible, setImportModalVisible] = useState(false);

    // const handleSelectRubric = (point, groupId, sub_activity_id) => {
    //     let updatedScoreGroup = [...group]
    //     const groupIndex =updatedScoreGroup.findIndex(
    //         (item) => item.id === groupId
    //       );
    //     const scoreIndex =updatedScoreGroup[groupIndex].score.findIndex(
    //         (item) => item.sub_activity_id === sub_activity_id
    //       );
    //     updatedScoreGroup[groupIndex].score[scoreIndex].obtained_score = point
    //     const updateStatusScore = updateStatus(updatedScoreGroup)
    //     setGroup(updateStatusScore)
    // }

    const updateStatus = (data) => {
        let retriveGroup = data
        const addedStatusGroup = []
        retriveGroup.forEach(g => {
            const allScore = g.scores.map((e) => (e.obtained_score))
            const status = () => {
                if (!allScore.includes(null)) {
                    return "Finished"
                }
                else if (allScore.includes(null) && allScore.some((i) => i !== null)) {
                    return "Not Finished"
                }
                else {
                    return "Not Submitted"
                }
            }
            addedStatusGroup.push({
                group_id: g.group_id,
                title: g.title,
                member: g.member,
                scores: g.scores,
                score_status: status(),
            })
        })
        return addedStatusGroup
    }

    const onScoreChange = (value,max) => {
        if(value>max){
            setScoreValue(max)
        }
        else if(value<0){
            setScoreValue(0)
        }
        else{
            setScoreValue(value)
        }
       
    }

    const saveScore = async () => {
        // handleSelectRubric(scoreValue, editingScore[0], editingScore[1])
        let updatedScoreGroup = [...group]
        const groupIndex = updatedScoreGroup.findIndex(
            (item) => item.group_id === editingScore[0]
        );
        const scoreIndex = updatedScoreGroup[groupIndex].scores.findIndex(
            (item) => item.sub_activity_id === editingScore[1]
        );
        updatedScoreGroup[groupIndex].scores[scoreIndex].obtained_score = scoreValue

        return await httpClient
            .post(`/assessment/saveGroupAssessment`, {
                groupAssessments: updatedScoreGroup
            })
            .then(() => {
                const updateStatusScore = updateStatus(updatedScoreGroup)
                setGroup(updateStatusScore)
                setScoreValue(null)
                setEditingScore([])
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function fetchSubActivity() {
        return await httpClient
            .get(`/activity/get/${activityId}`)
            .then((response) => {
                setSubActivity(response.data.data.subActivities)
                return Promise.resolve(response.data.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const fetchGroup = async () => {
        return await httpClient
            .get(`/assessment/getAllGroupAssessmentByActivity/${activityId}`)
            .then((response) => {
                setGroup(updateStatus(response.data.data))

            })
            .catch((error) => {
                console.log(error)
            });
    }

    function handleImportScore(data) {
        setImportData(data)
    }

    async function confirmImport() {
        try {
            const nowData = group.map(item => ({ ...item }))
            const invalidData = []
            const updateGroupWithScore = importData.map((group) => {
                let importGroup = nowData.find(g => g.title === group.group)
                importGroup.scores.sort((a, b) => a.sub_activity_id - b.sub_activity_id).forEach((item, i) => {
                    if (group[`ข้อ${i + 1}(${item.max_score})`] === 0) {
                        item.obtained_score = 0
                        return;
                    }
                    if (!group[`ข้อ${i + 1}(${item.max_score})`]) {
                        item.obtained_score = null
                        return;
                    }
                    if (typeof (group[`ข้อ${i + 1}(${item.max_score})`]) !== "number") {
                        invalidData.push(group[`ข้อ${i + 1}(${item.max_score})`] + ` at "ข้อ${i + 1}(${item.max_score})" of "${group.group}" is not a number`)
                        item.obtained_score = null
                        return;
                    }
                    const trimedScore = parseFloat(group[`ข้อ${i + 1}(${item.max_score})`].toString().trim())
                    if (trimedScore <= item.max_score && trimedScore >= 0) {
                        item.obtained_score = trimedScore
                        return;
                    }
                    item.obtained_score = null
                    invalidData.push(group[`ข้อ${i + 1}(${item.max_score})`] + ` at "ข้อ${i + 1}(${item.max_score})" of "${group.group}" is exceeds the max value (${item.max_score})`)
                })
                return importGroup
            })
            return await httpClient
                .post(`/assessment/saveGroupAssessment`, {
                    groupAssessments: updateGroupWithScore
                })
                .then(() => {
                    const updateStatusScore = updateStatus(updateGroupWithScore)
                    setGroup(updateStatusScore)
                    setImportModalVisible(false)
                    if (invalidData.length === 0) {
                        Modal.success({
                            title: 'All scores were successfully imported.',
                           
                        });
                    }
                    else {
                        Modal.warning({
                            width:500,
                            title: 'There are invalid data from imported file',
                            content: <ul>{invalidData.map(data=><li>{data}</li>)}</ul>,
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        } catch (errInfo) {
            message.error(`Invalid Template, file upload failed.`);
        }
    }


    useEffect(() => {
        if(activityId){
            fetchGroup();
            fetchSubActivity();
        }
        // eslint-disable-next-line
    }, [activityId])

    return {
        group,
        subActivity,
        // rubrics, 
        // handleSelectRubric,
        editingScore,
        setEditingScore,
        onScoreChange,
        saveScore,
        setScoreValue,
        handleImportScore,
        importModalVisible,
        setImportModalVisible,
        confirmImport
    }
}
