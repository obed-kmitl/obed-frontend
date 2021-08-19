import {Button} from '../../components';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className="title">HOME</h1>
      <Button>ทดสอบ</Button>
    </div>
  )
}
