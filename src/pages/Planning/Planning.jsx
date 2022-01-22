import styles from "../Planning/Planning.module.scss"
import { Helmet } from "react-helmet";
import { Header, WeightingTable } from "../../components";
import { Divider } from "antd";
import { useParams } from "react-router-dom";

export const Planning = () => {
    let { sectionId } = useParams();
    return (
        <div className={styles.planning}>
            <Helmet>
                <title>{sectionId} Planning - OBED</title>
            </Helmet>
            <div className={styles.head}>
                <Header level={1}>Planning</Header>
            </div>
            <Divider />
            <WeightingTable/>
        </div>
    );
};
