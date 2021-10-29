import { message } from "antd";
import { useState } from "react"


export const useImportExcel = (setStandard) => {
    const [importModalVisible, setImportModalVisible] = useState(false);
    const [fileUpLoadStdId, setFileUpLoadStdId] = useState();
    const [importStandard, setImportStandard] = useState();

    function handleImportBtnClick(index) {
        setImportModalVisible(true);
        setFileUpLoadStdId(index);
    }
    function importModalCancel() {
        setImportModalVisible(false);
    }
    const getDetailsfromExcel = (data) => {
        //console.log(data)
        const getMainStandard = () => {
            const newArray = []
            const duplicate = []
            data.forEach(std => {
                if (!duplicate.includes(std.standardNo)) {
                    newArray.push({ standardNo: std.standardNo, standardName: std.description, subStandard: [] })
                    duplicate.push(std.standardNo)
                }
            })
            return newArray;
        }
        const mainStandard = getMainStandard()

        const getSubStandard = () => {
            const newArray = []
            data.forEach(std => {
                newArray.push({ standardNo: std.standardNo, subStandardNo: std.subStdNo, subStandardName: std.subDescription })
            })
            return newArray;
        }
        const subStandards = getSubStandard()

        mainStandard.forEach(element => {
            const subStdList = subStandards.filter((item) => item.standardNo === element.standardNo)
            subStdList.forEach(subStd => {
                element.subStandard.push({
                    subStandardNo: subStd.subStandardNo,
                    subStandardName: subStd.subStandardName,
                })
            })
        });
        setImportStandard(mainStandard)
        console.log(importStandard)

        //console.log(mainStandard, subStandards)
    }

    function confirmImport() {
        //clear details to prevent confict
        if (importStandard) {
            setStandard(prev => {
                return [
                    ...prev.slice(0, fileUpLoadStdId),
                    {
                        ...prev[fileUpLoadStdId], details: []
                    },
                    ...prev.slice(fileUpLoadStdId + 1)]
            });
            setStandard(prev => {
                return [
                    ...prev.slice(0, fileUpLoadStdId),
                    {
                        ...prev[fileUpLoadStdId], details: importStandard
                    },
                    ...prev.slice(fileUpLoadStdId + 1)]
            });
            setImportModalVisible(false);
        } else {
            message.error("Please Upload File!")
        }
    }

    return [importModalVisible, handleImportBtnClick, importModalCancel, getDetailsfromExcel, confirmImport, importStandard]
}
