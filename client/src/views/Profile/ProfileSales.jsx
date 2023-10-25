import { Box, Typography } from "@mui/material";

const ProfileSales = ({ sale }) => {
  return (
    <div style={{width: '48%', margin: '5px'}}>
      <Box
        sx={{
          backgroundColor: "#1E1E1E",
          padding: '0.5rem',
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <div style={{textAlign: 'left', marginLeft: '1rem'}}>
          <Typography sx={{ fontSize: '1rem', color: "white" }}>
            Order Date
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: "white", marginLeft: '1px' }}>{sale.date.slice(0, 10)}</Typography>
        </div>
        <div style={{textAlign: 'center', marginRight: '1rem'}}>
          <Typography sx={{ fontSize: '1rem', color: "white" }}>
            Total
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: "white" }}>${sale.total}</Typography>
        </div>
        <div style={{textAlign: 'right', marginRight: '1rem'}}>
          <Typography sx={{ fontSize: '1rem', color: "white" }}>
            # Order
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: "white" }}>{sale.id_sale}</Typography>
        </div>
      </Box>
      <Box>
        {sale.Products.map((product, index) => (
          <div key={index} 
          style={{
          padding: "0.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          border: '1px solid #1E1E1E'
        }}
          >
            <div style={{ width: "3.65rem", height: '3.65rem', display: 'flex', justifyContent: 'center'}}>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography sx={{ color: "white", fontSize: '0.85rem' }}>
                Product Name
              </Typography>
              <Typography variant="body1">{product.name}</Typography>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'end'}}>
              <Typography  sx={{ color: "white", fontSize: '0.8 5rem'  }}>
                Price
              </Typography>
              <Typography variant="body1">${product.price}</Typography>
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
};

export { ProfileSales };