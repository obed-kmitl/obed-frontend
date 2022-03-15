import { message } from "antd";
import { useState,useEffect } from "react"
import { Form } from "antd";
import httpClient from "../../../utils/httpClient";

export const useImportExcel = (fetchAllStandards) => {
    const [importModalVisible, setImportModalVisible] = useState(false);
    // const [fileUpLoadStdId, setFileUpLoadStdId] = useState();
    const [importStandard, setImportStandard] = useState();
    const [importForm] = Form.useForm();
    

    function handleImportBtnClick() {
        setImportModalVisible(true);
        // setFileUpLoadStdId(index);
    }
    function importModalCancel() {
        setImportModalVisible(false);
    }
    const getDetailsfromExcel = (data) => {
        console.log(data)
        const getMainStandard = () => {
            const newArray = []
            const duplicate = []
            data.forEach(std => {
                if (!duplicate.includes(std.standardNo)) {
                    newArray.push({ 
                        order_number: std.standardNo, 
                        title:std.description, 
                        sub_standards: [] })
                    duplicate.push(std.standardNo)
                }
            })
            return newArray;
        }
        const mainStandard = getMainStandard()
        //console.log(mainStandard)

        const getSubStandard = () => {
            const newArray = []
            data.forEach(std => {
                newArray.push({ standardNo: std.standardNo, order_number: std.subStdNo, title: std.subDescription })
            })
            return newArray;
        }
        const subStandards = getSubStandard()
        //console.log(subStandards)

        mainStandard.forEach(element => {
            const subStdList = subStandards.filter((item) => item.standardNo === element.order_number)
            subStdList.forEach(subStd => {
                element.sub_standards.push({
                    order_number: subStd.order_number,
                    title: subStd.title,
                })
            })
        });
        setImportStandard(mainStandard)
        console.log(importStandard)

        //console.log(mainStandard, subStandards)
    }

    useEffect(() => {
      console.log(importStandard)

    }, [importStandard])
    

    async function confirmImport(value,selectedCurriculum) {
        console.log(value,selectedCurriculum)
        return await httpClient
        .post(`/standard/createAllStandards`,{
            curriculum_id: selectedCurriculum,
            standards: [
                {
                    title:value.title,
                    group_sub_standards:importStandard
                }
            ]
        })
        .then(() => {
            setImportModalVisible(false);
            fetchAllStandards(selectedCurriculum);
        })
        .catch((error) => {
            console.log(error)
            message.error(`Import failed, Invalid Template.`);
        });
        
    }

    return {importModalVisible, handleImportBtnClick, importModalCancel, getDetailsfromExcel, confirmImport, importStandard,importForm}
}
