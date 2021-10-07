import styles from "./Home.module.scss";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className={styles.home}>
      <Helmet>
        <title>Home - OBED</title>
      </Helmet>
      <h1 className="title">OBED</h1>
      <ul>
        <li>
          <Link to="/sandbox">Sandbox</Link>
        </li>
        <li>
          <Link to="/curriculum">Curriculum</Link>
        </li>
        <li>
          <Link to="/teacher">Teacher</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};
