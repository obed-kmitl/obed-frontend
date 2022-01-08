import { Table, Tooltip } from 'antd';
import { Button } from '..';
import {
    DownOutlined
} from '@ant-design/icons';
import { RubricSelector } from './RubricSelector';

export const GradingTable = ({ students,setStudents,activity }) => {
    const columns = [
        { title: 'Student Id', dataIndex: 'id', key: 'id', width: "120px" },
        { title: 'Prefix', dataIndex: 'prefix', width: "100px" },
        { title: 'First Name', dataIndex: 'firstname', width: "200px" },
        { title: 'Last Name', dataIndex: 'lastname', width: "200px" },
        {
            title: 'Score',
            dataIndex: 'score',
            render: (score) =>{ 
                let calculatedScore = 0
                let totalMaxScore = 0
                score.forEach(element => {
                    calculatedScore =  calculatedScore + element.obtained_score ||0
                    totalMaxScore =  totalMaxScore + element.max_score ||0
                });
                calculatedScore = (calculatedScore/totalMaxScore)*activity.total_score
                return(
                <div >
                   {calculatedScore} / {activity.total_score}
                </div>
            )}
        },
        {
            title: 'Status',
            dataIndex: 'score_status',
            width: "150px",
            render: (score_status) => (

                <div>
                    {score_status === "Finished" &&
                        <div style={{ color: "#68A028" }}>
                            {score_status}
                        </div>
                    }
                    {score_status === "Not Finished" &&
                        <div style={{ color: "#F7941D" }}>
                            {score_status}
                        </div>
                    }
                    {score_status === "Not Submitted" &&
                        <div style={{ color: "#C73535" }}>
                            {score_status}
                        </div>
                    }
                </div>
            )
        },
        {
            width: "50px",
            render: () => (
                <DownOutlined />
            )
        },
    ];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "flex-end", gap: "0.5rem", paddingBottom: "1rem" }}>
                <Tooltip title="กรอกครบแล้ว/ยังกรอกไม่ครบ/ยังไม่ได้กรอก" overlayStyle={{ maxWidth: '500px' }}>
                    <div style={{ color: "white", display: "flex", textAlign: "center", fontSize: "18px" }}>
                        <div style={{ backgroundColor: "#68A028", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {students.filter((s) => s.score_status === "Finished").length}
                        </div>
                        <div style={{ backgroundColor: "#F7941D", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {students.filter((s) => s.score_status === "Not Finished").length}
                        </div>
                        <div style={{ backgroundColor: "#C73535", width: "32px", height: "32px", paddingTop: "0.2rem" }}>
                            {students.filter((s) => s.score_status === "Not Submitted").length}
                        </div>
                    </div>
                </Tooltip>
                <Button>Import</Button>
                <Button>Save</Button>
            </div>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record,index) => <RubricSelector student={record} index={index} students={students} setStudents={setStudents} />,
                    expandRowByClick: true,
                    expandIcon: () => null,
                    expandIconColumnIndex: -1

                }}
                dataSource={students}
                rowKey={"id"}

            />
        </>

    )
}
