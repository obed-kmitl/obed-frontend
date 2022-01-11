import styles from "./NotFound.module.scss";
import { WarningTwoTone } from "@ant-design/icons";
import { Button } from "../../components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export const NotFound = () => {
  const { user } = useContext(UserContext);
  const isAdmin = user?.role === "ADMIN";

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
