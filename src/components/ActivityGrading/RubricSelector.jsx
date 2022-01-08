import { Pagination, Table, Popconfirm } from 'antd';
import {
    DownOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { Header, Body } from '..';
import styles from './RubricSelector.module.scss'
import { useState, useEffect } from 'react';

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

const rubrics = [
    {
        point: 0,
        desc: "ไม่ส่งงานในเวลาที่กำหนด",
    },
    {
        point: 0.5,
        desc: "ไม่ผ่านตามมาตรฐาน",
    },
    {
        point: 1,
        desc: "ผ่านตามมาตรฐานที่กำหนด",
    },
    {
        point: 1.5,
        desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์",
    },
    {
        point: 2,
        desc: "ผ่านตามมาตรฐานที่กำหนดและถูกต้องสมบูรณ์ และมีความคิดสร้างสรรค์ Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
];


export const RubricSelector = ({ student,index, students, setStudents }) => {
    const [subActivity, setSubActivity] = useState()


    const Rubric = (record) => {
        const [defRubric, setDefRubric] = useState();


        useEffect(() => {
            let arr = rubrics.sort((a, b) => a.point - b.point);
            setDefRubric(arr);
        }, []);

        return (
            <div className={styles.rubricWrap}>
                {defRubric?.map((ele, i) => (
                    <div className={styles.rubric} key={"def" + i} onClick={() => handleSelectRubric(ele.point,record)}>
                        <Header level={4} className={styles.level}>
                            Level {i + 1}
                        </Header>
                        <Body level={3} className={styles.desc}>
                            {ele.desc}
                        </Body>
                        <strong className={styles.point}>{ele.point} Points</strong>
                    </div>
                ))}
            </div>
        )
    }


    const handleSelectRubric = (point,record) => {
        let updatedScoreStudent = [...students]
        const scoreIndex =updatedScoreStudent[index].score.findIndex(
            (item) => item.sub_activity_id === record.record.id
          );
        updatedScoreStudent[index].score[scoreIndex].obtained_score = point
        setStudents(updatedScoreStudent)
    }

    useEffect(() => {
        setSubActivity(mockSubActivity)
    }, [])

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
            render: (point, record) => {

                return (
                    <div>
                        {student.score.filter((e) => e.sub_activity_id === record.id)[0].obtained_score} / {point}
                    </div>
                )
            }
        },
        {
            width: "50px",
            render: () => (
                <DownOutlined />
            )
        },
    ];

    return (

        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) => <Rubric record={record} />,
                expandRowByClick: true,
                expandIcon: () => null,
                expandIconColumnIndex: -1,
            }}
            width={"400px"}
            pagination={false}
            dataSource={mockSubActivity}
            rowKey={"id"}
        />
    )
}
