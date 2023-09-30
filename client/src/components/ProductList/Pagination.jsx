import { IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import styles from "./styles/Bottom.module.css";
import { useProductsStore } from "../../store/productsStore";

function Pagination() {
  const currentPage = useProductsStore((state) => state.currentPage);
  const totalPages = useProductsStore((state) => state.getTotalPages);
  const goNextPage = useProductsStore((state) => state.goNextPage);
  const goPrevPage = useProductsStore((state) => state.goPrevPage);
  return (
    <div className={styles.paginationContain}>
      <IconButton
        onClick={() => goPrevPage()}
        disabled={currentPage === 0}
        sx={{ color: "#bfbfbf" }}
      >
        <ArrowBackIosNew />
      </IconButton>
      <span>
        {currentPage + 1} / {totalPages()}
      </span>
      <IconButton
        onClick={() => goNextPage(currentPage + 1)}
        disabled={currentPage === totalPages() - 1}
        sx={{ color: "#539a07" }}
      >
        <ArrowForwardIos />
      </IconButton>
    </div>
  );
}

export default Pagination;
