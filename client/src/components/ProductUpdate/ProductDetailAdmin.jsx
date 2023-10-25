import  axios  from 'axios';
import { useState } from 'react';
import {
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  Paper,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsStore } from '../../store/productsStore'

const ProductDetailAdmin = () => {
    const [product, setProduct]= useState({})
    const [reportsReceived, setReportsReceived]=useState([])
    const [reviews, setReviews]=useState([])
    const {productId}= useParams()
    const [loading, setLoading]= useState(false)
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    const getProduct=async()=>{
        setLoading(true)
        const to= useProductsStore.getState().actualCurrency
        const { data } = await axios(`/products/productsById?id=${productId}&to=${to}`)
        setProduct(data)
        setLoading(false)
    }

    const getReportsReceived=async()=>{
      setLoading(true)
      const {data}= await axios.get(`/products/getProductsReports?productId=${productId}`)
      setReportsReceived(data)
      setLoading(false)
    }

    const getReviews=async()=>{
      setLoading(true)
      const {data}= await axios.get(`/products/getProductReviews/${productId}`)
      setReviews(data)
      setLoading(false)
    }

    
    useEffect(()=>{
        getProduct()
        getReportsReceived()
        getReviews()
    }, [])

    return (
      loading ? (
        <h1>Loading...</h1>
      ) : (
        <Paper style={{ padding: '20px', width: '70vw', margin: 'auto' }}>
              <Avatar alt={product.name} src={product.image} style={{ width: '150px', height: '150px', margin: 'auto' }} />
            <Typography variant="h5" align="center" gutterBottom>
              {`Price:${product.price}`}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              {`${product.description}`}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              {`Rating: ${product.rating} //
              Active: ${product.active} //
              Category: ${product.Category?.name}//
              Stock:${product.stock}`}
            </Typography>
  
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            
            <div style={{ margin: '1em', width: '100%' }}>
              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" gutterBottom>
                    Reports
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  Reports Received
                  <List>
                  {reportsReceived && reportsReceived.map((report) => (
                    <div  style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '16px' }}>
                    <ul key={report.id}>
                      {report.reason? report.reason : 'NA'}
                      <li>date:{report.date}</li>
                      {report.reporterId && 
                      <li>Reported by:{report.reporterUser.username}</li>}
                      <li>Checked:{report.checkedStatus}</li>
                    </ul>
                    </div>
                  ))}
                  </List>

                </AccordionDetails>
              </Accordion>
            </div>
  
            <div style={{ margin: '1em', width: '100%' }}>
              <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" gutterBottom>
                    Reviews
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {reviews && reviews.map((review) => (
                      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '16px' }}>
                      <ul key={review.id} >
                        <li>Comment: {review.comment}</li>
                        <li>Gave it {review.rating} stars</li>
                        <li>User: {review.User?.username}</li>
                      </ul>
                      </div>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </Paper>
      )
    );
};

export default ProductDetailAdmin;