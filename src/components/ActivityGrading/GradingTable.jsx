import { Table } from 'antd';
import { Button } from '..';
import {
  DownOutlined
} from '@ant-design/icons';
import {RubricSelector} from './RubricSelector';

export const GradingTable = ({ students, activity }) => {
    const columns = [
        { title: 'Student Id', dataIndex: 'id', key: 'id', width: "120px" },
        { title: 'Prefix', dataIndex: 'prefix', width: "100px" },
        { title: 'First Name', dataIndex: 'firstname', width: "200px" },
        { title: 'Last Name', dataIndex: 'lastname', width: "200px" },
        {
            title: 'Score',
            dataIndex: 'score',
            render: (score) => (
                <div >
                    {score} / {activity.total_score}
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'score_status',
            width: "150px",
            render: (score_status) => (
                <>
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
                </>
            )
        },
        {
            width:"50px",
            render: () => (
                <DownOutlined/>
            )
        },
    ];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "flex-end", gap: "0.5rem", paddingBottom: "1rem" }}>
                <Button>Import</Button>
                <Button>Save</Button>
            </div>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: record => <RubricSelector student={record}/>,
                    expandRowByClick: true,
                    expandIcon: () => null,
                    expandIconColumnIndex: -1
                    
                }}
                dataSource={students}
                
            />
        </>

    )
}
