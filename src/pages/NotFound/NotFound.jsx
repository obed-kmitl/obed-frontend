import styles from "./NotFound.module.scss";
import { WarningTwoTone } from "@ant-design/icons";
import { Button } from "../../components";
import { Link } from "react-router-dom";

export const NotFound = () => {
  const isAdmin = window.location.host.split(".")[0] === "admin";

  return (
    <div className={styles.notFound}>
      <WarningTwoTone
        twoToneColor={isAdmin ? "#009FC7" : "#F7941D"}
        className={styles.icon}
      />
      <h1 className={styles.num}>404</h1>
      <h3 level={1} className={styles.text}>
        Page not found
      </h3>
      <Link to="/">
        <Button type="primary" carrot={!isAdmin}>
          Home
        </Button>
      </Link>
    </div>
  );
};
