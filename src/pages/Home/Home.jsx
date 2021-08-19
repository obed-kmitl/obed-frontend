import MyBtn from '../../components/Button/Button';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className="title">HOME</h1>
      <MyBtn carrot>ทดสอบ</MyBtn>
    </div>
  )
}
