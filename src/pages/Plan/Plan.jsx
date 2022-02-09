import { useState, useEffect } from "react";
import styles from "./Plan.module.scss";
import { Helmet } from "react-helmet";
import {
  Header,
  Button,
  Select,
  Option,
  Input,
  Collapse,
  Panel,
  SectionTable,
  Body,
} from "../../components";
import { Divider, message, Modal, Popconfirm, Transfer, Checkbox } from "antd";
import { DeleteOutlined, WarningTwoTone } from "@ant-design/icons";
import { useSemester } from "./hooks/useSemester";

export const Plan = () => {
  const {
    allSemester,
    allCurriculum,
    allCourse,
    addedCourse,
    selectedCurriculum,
    selectedSemester,
    onChangeCurriculum,
    onChangeSemester,
    handleAddCourse,
    isModalVisible,
    setIsModalVisible,
    targetKeys,
    selectedKeys,
    onChange,
    onSelectChange,
    handleDeleteCourse,
    teacher,
    duplicateYear,
    createSemester,
    duplicateModalVisible,
    setDuplicateModalVisible,
  } = useSemester();

  const [filterList, setFilterList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function search(kw) {
    let keyword = kw.trim();
    if (keyword !== "") {
      const results = addedCourse.filter((course) => {
        return (
          course.course_number.toLowerCase().includes(keyword.toLowerCase()) ||
          course.course_name_en.toLowerCase().includes(keyword.toLowerCase()) ||
          course.course_name_th.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFilterList(results);
    } else {
      setFilterList(addedCourse);
    }
  }

  function onChangeDuplicate() {
    setDuplicate(!duplicate);
  }

  useEffect(() => {
    setSearchValue("");
    search("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCourse]);

  useEffect(() => {
    setFilterList(addedCourse);
  }, [addedCourse]);

  return (
    <div className={styles.plan}>
      <Helmet>
        <title>Semester Plan - OBED</title>
      </Helmet>
      <Header level={1}>Semester Plan</Header>
      <Divider />
      <div className={styles.selectSemester}>
        <Header level={2}>Curriculum</Header>
        <Select
          defaultValue={"None"}
          onChange={onChangeCurriculum}
          width="250px"
          placeholder="Please Select Curriculum"
        >
          <Option value={undefined} disabled>
            None
          </Option>
          {allCurriculum?.map((e) => (
            <Option value={e.curriculum_id} key={"cur_id: " + e.curriculum_id}>
              {e.title}
            </Option>
          ))}
        </Select>
        {selectedCurriculum && (
          <div className={styles.flexrowSpace}>
            <div className={styles.flexrow}>
              <Header level={2}>Semester</Header>
              <Select
                defaultValue={"None"}
                onChange={onChangeSemester}
                width={100}
              >
                {allSemester?.map((e) => (
                  <Option
                    value={e.semester_id}
                    key={e.semester_number + "/" + e.year_number}
                  >
                    {e.semester_number}/{e.year_number}
                  </Option>
                ))}
              </Select>
            </div>
            <div className={styles.flexrow}>
              <Button onClick={() => setDuplicateModalVisible(true)}>
                New Semester
              </Button>
            </div>
          </div>
        )}
      </div>
      {selectedSemester !== undefined ? (
        <>
          <div className={styles.planHeader}>
            <Header level={2}>
              {selectedSemester.semester_number}/{selectedSemester.year_number}
            </Header>
            <div className={styles.rightContainer}>
              <Input
                placeholder="Search"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                search
                onSearch={search}
              />
              <Button onClick={() => handleAdd()}>Add</Button>
            </div>
          </div>
          <div className={styles.plan}>
            <div className={styles.collapseBox}>
              <Collapse accordion>
                {filterList?.map((item, i) => (
                  <Panel
                    header={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Header level={4}>
                          {item.course_number} {item.course_name_en}
                        </Header>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {/* {!e.section?<WarningOutlined style={{color:"red" ,margin:"010px"}} />:null} */}
                          <Popconfirm
                            title="Are you sure to delete this course?"
                            onConfirm={(e) => {
                              handleDeleteCourse(item);
                              e.stopPropagation();
                            }}
                            onCancel={(e) => e.stopPropagation()}
                          >
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <DeleteOutlined />
                            </div>
                          </Popconfirm>
                        </div>
                      </div>
                    }
                    key={i}
                  >
                    <SectionTable
                      section={item.sections}
                      teacher={teacher}
                      groupSectionId={item.group_sec_id}
                    />
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>
        </>
      ) : null}
      <Modal
        visible={isModalVisible}
        title={
          <Header level={2} style={{ padding: "1rem" }}>
            Add Course
          </Header>
        }
        onOk={() => handleAddCourse(targetKeys, selectedSemester.semester_id)}
        onCancel={handleCancel}
        okText={"Add"}
        width={1024}
        maskClosable={false}
        centered
      >
        <Transfer
          dataSource={allCourse}
          titles={["Courses", "Selected"]}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          showSearch
          listStyle={{
            width: 450,
            height: 400,
          }}
          operations={["Add", "Remove"]}
          locale={{
            itemUnit: "course",
            itemsUnit: "courses",
            searchPlaceholder: "Search by Course ID or Name",
          }}
          render={(item) => `${item.course_number} ${item.course_name_en}`}
        />
      </Modal>
      <Modal
        visible={duplicateModalVisible}
        title={<Header level={3}>New Semester</Header>}
        onOk={() => {
          const allYear = allSemester.map((e) => e.year_number);
          if (duplicate) {
            if (Math.max(...allYear) < new Date().getFullYear() + 545) {
              duplicateYear();
            } else {
              message.error("You can duplicate up to 2 year in advance");
            }
          } else {
            if (Math.max(...allYear) < new Date().getFullYear() + 545) {
              createSemester();
            } else {
              message.error("You can create up to 2 year in advance");
            }
          }
        }}
        onCancel={() => setDuplicateModalVisible(false)}
        okText={duplicate ? "Duplicate" : "Create"}
        width={600}
        maskClosable={false}
        centered
      >
        <Checkbox onChange={onChangeDuplicate}>
          <Header level={4}>Duplicate all semester from last year</Header>
        </Checkbox>
        <Body level={2}>
          <WarningTwoTone twoToneColor="#ffcc00" />
          &nbsp;You can duplicate a semester plan once each year.
        </Body>
        <Body level={2}>
          <WarningTwoTone twoToneColor="#ffcc00" />
          &nbsp;You can plan up to 2 year in advance.
        </Body>
        <Body level={2}>
          <WarningTwoTone twoToneColor="#ffcc00" />
          &nbsp;Cannot be delete if created.
        </Body>
      </Modal>
    </div>
  );
};
