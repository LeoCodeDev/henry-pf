import styles from "./styles/Bottom.module.css";

const Filter = () => {
  return (
    <div className={styles.selectDropdown}>
  <select>
    <option value="Option 1">Filter By</option>
    <option value="Option 2">Price</option>
    <option value="Option 3">Rating</option>
  </select>
</div>
  );
};

export default Filter;
