/* import { IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import styles from "./styles/Bottom.module.css";
import { useState, useEffect } from "react";
import { useProductsStore } from "../../store/productsStore";

function Pagination() {
  const products = useProductsStore((state) => state.filteredProducts);
  const [ currentPage, setCurrentPage ] = useState(0);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
  }
}

const handlePrevPage = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
}

const goToPage = (page) => {
if(page > 0 && page <= totalPages){
  setCurrentPage(page);
}
}

useEffect(() => {
  setCurrentPage(0)
}, [products]);


  return (
    <div className={styles.paginationContain}>
      <IconButton
        onClick={handlePrevPage}
        disabled={currentPage === 0}
        sx={{ color: "#bfbfbf" }}
      >
        <ArrowBackIosNew />
      </IconButton>
      <span>
        {currentPage + 1} / {totalPages}
      </span>
      <IconButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
        sx={{ color: "#539a07" }}
      >
        <ArrowForwardIos />
      </IconButton>
    </div>
  );
}

export default Pagination;
 */