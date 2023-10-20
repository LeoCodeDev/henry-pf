import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TotalLeastSold = ({ lowSales }) => {
  return (
    <>
      <Typography align="center" marginBottom={1} sx={{ fontSize: "1.2rem", fontWeight: "bold", padding: '0'}}>
        Low Selling
      </Typography>
      <TableContainer component={Paper} sx={{ border: "1px solid #ccc" }}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{padding: '0.625rem', paddingLeft: '0.938rem', fontSize: '0.85rem'}} align="left">Product</TableCell>
              <TableCell sx={{padding: '0.625rem', fontSize: '0.85rem'}} align="left">Total Sells</TableCell>
              <TableCell sx={{padding: '0.625rem', fontSize: '0.85rem'}} align="center">Total Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lowSales?.map((item) => (
              <TableRow key={item.id_product}>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="center">{item.totalSales}</TableCell>
                <TableCell align="center">{item.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export { TotalLeastSold };

