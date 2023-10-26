import  axios  from 'axios';
import { useState } from 'react';
import {
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';

const UserDetails = () => {
    const [user, setUser]= useState({})
    const [reportsMade, setReportsMade]=useState([])
    const [reportsReceived, setReportsReceived]=useState([])
    const [reviews, setReviews]=useState([])
    const {email}= useParams()
    const [loading, setLoading]= useState(true)
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    const getUser=async()=>{
        const {data}= await axios.get(`/users/getUser?email=${email}`)
        setUser(data)
        setLoading(false)
    }

    const getReportsMade=async()=>{
      const {data}= await axios.get(`/dashboard/getReportsByUser?email=${email}`)
      setReportsMade(data)
      setLoading(false)
    }

    const getReportsReceived=async()=>{
      const {data}= await axios.get(`/dashboard/getReportsToUser?email=${email}`)
      setReportsReceived(data)
      setLoading(false)
    }

    const getReviews=async()=>{
      const {data}= await axios.get(`/dashboard/getUserRating?email=${email}`)
      setReviews(data)
      setLoading(false)
    }

    const toggleAdmin=async(id_user, role)=>{
      setLoading(true)
      try {
        await axios.put(`/users/manageUser?id_user=${id_user}`, {role})
        getUser()
        setLoading(false) 
        toast.success('User updated successfully')      
      } catch (error) {
        setLoading(false)
        toast.error(error.message)
      }
    }  
    
    useEffect(() => {
      getUser()
      getReportsMade()
      getReportsReceived()  
      getReviews()
    }, []);

    console.log({user, reportsMade, reportsReceived, reviews})
    return (
      loading ? (
        <h1>Loading...</h1>
      ) : (
        <Paper style={{ padding: '20px', width: '70vw', margin: 'auto' }}>
              <Avatar alt={user.username} src={user.avatar} style={{ width: '150px', height: '150px', margin: 'auto' }} />
            <Typography variant="h5" align="center" gutterBottom>
              {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              {`${user.username}`}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              {`Email: ${user.email} //
              Role: ${user.role} //
              Team: ${user.Team?.name}`}
            </Typography>
          <Button
            variant="contained"
            sx={{
              size: 'large',
              backgroundColor: '#010402',
              display: 'block',
              margin: 'auto',
            }}
            onClick={() => toggleAdmin(user.id_user, user.role)}
          >
            {user.role === 'Admin' ? 'Remove admin permissions' : 'Make user admin'}
          </Button>
  
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ margin: '1em', width: '100%' }}>
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" gutterBottom>
                    Sales
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {user.Sales && user.Sales.map((sale) => (
                      <ListItem key={sale.id_sale} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '16px' }}>
                      <div>
                      <Typography variant="subtitle1">
                          Total:{sale.total} USD
                      </Typography>
                      <Typography variant="body2">
                          Products: {sale.Products.map((product) => product.name).join(', ')}
                      </Typography>
                      <Typography variant="body2">
                          Date: {sale.date}
                      </Typography>
                      </div>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </div>
  
            <div style={{ margin: '1em', width: '100%' }}>
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" gutterBottom>
                    Saved Routines
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List >
                    {user.Routines && user.Routines.map((routine) => (
                      <ListItem key={routine.name_routine} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '16px' }}>
                        <ListItemText primary={routine.name_routine} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </div>
  
            <div style={{ margin: '1em', width: '100%' }}>
              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" gutterBottom>
                    Reports
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                  Reports Made
                  {reportsMade && reportsMade.map((report) => (
                    <div  style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '16px' }}>
                    <ul key={report.id_report}>
                      {report.reason && report.reason}
                      <li>Type:{report.reportType && report.reportType}</li>
                      <li>date:{report.date}</li>
                      {report.reportedIdUser && 
                      <li>Reported:{report.reportedUser.username}</li>}
                      {report.reportedIdComment && 
                      <li>Reported:{report.reportedComment.comment}</li>}
                      {report.reportedIdProduct && 
                      <li>Reported:{report.reportedProduct.product}</li>}
                      <li>Checked:{report.checkedStatus}</li>
                    </ul>
                    </div>
                  ))}
                  </List>
                  Reports Received
                  <List>
                  {reportsReceived && reportsReceived.map((report) => (
                    <div  style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '16px' }}>
                    <ul key={report.id_report}>
                      {report.reason && report.reason}
                      <li>Type:{report.reportType && report.reportType}</li>
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
                        <ul key={review.id}>
                          <li>Product: {review.Product && review.Product.name }</li>
                          <li>Comment: {review.comment}</li>
                          <li>Gave it {review.rating} stars</li>
                        </ul>
                      </div>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </Paper>
      )
    );
};

export default UserDetails;
