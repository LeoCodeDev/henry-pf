import styles from "./styles/Bottom.module.css";

const Order = () => {
  return (
    <div className={styles.selectDropdown}>
  <select>
    <option value="Option 1">Order By</option>
    <option value="Option 2">Higher 🡩</option>
    <option value="Option 3">Lower 🡫</option>
  </select>
</div>
  );
};

export default Order;
