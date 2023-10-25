import { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  useMediaQuery,
  ThemeProvider
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useProductsStore } from '../../store/productsStore'
import style from './ProductUpdate.module.css'
import axios from 'axios'
import theme from '../../../theme'

export const Update = () => {
  const {
    activeDesactiveProducts,
    fetchActiveDesactiveProducts,
    setProductsFiltered
  } = useProductsStore()
  const [sortOrder, setSortOrder] = useState({
    id_product: 'asc',
    name: 'asc',
    description: 'asc',
    price: 'asc',
    stock: 'asc',
    rating: 'asc'
  })
  const [activeFilter, setActiveFilter] = useState('all')


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchActiveDesactiveProducts()
        await setProductsFiltered()
      } catch (error) {
        throw new Error(error.message)
      }
    }
    fetchData()
  }, [fetchActiveDesactiveProducts])

  const listProducts = async () => {
    try {
      await fetchActiveDesactiveProducts()
      await setProductsFiltered()
    } catch (error) {
      throw new Error(error.message)
    }
  }
  const eraseproduct = async (productId) => {
    try {
      await axios.put(`/products/prod/${productId}`)
      listProducts()
    } catch (error) {
      console.error('Error al cambiar el estado del producto:', error)
    }
  }

  const handleSort = (column) => {
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [column]: prevSortOrder[column] === 'asc' ? 'desc' : 'asc'
    }))

    activeDesactiveProducts.sort((a, b) => {
      if (
        column === 'price' ||
        column === 'rating' ||
        column === 'id_product' ||
        column === 'stock'
      ) {
        const valueA = parseFloat(a[column])
        const valueB = parseFloat(b[column])
        if (column === 'id_product' || column === 'stock') {
          return sortOrder[column] === 'asc' ? valueA - valueB : valueB - valueA
        }
        return sortOrder[column] === 'asc' ? valueA - valueB : valueB - valueA
      } else {
        return sortOrder[column] === 'asc'
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column])
      }
    })
  }

  const handleFilter = (filter) => {
    setActiveFilter(filter)
  }

  const filteredProducts = activeDesactiveProducts?.filter((product) => {
    if (activeFilter === 'all') {
      return true
    } else if (activeFilter === 'active') {
      return product.active
    } else {
      return !product.active
    }
  })

  const isMobile = useMediaQuery('(max-width: 700px)')

  return (
    <ThemeProvider theme={theme}>
    <Container
      className={style.container}
      style={{
        textAlign: "center",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        borderRadius: "5px",
        maxWidth: "100%"
      }}
    >
      <div>
        <Typography
          variant="h6"
          color="#fff"
          sx={{ fontSize: { xs: "26px" }, padding: { xs: "5px" } }}
        >
          Admin Products
        </Typography>
        <div className={style.buttonContainer}>
          <Button
            sx={{ margin: "10px", lineHeight: { xs: "14px" } }}
            variant="contained"
            color="primary"
            onClick={listProducts}
          >
            Refresh list
          </Button>
          <Button
            sx={{ margin: "10px", lineHeight: { xs: "14px" } }}
            variant="contained"
            color="primary"
            onClick={() => handleFilter("all")}
          >
            Show All
          </Button>
          <Button
            sx={{ margin: "10px", lineHeight: { xs: "14px" } }}
            variant="contained"
            color="primary"
            onClick={() => handleFilter("active")}
            >
            Show Active
          </Button>
          <Button
            sx={{ margin: "10px", lineHeight: { xs: "14px" } }}
            variant="contained"
            color="primary"
            onClick={() => handleFilter("inactive")}
            >
            Show Inactive
          </Button>
        </div>

        <Grid sx={{ width: "100%" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ padding:  isMobile ? '2px' : 'none', fontSize: isMobile ? "10px" : "12px", color: '#fff' }}
                  className={`${style.tableHeaderCell} ${
                    sortOrder.id_product === "asc"
                      ? style.sortedAsc
                      : style.sortedDesc
                  }`}
                  onClick={() => handleSort("id_product")}
                >
                  Id
                </TableCell>
                <TableCell
                  sx={{
                    padding:  isMobile ? '2px' : 'none',
                    fontSize: isMobile ? "10px" : "12px",
                    display:  isMobile ? 'display' : 'table-Cell',
                    justifyContent:  isMobile ? 'center' : 'none',
                    color: '#fff'
                  }}
                  className={`${style.tableHeaderCell} ${
                    sortOrder.name === "asc"
                      ? style.sortedAsc
                      : style.sortedDesc
                  }`}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ padding: isMobile ? '2px' : 'none', fontSize: isMobile ? "10px" : "12px", color: '#fff' }}
                  className={`${style.tableHeaderCell} ${
                    sortOrder.description === "asc"
                      ? style.sortedAsc
                      : style.sortedDesc
                  }`}
                  onClick={() => handleSort("description")}
                >
                  Description
                </TableCell>
                <TableCell
                  sx={{
                    padding:  isMobile ? '2px' : 'none',
                    fontSize: isMobile ? "10px" : "12px",
                    display:  isMobile ? 'display' : 'table-Cell',
                    justifyContent:  isMobile ? 'center' : 'none',
                    color: '#fff'
                  }}
                  className={`${style.tableHeaderCell} ${
                    sortOrder.price === "asc"
                      ? style.sortedAsc
                      : style.sortedDesc
                  }`}
                  onClick={() => handleSort("price")}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ padding:  isMobile ? '2px' : 'none', fontSize: isMobile ? "10px" : "12px", color: '#fff' }}
                  className={`${style.tableHeaderCell} ${
                    sortOrder.stock === "asc"
                      ? style.sortedAsc
                      : style.sortedDesc
                  }`}
                  onClick={() => handleSort("stock")}
                >
                  Stock
                </TableCell>
                <TableCell
                  sx={{ padding:  isMobile ? '0px' : 'none', fontSize: isMobile ? "10px" : "12px",color: '#fff' }}
                  className={`${style.tableHeaderCell} ${
                    sortOrder.rating === "asc"
                      ? style.sortedAsc
                      : style.sortedDesc
                  }`}
                  onClick={() => handleSort("rating")}
                >
                  Rating
                </TableCell>
                <TableCell
                  sx={{
                    padding:  isMobile ? '2px' : 'none',
                    fontSize: isMobile ? "10px" : "12px",
                    display:  isMobile ? 'display' : 'table-Cell',
                    justifyContent:  isMobile ? 'center' : 'none',
                    color: '#fff'
                  }}
                >
                  Active
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts &&
                filteredProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ padding: isMobile ? '0px' : 'none',
                      fontSize: isMobile ? "10px" : "12px", color: '#fff' }}
                    >
                      {product.id_product}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: isMobile ? "20px" : "none",
                        fontSize: isMobile ? "10px" : "12px",
                        color: '#fff'
                      }}
                    >
                      {product.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: isMobile ? "10px" : "none",
                        fontSize: isMobile ? "10px" : "12px",
                        padding:  isMobile ? '5px' : 'none',
                        color: '#fff'
                      }}
                    >
                      {product.description}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isMobile ? "10px" : "12px", padding: isMobile ? '5px' : 'none', color: '#fff' }}
                    >
                      {product.price}
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? "10px" : "12px", color: '#fff' }}>
                      {product.stock}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isMobile ? "10px" : "12px", padding: isMobile ? '5px' : 'none', color: '#fff' }}
                    >
                      {product.rating}
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          fontSize: isMobile ? "10px" : "12px",
                          padding:  isMobile ? '2px' : 'none',
                        }}
                        variant="contained"
                        color={product.active ? "primary" : "secondary"}
                        onClick={() => eraseproduct(product.id_product)}
                      >
                        {product.active ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                    <Link
                      style={{ textDecoration: 'none', color: '#bfbfbf' }}
                      to={`/admin/table-update/detail/${product.id_product}`}>
                      View User Details
                    </Link>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      </div>
    </Container>
            </ThemeProvider>
  );
};
