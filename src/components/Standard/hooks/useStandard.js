import { useState, useEffect } from 'react'
import httpClient from '../../../utils/httpClient';
import { Form } from 'antd'

// const standardList = [
//     {
//         id: 1,
//         standardTitle: "ผลการเรียนรู้ระดับหลักสูตร (PLOs : Program-Level Learning Outcomes)",
//         details: [
//             {
//                 standardNo: 1,
//                 standardName: "ความรู้ทางด้านวิศวกรรม และพื้นฐานทางวิทยาศาสตร์",
//                 subStandard: [
//                     {
//                         subStandardNo: 1,
//                         subStandardName: "ประยุกต์ใช้ความรู้ด้านคณิตศาสตร์ วิทยาศาสตร์ สถิติและความน่าจะเป็น รวมทั้งคณิตศาสตร์ไม่ต่อเนื่อง กับงานด้านวิศวกรรมคอมพิวเตอร์",
//                     },
//                     {
//                         subStandardNo: 2,
//                         subStandardName: "ประยุกต์ใช้ความรู้ด้านการวิเคราะห์วงจรไฟฟ้าพื้นฐาน วงจรและอุปกรณ์อิเล็กทรอนิกส์กับการเชื่อมต่อไมโครคอนโทรลเลอร์",
//                     },
//                     {
//                         subStandardNo: 3,
//                         subStandardName: "ประยุกต์ใช้ภาษาโปรแกรม การโปรแกรมเชิงวัตถุ โครงสร้างข้อมูล การวิเคราะห์อัลกอริทึมเบื้องต้น เพื่อจัดการกับปัญหาโดยวิธีการทางซอฟต์แวร์",
//                     },
//                     {
//                         subStandardNo: 4,
//                         subStandardName: "อธิบายโครงสร้าง องค์ประกอบ และการทำงานระดับฮาร์ดแวร์ของคอมพิวเตอร์ รวมถึงวงจรดิจิตอลพื้นฐาน",
//                     },
//                     {
//                         subStandardNo: 5,
//                         subStandardName: "อธิบายการส่งข้อมูลทั้งแอนะล็อกและดิจิตอล อุปกรณ์ ตัวกลาง มัลติเพล็กซ์ สวิตซ์ การส่งข้อมูลแบบเฟรม การตรวจสอบและแก้ไขความผิดพลาด การควบคุมการไหลของข้อมูลการหาเส้นทาง รวมทั้งเครือข่ายอีเทอร์เน็ต และเครือข่ายไอพี ทั้งแบบใช้สายและไร้สาย",
//                     },
//                     {
//                         subStandardNo: 6,
//                         subStandardName: "อธิบายหลักการพื้นฐานของความปลอดภัยของข้อมูล การเข้ารหัสข้อมูล",
//                     },
//                     {
//                         subStandardNo: 7,
//                         subStandardName: "อธิบายโครงสร้างและการทำงานของระบบปฏิบัติการ การจัดการทรัพยากรในระบบคอมพิวเตอร์ การทำงานระหว่างโพรเซส ระบบไฟล์ การทำงานแบบเครื่องจักรเสมือน (Virtualization) และการประมวลผลแบบคลาวด์ (Cloud Computing)",
//                     },
//                 ]
//             }, {
//                 standardNo: 2,
//                 standardName: "การวิเคราะห์ปัญหาทางวิศวกรรม",
//                 subStandard: [
//                     {
//                         subStandardNo: 1,
//                         subStandardName: "วิเคราะห์ปัญหาทางวิศวกรรมคอมพิวเตอร์ เข้าใจปัญหาและอธิบายความต้องการ และสามารถระบุข้อกำหนดของปัญหา โดยใช้วิธีการทางวิศวกรรม",
//                     },
//                     {
//                         subStandardNo: 2,
//                         subStandardName: "ค้นคว้าเพื่อค้นหาแนวทางหรือวิธีการในการแก้ไขปัญหา แสดงข้อเปรียบเทียบระหว่างแนวทางหรือวิธีการในการแก้ไขปัญหา แสดงเหตุผลในการเลือกแนวทางในการแก้ไขปัญหา",
//                     },
//                 ]
//             }, {
//                 standardNo: 3,
//                 standardName: "การออกแบบและพัฒนาเพื่อหาคำตอบของปัญหา",
//                 subStandard: []
//             }, {
//                 standardNo: 4,
//                 standardName: "การพิจารณาตรวจสอบ",
//                 subStandard: []
//             }, {
//                 standardNo: 5,
//                 standardName: "การใช้อุปกรณ์เครื่องมือทันสมัย",
//                 subStandard: []
//             }
//         ]
//     }
// ]

export const useStandard = (selectedCurriculum) => {
    const [standard, setStandard] = useState([]);
    //Title
    const [newStdVisible, setNewStdVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTitleIndex, setEditingTitleIndex] = useState();
    //Standard 
    const [addStdVisible, setAddStdVisible] = useState(false);
    const [addingStandardId, setAddingStandardId] = useState();
    const [isEditingName, setIsEditingName] = useState(false);
    const [editingNameIndex, setEditingNameIndex] = useState();
    const [editingGroupStdId, setEditingGroupStdId] = useState();
    //Forms
    const [createStdForm] = Form.useForm();
    const [editTitleForm] = Form.useForm();
    const [addStdForm] = Form.useForm();
    const [editNameForm] = Form.useForm();

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
                            subStandardId: subStd.sub_standard_id,
                            subStandardNo: subStd.order_number,
                            subStandardName: subStd.title,
                        }))
                    }))
                }))
                setStandard(receivedStandard)
                console.log(receivedStandard)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleCancel() {
        setNewStdVisible(false);
        setAddStdVisible(false);
        createStdForm.resetFields();
        addStdForm.resetFields();
    }

    // Title Add,Delete,Update
    function handleCreateStdBtn() {
        setNewStdVisible(true)
    }

    async function handleCreateSubmit(value) {
        return await httpClient
            .post('/standard/create', {
                curriculum_id: selectedCurriculum,
                title: value.standardTitle
            })
            .then((response) => {
                setNewStdVisible(false);
                setStandard(
                    [...standard, {
                        id: response.data.data.standard_id,
                        standardTitle: response.data.data.title,
                        curriculumId: response.data.data.curriculum_id,
                        details: []
                    }]
                )
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function handleDeleteTitle(id) {
        return await httpClient
            .delete(`/standard/remove/${id}`)
            .then(() => {
                setStandard(standard.filter(item => item.id !== id))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleEditTitle(i) {
        setIsEditing(true)
        setEditingTitleIndex(i)
    }

    async function handleEditTitleSubmit(value) {
        const i = editingTitleIndex
        return await httpClient.put(`/standard/update/${standard[editingTitleIndex].id}`, {
            title: value.standardTitle
        }).then(() => {
            setStandard(prev => {
                return [
                    ...prev.slice(0, i),
                    {
                        ...prev[i], standardTitle: value.standardTitle
                    },
                    ...prev.slice(i + 1)]
            });
            setEditingTitleIndex(null);
            setIsEditing(false)
            editTitleForm.resetFields();
        }).catch((error) => {
            console.log(error);
        });
    }

    //Standard Add,Delete,Update
    function handleAddStdBtn(i) {
        setAddStdVisible(true)
        setAddingStandardId(i)
    }

    async function handleAddSubmit(value) {
        const i = addingStandardId;
        return await httpClient.post(`/standard/createGroupSubStandard`, {
            standard_id: standard[addingStandardId].id,
            order_number: value.standardNo,
            title: value.standardName
        }).then(() => {
            setStandard(prev => {
                return [
                    ...prev.slice(0, i),
                    {
                        ...prev[i], details: [...prev[i].details, {
                            standardNo: value.standardNo,
                            standardName: value.standardName,
                            subStandard: []
                        }]
                    },
                    ...prev.slice(i + 1)]
            });
            //console.log(standard)
            setAddingStandardId(null)
            setAddStdVisible(false);
        }).catch((error) => {
            console.log(error);
        });
    }
    async function handleDeleteStandard(stdNo, groupSubStdId, id) {
        const index = standard.findIndex((item) => {
            return item.id === id
        })
        return await httpClient
            .delete(`/standard/removeGroupSubStandard/${groupSubStdId}`)
            .then(() => {
                setStandard(prev => {
                    return [
                        ...prev.slice(0, index),
                        {
                            ...prev[index], details: prev[index].details.filter(item => item.standardNo !== stdNo)
                        },
                        ...prev.slice(index + 1)]
                });
            }).catch((error) => {
                console.log(error);
            })
    }
    function handleEditName(index, id, groupStdId) {
        setIsEditingName(true)
        setEditingTitleIndex(index)
        setEditingNameIndex(id)
        setEditingGroupStdId(groupStdId)
    }

    async function handleEditNameSubmit(values) {
        let newStandard = [...standard]
        newStandard[editingTitleIndex].details[editingNameIndex].standardName = values.standardName
        newStandard[editingTitleIndex].details[editingNameIndex].standardNo = values.standardNo
        return await httpClient.put(`/standard/updateGroupSubStandard/${editingGroupStdId}`, {
            order_number: values.standardNo,
            title: values.standardName
        }).then(() => {
            setStandard(newStandard)
            setEditingTitleIndex(null);
            setIsEditingName(false)
            setEditingNameIndex(null);
            editNameForm.resetFields();
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchAllStandards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCurriculum]);


    return [
        standard,
        setStandard,
        handleCreateStdBtn,
        handleCancel,
        handleCreateSubmit,
        handleDeleteTitle,
        handleEditTitle,
        handleEditTitleSubmit,
        isEditing,
        setIsEditing,
        editingTitleIndex,
        setEditingTitleIndex,
        handleAddStdBtn,
        handleAddSubmit,
        addingStandardId,
        handleDeleteStandard,
        handleEditName,
        handleEditNameSubmit,
        isEditingName,
        setIsEditingName,
        editingNameIndex,
        setEditingNameIndex,
        setEditingGroupStdId,
        createStdForm,
        editTitleForm,
        addStdForm,
        editNameForm,
        newStdVisible,
        addStdVisible,
    ]
}
