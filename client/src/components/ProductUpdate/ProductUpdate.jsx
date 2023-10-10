import { useEffect, useState } from 'react';
import { Button, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useProductsStore } from '../../store/productsStore';
import style from './ProductUpdate.module.css';
import axios from 'axios';

export const Update = () => {
  const { activeDesactiveProducts, fetchActiveDesactiveProducts } = useProductsStore();
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para el orden, por defecto ascendente
  const [activeFilter, setActiveFilter] = useState('all'); // Estado para el filtro, por defecto muestra todos los productos

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
      return true; // Mostrar todos los productos
    } else if (activeFilter === 'active') {
      return product.active;
    } else {
      return !product.active;
    }
  });

  return (
    <Container className={style.container}>
      <div>
        <Typography variant="h6">Admin Products</Typography>
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={style.tableHeaderCell} onClick={() => handleSort('id_product')}>Id</TableCell>
              <TableCell className={style.tableHeaderCell} onClick={() => handleSort('name')}>Name</TableCell>
              <TableCell className={style.tableHeaderCell} onClick={() => handleSort('description')}>Description</TableCell>
              <TableCell className={style.tableHeaderCell} onClick={() => handleSort('price')}>Price</TableCell>
              <TableCell className={style.tableHeaderCell} onClick={() => handleSort('stock')}>Stock</TableCell>
              <TableCell className={style.tableHeaderCell} onClick={() => handleSort('rating')}>Rating</TableCell>
              <TableCell >Active</TableCell>
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
      </div>
    </Container>
  );
};
