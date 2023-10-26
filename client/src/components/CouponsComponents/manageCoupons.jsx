import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Checkbox,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

export default function ManageCoupons() {
  const [editCoupon, setEditCoupon] = useState(null)
  const [coupons, setCoupons] = useState([])

  const fetchCoupons = () => {
    try {
      axios.get('/dashboard/getCoupons').then((response) => {
        setCoupons(response.data)
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupons()
  }, [])

  const handleEditClick = (coupon) => {
    setEditCoupon(coupon)
  }

  const handleSaveClick = async () => {
    await axios.put(`/dashboard/updateCoupon?id=${editCoupon.id}`, {
      code: editCoupon.code,
      discount: editCoupon.discount,
      expiration: editCoupon.expiration,
      active: editCoupon.active
    })
    setEditCoupon(null)
    fetchCoupons()
  }

  const handleCancelClick = () => {
    setEditCoupon(null)
  }

  const handleInputChange = (property, value) => {
    setEditCoupon({ ...editCoupon, [property]: value })
  }

  return (
    <TableContainer component={Paper} style={{ margin: "10px" }}>
      <Typography sx={{color: '#fff', fontSize: '1.8rem', padding: '0.3rem', textAlign: 'center'}}>Manage Coupons </Typography>
      <Button
        variant="contained"
        sx={{
          size: "small",
          backgroundColor: "#539a07",
          ":hover": {
            bgcolor: "#228d07",
          },
        }}
        onClick={fetchCoupons}
      >
        {" "}
        Refresh{" "}
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Expiration</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>
                {editCoupon && editCoupon.id === coupon.id ? (
                  <TextField
                    value={editCoupon.code}
                    onChange={(e) => handleInputChange("code", e.target.value)}
                  />
                ) : (
                  coupon.code
                )}
              </TableCell>
              <TableCell>
                {editCoupon && editCoupon.id === coupon.id ? (
                  <TextField
                    value={editCoupon.discount}
                    type="number"
                    onChange={(e) =>
                      handleInputChange('discount', e.target.value)
                    }
                  />
                ) : (
                  `${coupon.discount}$`
                )}
              </TableCell>
              <TableCell>
                {editCoupon && editCoupon.id === coupon.id ? (
                  <TextField
                    value={editCoupon.expiration}
                    type="date"
                    onChange={(e) =>
                      handleInputChange('expiration', e.target.value)
                    }
                  />
                ) : (
                  coupon.expiration
                )}
              </TableCell>
              <TableCell>
                {editCoupon && editCoupon.id === coupon.id ? (
                  <Checkbox
                    sx={{
                      color: "#228d07",
                      "&.Mui-checked": {
                        color: "#228d07",
                      },
                    }}
                    checked={editCoupon.active}
                    onChange={(e) =>
                      handleInputChange('active', e.target.checked)
                    }
                  />
                ) : coupon.active ? (
                  'Active'
                ) : (
                  'Deactivated'
                )}
              </TableCell>
              <TableCell>
                {editCoupon && editCoupon.id === coupon.id ? (
                  <div>
                    <Button
                      variant="contained"
                      sx={{
                        size: "small",
                        backgroundColor: "#228d07",
                      }}
                      color="primary"
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: "5px",
                        size: "small",
                        backgroundColor: "#228d07",
                      }}
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <IconButton onClick={() => handleEditClick(coupon)}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

