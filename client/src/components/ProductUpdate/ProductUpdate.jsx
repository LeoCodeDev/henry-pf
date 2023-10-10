import { useEffect, useState } from 'react';
import { Button, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Grid } from '@mui/material';
import { useProductsStore } from '../../store/productsStore';
import style from './ProductUpdate.module.css';
import axios from 'axios';

export const Update = () => {
  const { activeDesactiveProducts, fetchActiveDesactiveProducts } = useProductsStore();
  const [sortOrder, setSortOrder] = useState({
    id_product: 'asc',
    name: 'asc',
    description: 'asc',
    price: 'asc',
    stock: 'asc',
    rating: 'asc',
  });
  const [activeFilter, setActiveFilter] = useState('all');

  const eraseproduct = async (productId) => {
    try {
      await axios.put(`/prod/${productId}`);
      listProducts();
    } catch (error) {
      console.error('Error al cambiar el estado del producto:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchActiveDesactiveProducts();
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchData();
  }, [fetchActiveDesactiveProducts]);

  const listProducts = async () => {
    try {
      await fetchActiveDesactiveProducts();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSort = (column) => {
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [column]: prevSortOrder[column] === 'asc' ? 'desc' : 'asc',
    }));

    activeDesactiveProducts.sort((a, b) => {
      if (column === 'price' || column === 'rating' || column === 'id_product' || column === 'stock') {
        const valueA = parseFloat(a[column]);
        const valueB = parseFloat(b[column]);
        if (column === 'id_product' || column === 'stock') {
          return sortOrder[column] === 'asc' ? valueA - valueB : valueB - valueA;
        }
        return sortOrder[column] === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return sortOrder[column] === 'asc'
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      }
    });
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  const filteredProducts = activeDesactiveProducts?.filter((product) => {
    if (activeFilter === 'all') {
      return true;
    } else if (activeFilter === 'active') {
      return product.active;
    } else {
      return !product.active;
    }
  });

  return (
    <Container className={style.container} style={{ marginTop:"15vh", textAlign:"center", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap"}}>
      <div>
        <Typography variant="h6" color="primary">Admin Products</Typography>
        <Button variant="contained" color="primary" onClick={listProducts}>
          Refresh list
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleFilter('all')}>
          Show All
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleFilter('active')}>
          Show Active
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleFilter('inactive')}>
          Show Inactive
        </Button>
        <Grid>

        <Table  size="small">
          <TableHead>
            <TableRow>
              <TableCell
                className={`${style.tableHeaderCell} ${sortOrder.id_product === 'asc' ? style.sortedAsc : style.sortedDesc}`}
                onClick={() => handleSort('id_product')}
              >
                Id
              </TableCell>
              <TableCell
                className={`${style.tableHeaderCell} ${sortOrder.name === 'asc' ? style.sortedAsc : style.sortedDesc}`}
                onClick={() => handleSort('name')}
              >
                Name
              </TableCell>
              <TableCell
                className={`${style.tableHeaderCell} ${sortOrder.description === 'asc' ? style.sortedAsc : style.sortedDesc}`}
                onClick={() => handleSort('description')}
              >
                Description
              </TableCell>
              <TableCell
                className={`${style.tableHeaderCell} ${sortOrder.price === 'asc' ? style.sortedAsc : style.sortedDesc}`}
                onClick={() => handleSort('price')}
              >
                Price
              </TableCell>
              <TableCell
                className={`${style.tableHeaderCell} ${sortOrder.stock === 'asc' ? style.sortedAsc : style.sortedDesc}`}
                onClick={() => handleSort('stock')}
              >
                Stock
              </TableCell>
              <TableCell
                className={`${style.tableHeaderCell} ${sortOrder.rating === 'asc' ? style.sortedAsc : style.sortedDesc}`}
                onClick={() => handleSort('rating')}
              >
                Rating
              </TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts && filteredProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.id_product}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={product.active ? 'primary' : 'secondary'}
                    onClick={() => eraseproduct(product.id_product)}
                  >
                    {product.active ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Grid>
      </div>
    </Container>
  );
};
