import styles from "./styles/Bottom.module.css";
import {useProductsStore} from '../../store/productsStore'

const Order = () => {

  const {applySort} = useProductsStore()
  const handleChange = (event) => {
    applySort(event.target.value)
  }
  return (
    <div className={styles.selectDropdown}>
  <select onChange={handleChange}>
    <option 
    hidden
    value="">Order By</option>
    <option value="expensive">Higher Price 🡩</option>
    <option value="cheap">Lower price 🡫</option>
    <option value="abc">Alphabetical 🡩</option>
    <option value="zyx">Alphabetical 🡫</option>
    <option value="mRated">Higher Rate 🡩</option>
    <option value="lRated">Lower Rate 🡫</option>
  </select>
</div>  
  );
};

export default Order;
