import styles from './Profile.module.scss';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const Profile = () => {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Profile - OBED</title>
      </Helmet>
      <h1 className="title">Profile Page</h1>
      <ul>
        <li><Link to="/sandbox">Sandbox</Link></li>
        <li><Link to="/curriculum">Curriculum</Link></li>
      </ul>
    </div>
  )
}
