//import { useParams } from "react-router-dom";
import styles from "../Planning/Planning.module.scss"
import { Helmet } from "react-helmet";
import { Header, Button, Body } from "../../components";
import { Divider, Empty } from "antd";
import { useParams } from "react-router-dom";
import { useWeighting } from "./hooks/useWeighting";

const WeightingCard = ({data}) => {
    return (
        <div className={styles.card}>
            <Body level={1}>{data.catagory}</Body>
            <Body level={1}>{data.weight} %</Body>
        </div>
    )
}


export const Planning = () => {
    let { sectionId } = useParams();
    const [weightingList, isEditing, handleEditBtn, handleAddWeighting] = useWeighting()

    return (
        <div className={styles.planning}>
            <Helmet>
                <title>{sectionId} Planning - OBED</title>
            </Helmet>
            <div className={styles.head}>
                <Header level={1}>Planning</Header>
            </div>
            <Divider />
            <div className={styles.details}>
                <div className={styles.flexrowSpace}>
                    <Header level={2}>Score Weighting</Header>
                    {isEditing ?
                        <Button onClick={() => handleAddWeighting()}>Add</Button>
                        :
                        <Button onClick={() => handleEditBtn()}>Edit</Button>
                    }
                </div>
                {weightingList === undefined ?
                    <div>
                        <Empty
                            style={{ margin: "100px", color: "#c3c3c4", fontSize: "20px", fontWeight: "500" }}
                            imageStyle={{ height: 100 }}
                            description="No Score Weighting data, Please click Edit button!"
                        />
                    </div>
                    :
                    <div className={styles.cardList}>
                        {weightingList?.map((item) =>
                            <WeightingCard data={item} key={item.id}/>
                        )}
                    </div>
                }
                {isEditing &&
                    <div className={styles.btnGroup}>
                        <Button>Cancel</Button>
                        <Button type="primary">Save</Button>
                    </div>
                }
            </div>
        </div>
    );
};
