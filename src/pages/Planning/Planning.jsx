import styles from "../Planning/Planning.module.scss"
import { Helmet } from "react-helmet";
import { Header, WeightingTable } from "../../components";
import { Divider } from "antd";

export const Planning = () => {
    return (
        <div className={styles.planning}>
            <Helmet>
                <title>Planning - OBED</title>
            </Helmet>
            <div className={styles.head}>
                <Header level={1}>Planning</Header>
            </div>
            <Divider />
            <WeightingTable/>
        </div>
    );
};
