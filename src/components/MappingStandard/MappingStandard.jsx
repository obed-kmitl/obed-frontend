import { useState } from "react";
import styles from "./MappingStandard.module.scss"
import { Header, Body, Button, Select, Option, Standard } from ".."
import { Empty, Typography } from "antd";
import { SwapOutlined } from '@ant-design/icons';
import { mockStandard } from "./mockStandard";


export const MappingStandard = () => {
    const [standardList, setStandardList] = useState(mockStandard)
    const [mainStandard, setMainStandard] = useState(null)
    const [relativeStandard, setRelativeStandard] = useState(null)

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
                <Button>Edit</Button>
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
                    <Typography.Link
                        onClick={() => swapStandard()}
                    >
                        <SwapOutlined className={styles.swapIcon} />
                    </Typography.Link>
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
                    <div>you select {mainStandard.standardTitle} and {relativeStandard.standardTitle}</div>
                    :
                    
                    <Empty
                        style={{ marginTop: "100px",color:"#c3c3c4" ,fontSize:"20px",fontWeight:"500" }}
                        //image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 100,
                        }}
                        description={
                            <span>
                                Please Select 2 Standards 
                            </span>
                        }
                    />

                }
            </div>
        </div>
    )
}
