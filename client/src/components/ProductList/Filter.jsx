import styles from "./styles/Bottom.module.css";
import {useProductsStore} from '../../store/productsStore'

const Filter = () => {

  const {clearFilters, applyFilters} = useProductsStore()
  
  const handleChange = async (event) => {
    await clearFilters()
    applyFilters(event.target.value);
  }
  return (
    <div className={styles.selectDropdown}>
  <select onChange={handleChange}>
    <option 
    hidden
    value="">Filter By</option>
    <option value='P1'>0 - 50</option>
    <option value='P2'>0 - 100</option>
    <option value='R4'> 4 stars</option>
    <option value='R1'> 1 stars</option>
  </select>
</div>
  );
};

export default Filter;
