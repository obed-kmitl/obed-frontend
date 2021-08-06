import { MyBtn } from '../../components';
import styles from './sandbox.module.scss';

export default function Sandbox() {
  return (
    <div className={styles.container}>
      <h1><strong>OB</strong>ED SANDBOX</h1>
      <p>Button</p>
      <div className={styles.btnContainer}>
        <MyBtn type="primary" onClick={() => alert('Clicked')}>Primary</MyBtn>
        <MyBtn>Seccondary</MyBtn>
        <MyBtn type="primary" carrot>Primary</MyBtn>
        <MyBtn carrot>Seccondary</MyBtn>
        <MyBtn danger onClick={() => alert('Danger')}>Seccondary</MyBtn>
        <MyBtn disabled>Disabled</MyBtn>
      </div><hr />
    </div>
  );
}
