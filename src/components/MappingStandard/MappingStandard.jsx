import { useState } from "react";
import styles from "./MappingStandard.module.scss"
import { Header, Body, Button, Select, Option, Collapse, Panel } from ".."
import { Empty, Popconfirm, Typography } from "antd";
import { SwapOutlined } from '@ant-design/icons';
import { MappingTable } from "./MappingTable";
import { useMappingStandard } from "./hooks/useMappingStandard";


export const MappingStandard = ({ selectedCurriculum }) => {

    const [
        standardList,
        mainStdId,
        relativeStdId,
        mainStandard,
        relativeStandard,
        mapping,
        isEditing,
        setIsEditing,
        onMainSelectChange,
        onRelativeSelectChange,
        swapStandard,
        handleSaveBtn
    ] = useMappingStandard(selectedCurriculum)
    
    console.log(mapping)
    console.log(mainStdId)
    console.log(relativeStdId)
    console.log(standardList.filter((e) => e.id === mainStdId))

    return (
        <div>
            <div className={styles.tabHead}>
                <Header level={2}>Mapping Standard</Header>
                {
                !isEditing ? <Button onClick={() => setIsEditing(true)}>Edit</Button> 
                :<Button type="primary" onClick={() => handleSaveBtn(false)}>Save</Button>
                }
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
                            value={mainStdId || null}
                            disabled={!isEditing}
                        >
                            {standardList.map((e) => (
                                <Option value={e.id} key={e.id} disabled={relativeStandard && relativeStandard.standardTitle === e.standardTitle}>
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
                            value={relativeStdId || null}
                            disabled={!isEditing}
                        >
                            {standardList.map((e) => (
                                <Option value={e.id} key={e.id} disabled={mainStandard && mainStandard.standardTitle === e.standardTitle}>
                                    {e.standardTitle}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                {mainStdId && relativeStdId ?
                    <>
                        <Collapse accordion>
                            {standardList.filter((e) => e.id === mainStdId)[0]?.details.map((standard, index) =>
                                <Panel
                                    header={<Header level={5}>{standard.standardNo}{" "}{standard.standardName}</Header>}
                                    key={index}
                                >
                                    <MappingTable
                                        standard={standard.subStandard}
                                        standardNo={standard.standardNo}
                                        relativeStandard={relativeStandard}
                                        isEdit={isEditing}
                                        mapping={mapping}
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
