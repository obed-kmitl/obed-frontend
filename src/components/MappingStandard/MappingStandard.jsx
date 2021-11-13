import styles from "./MappingStandard.module.scss";
import { Header, Body, Button, Select, Option, Collapse, Panel } from "..";
import { Empty, Popconfirm, Typography, Tooltip } from "antd";
import {
  SwapOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { MappingTable } from "./MappingTable";
import { useMappingStandard } from "./hooks/useMappingStandard";
import { useState } from "react";

export const MappingStandard = ({ selectedCurriculum }) => {
  const [
    standardList,
    mainStdId,
    relativeStdId,
    mapping,
    setMapping,
    isEditing,
    setIsEditing,
    onMainSelectChange,
    onRelativeSelectChange,
    swapStandard,
    handleSaveBtn,
  ] = useMappingStandard(selectedCurriculum);

  const [isEditingTable, setIsEditingTable] = useState(false);

  console.log(mapping);
  return (
    <div>
      <div className={styles.tabHead}>
        <div className={styles.header}>
          <Header level={5}>Mapping Standard&nbsp;</Header>
          <Tooltip title="All mapping will reset when swap or change Standard">
            <InfoCircleOutlined />
          </Tooltip>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        ) : (
          <div className={styles.flexrow}>
            <WarningOutlined style={{ color: "#ffcc00" }} />
            <Body level={4}>
              Please click Save button after complete mapping!
            </Body>
            <Button
              disabled={isEditingTable}
              type="primary"
              onClick={() => handleSaveBtn(false)}
            >
              Save
            </Button>
          </div>
        )}
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
                <Option
                  value={e.id}
                  key={e.id}
                  disabled={relativeStdId && relativeStdId === e.id}
                >
                  {e.standardTitle}
                </Option>
              ))}
            </Select>
          </div>
          <Popconfirm
            title="When swap Standard,All Mapping will reset"
            onConfirm={() => swapStandard()}
          >
            <Typography.Link disabled={!isEditing}>
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
                <Option
                  value={e.id}
                  key={e.id}
                  disabled={mainStdId && mainStdId === e.id}
                >
                  {e.standardTitle}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {mainStdId && relativeStdId ? (
          <>
            <Collapse accordion>
              {standardList
                .filter((e) => e.id === mainStdId)[0]
                ?.details.map((standard, index) => (
                  <Panel
                    header={
                      <Header level={5}>
                        {standard.standardNo} {standard.standardName}
                      </Header>
                    }
                    key={index}
                  >
                    <MappingTable
                      standard={standard.subStandard}
                      standardNo={standard.standardNo}
                      relativeStandard={
                        standardList.filter((e) => e.id === relativeStdId)[0]
                      }
                      isEdit={isEditing}
                      mapping={mapping}
                      setMapping={setMapping}
                      allStandard={standardList}
                      setIsEditingTable={setIsEditingTable}
                    />
                  </Panel>
                ))}
            </Collapse>
          </>
        ) : (
          <Empty
            style={{
              marginTop: "100px",
              color: "#c3c3c4",
              fontSize: "20px",
              fontWeight: "500",
            }}
            imageStyle={{ height: 100 }}
            description="Please Select 2 Standards"
          />
        )}
      </div>
    </div>
  );
};
