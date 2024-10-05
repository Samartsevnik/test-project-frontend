import styles from './styles.module.css'
import ExchangeForm from '../../components/ExchangeForm/ExchangeForm.tsx';

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Crypto Exchange</h2>
      <h3 className={styles.subTitle}>Exchange fast and easy</h3>
      <ExchangeForm />
    </div>
  );
};

export default HomePage;