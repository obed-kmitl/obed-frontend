import styles from './Home.module.scss';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Home - OBED</title>
      </Helmet>
      <h1 className="title">OBED</h1>
      <ul>
        <li><Link to="/sandbox">Sandbox</Link></li>
        <li><Link to="/curriculum">Curriculum</Link></li>
      </ul>
    </div>
  )
}
