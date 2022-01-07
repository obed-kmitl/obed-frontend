import { Pagination, Table } from 'antd';
import {
  DownOutlined
} from '@ant-design/icons';

const mockSubActivity = [
    {
        id: 1,
        title: "ข้อ 1",
        detail: "จงแปลงเลขฐาน 2 จาก 1010 1111 0010 เป็นเลขฐาน 10 และเลขฐาน 16",
        clo: [1, 2],
        point: 2
    },
    {
        id: 2,
        title: "ข้อ 2",
        detail: "จงแปลงเลขฐาน 2 จาก 1000 1101 0110 เป็นเลขฐาน 10 และเลขฐาน 16",
        clo: [1, 2],
        point: 2
    },
    {
        id: 3,
        title: "ข้อ 3",
        detail: "จงแปลงเลขฐาน 10 จาก 178 เป็นเลขฐาน 2 และเลขฐาน 16",
        clo: [1, 3],
        point: 2
    },
    {
        id: 4,
        title: "ข้อ 4",
        detail: "จงแปลงเลขฐาน 16 จาก 57FA เป็นเลขฐาน 10 และเลขฐาน 2",
        clo: [2, 3],
        point: 2
    }
]


export const RubricSelector = ({student}) => {
    const columns = [
        {
            title: 'No.',
            width: '80px',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        { title: 'Title', dataIndex: 'title', width: "100px" },
        { title: 'Detail', dataIndex: 'detail' },
        {
            title: 'Point',
            dataIndex: 'point',
            render: (point) => (
                <div>
                    / {point} 
                </div>
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

            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: record => <div></div>,
                    expandRowByClick: true,
                    expandIcon: () => null,
                    expandIconColumnIndex: -1,
                }}
                pagination={false}
                dataSource={mockSubActivity} 
            />
    )
}
