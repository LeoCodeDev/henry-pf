import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TotalBestBuyer = ({ highBuyer }) => {
  return (
    <div>
      <Typography align="center" marginBottom={2} sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>Best Buyers</Typography>
      <TableContainer component={Paper} sx={{ border: "1px solid #ccc" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell  sx={{padding: '0.625rem', fontSize: '0.85rem'}} align="left">Name</TableCell>
              <TableCell sx={{padding: '0.625rem', fontSize: '0.85rem'}} align="left">Last Name</TableCell>
              <TableCell sx={{padding: '0.625rem', fontSize: '0.85rem'}} align="left">Email</TableCell>
              <TableCell sx={{padding: '0.625rem', fontSize: '0.85rem'}} align="center">Total Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {highBuyer?.map((item) => (
              <TableRow key={item.id_user}>
                <TableCell align="left">{item.first_name}</TableCell>
                <TableCell align="left">{item.last_name}</TableCell>
                <TableCell align="left">{item.email}</TableCell>
                <TableCell align="center">{item.totalSales}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export { TotalBestBuyer };