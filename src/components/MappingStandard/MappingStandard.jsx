import { useState } from "react";
import styles from "./MappingStandard.module.scss"
import { Header, Body, Button, Select, Option, Collapse, Panel } from ".."
import { Empty, Popconfirm, Typography } from "antd";
import { SwapOutlined } from '@ant-design/icons';
import { mockStandard } from "./mockStandard";
import { MappingTable } from "./MappingTable";


export const MappingStandard = () => {
    const [standardList, setStandardList] = useState(mockStandard)
    const [mainStandard, setMainStandard] = useState(null)
    const [relativeStandard, setRelativeStandard] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    function onMainSelectChange(value) {
        const i = standardList.findIndex((e) => e.standardTitle === value)
        console.log(standardList[i])
        setMainStandard(standardList[i]);

    }
    function onRelativeSelectChange(value) {
        const i = standardList.findIndex((e) => e.standardTitle === value)
        console.log(standardList[i])
        setRelativeStandard(standardList[i]);
    }
    function swapStandard() {
        const temp = mainStandard;
        setMainStandard(relativeStandard);
        setRelativeStandard(temp)
    }

    return (
        <div>
            <div className={styles.tabHead}>
                <Header level={2}>Mapping Standard</Header>
                {!isEditing ? <Button onClick={() => setIsEditing(true)}>Edit</Button> : <Button onClick={() => setIsEditing(false)}>Save</Button>}
            </div>
            <div className={styles.content}>
                <div className={styles.standardSelect}>
                    <div className={styles.select}>
                        <div className={styles.selectLabel}>
                            <Header level={4}>Main Standard</Header>
                            <Body level={4}>&nbsp;(Cannot be select in Course)</Body>
                        </div>
                        <Select
                            placeholder="Please select Standard"
                            onChange={(value) => onMainSelectChange(value)}
                            value={mainStandard ? mainStandard.standardTitle : null}
                        >
                            {standardList.map((e) => (
                                <Option value={e.standardTitle} key={e.id} disabled={relativeStandard && relativeStandard.standardTitle === e.standardTitle}>
                                    {e.standardTitle}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <Popconfirm title="When swap Standard,All Mapping will reset" onConfirm={() => swapStandard()} >
                        <Typography.Link
                            //onClick={() => swapStandard()}
                            disabled={!isEditing}
                        >
                            <SwapOutlined className={styles.swapIcon} />
                        </Typography.Link>
                    </Popconfirm>
                    <div className={styles.select}>
                        <div className={styles.selectLabel}>
                            <Header level={4}>Relative Standard</Header>
                            <Body level={4}>&nbsp;(Use in Learning Outcome Planning)</Body>
                        </div>
                        <Select
                            placeholder="Please select Standard"
                            onChange={(value) => onRelativeSelectChange(value)}
                            value={relativeStandard ? relativeStandard.standardTitle : null}
                        >
                            {standardList.map((e) => (
                                <Option value={e.standardTitle} key={e.id} disabled={mainStandard && mainStandard.standardTitle === e.standardTitle}>
                                    {e.standardTitle}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                {mainStandard && relativeStandard ?
                    <>
                        <Collapse accordion>
                            {mainStandard.details.map((standard, index) =>
                                <Panel
                                    header={<Header level={5}>{standard.standardNo}{" "}{standard.standardName}</Header>}
                                    key={index}
                                >
                                    <MappingTable
                                        standard={standard.subStandard}
                                        standardNo={standard.standardNo}
                                        relativeStandard={relativeStandard}
                                        isEdit={isEditing}
                                    />
                                </Panel>
                            )}
                        </Collapse>
                    </>
                    :
                    <Empty
                        style={{ marginTop: "100px", color: "#c3c3c4", fontSize: "20px", fontWeight: "500" }}
                        imageStyle={{ height: 100 }}
                        description="Please Select 2 Standards"
                    />
                }
            </div>
        </div>
    )
}
