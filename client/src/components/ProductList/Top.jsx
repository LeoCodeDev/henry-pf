import Categories from './Categories'
import styles from './styles/Top.module.css'

function Top() {
  return (
    <div className={styles.contain}>
    <div>
       <h1 className={styles.top}>TOP TRENDING</h1> 
    </div>
      <div>
       <Categories />
      </div>
    </div>
  )
}

export default Top
