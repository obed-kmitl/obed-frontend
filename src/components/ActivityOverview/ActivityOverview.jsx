import styles from "../ActivityOverview/ActivityOverview.module.scss";
import { ActivityTable, Header, Body, Select, Option } from "..";
import { Divider, Typography, Input } from "antd";
import { useActivityOverview } from "../ActivityOverview/hooks/useActivityOverview";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useActivityContext } from "../../contexts/ActivityContext";

export const ActivityOverview = ({
  activity,
  category,
  setActivity,
  setTotalScore,
}) => {
  const { activityId } = useActivityContext();
  const {
    isEditing,
    editOverview,
    saveOverview,
    handleEditDescription,
    changecategory,
    handleEditTitle,
  } = useActivityOverview(activity, setActivity, activityId);

  function Capitalize(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  }

  return (
    <>
      <div className={styles.overview}>
        {isEditing && (
          <div className={styles.top}>
            <Header level={2}>Title</Header>
            <Input
              onChange={({ target: { value } }) => handleEditTitle(value)}
              defaultValue={activity?.title}
              maxLength={50}
            />
          </div>
        )}
        <div className={styles.container}>
          <div className={styles.description}>
            <Header level={2}>Description</Header>
            <Divider
              style={{ border: "none", margin: "0.25rem", height: "0px" }}
            />
            <div>
              {isEditing ? (
                <Input.TextArea
                  style={{ resize: "none" }}
                  rows={3}
                  onChange={({ target: { value } }) =>
                    handleEditDescription(value)
                  }
                  defaultValue={activity?.detail}
                  showCount
                  maxLength={400}
                />
              ) : (
                <Body level={2}>{activity?.detail}</Body>
              )}
            </div>
          </div>
          <Divider type="vertical" style={{ height: "100%" }} />
          <div className={styles.right}>
            <div className={styles.category}>
              <Header level={2}>Category</Header>
              {isEditing ? (
                <Select
                  defaultValue={activity?.category_id || null}
                  onChange={(value) => changecategory(value)}
                >
                  {category.map((cat) => (
                    <Option value={cat.category_id || null}>{cat.title}</Option>
                  ))}
                </Select>
              ) : (
                <Body level={1}>
                  {category.filter(
                    (e) => e.category_id === activity?.category_id
                  )[0]?.title || "Unassigned"}
                </Body>
              )}
            </div>
            <Divider type="vertical" style={{ height: "100%" }} />
            <div className={styles.type}>
              <Header level={2}>Type</Header>
              {/* {isEditing ?
                                <Select
                                    defaultValue={activity?.type}
                                    onChange={(value) => changeType(value)}
                                >
                                    <Option value="INDIVIDUAL">Individual</Option>
                                    <Option value="GROUP">Group</Option>
                                </Select>
                                : */}
              <Body level={2}>{Capitalize(activity?.type)}</Body>
              {/* } */}
            </div>
          </div>
          {isEditing ? (
            <div className={styles.editicon}>
              <Typography.Link onClick={() => saveOverview()}>
                <SaveOutlined />
              </Typography.Link>
            </div>
          ) : (
            <div className={styles.editicon}>
              <Typography.Link onClick={() => editOverview()}>
                <EditOutlined />
              </Typography.Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.objective}>
        <ActivityTable
          subActivity={activity.subActivities}
          setTotalScore={setTotalScore}
        />
      </div>
    </>
  );
};
