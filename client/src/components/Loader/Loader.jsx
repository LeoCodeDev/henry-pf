import styles from "../Loader/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.ring} id="spinner">
    LOADING
      <span className={styles.ringInner}></span>
    </div>
  );
}
