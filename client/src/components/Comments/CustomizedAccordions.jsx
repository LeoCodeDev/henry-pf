import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: '95%', 
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  fontWeight: 'normal'
}));

export default function CustomizedAccordions() {
  const comments = [
    { user: 'User #1', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores dolor, modi velit sed corporis veniam neque recusandae voluptas vitae quas eum animi, quisquam magnam, eligendi odio suscipit porro harum accusantium.' },
    { user: 'User #2', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores dolor, modi velit sed corporis veniam neque recusandae voluptas vitae quas eum animi, quisquam magnam, eligendi odio suscipit porro harum accusantium.' },
    { user: 'User #3', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores dolor, modi velit sed corporis veniam neque recusandae voluptas vitae quas eum animi, quisquam magnam, eligendi odio suscipit porro harum accusantium.' },
    { user: 'User #4', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores dolor, modi velit sed corporis veniam neque recusandae voluptas vitae quas eum animi, quisquam magnam, eligendi odio suscipit porro harum accusantium.' },
    { user: 'User #5', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores dolor, modi velit sed corporis veniam neque recusandae voluptas vitae quas eum animi, quisquam magnam, eligendi odio suscipit porro harum accusantium.' },
    { user: 'User #6', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores dolor, modi velit sed corporis veniam neque recusandae voluptas vitae quas eum animi, quisquam magnam, eligendi odio suscipit porro harum accusantium.' },
    // Add more comments here
  ];

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(null); // Estado para controlar la expansión de los acordeones

  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / itemsPerPage);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderComments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleComments = comments.slice(startIndex, endIndex);

    return visibleComments.map((comment, index) => (
      <Accordion
        key={index}
        expanded={expanded === `panel${startIndex + index + 1}`}
        onChange={handleChange(`panel${startIndex + index + 1}`)}
      >
        <AccordionSummary aria-controls={`panel${startIndex + index + 1}d-content`} id={`panel${startIndex + index + 1}d-header`}>
          <Typography color={"#1c7805"}>{comment.user}</Typography>
          <Typography sx={{ marginLeft: 4 }}>Title + Date + Qualification</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{comment.content}</Typography>
        </AccordionDetails>
      </Accordion>
    ));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'} mt={-4}>
      <Stack p={2} sx={{ width: 'auto' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          size="small"
          onChange={(event, page) => handlePageChange(page)}
        />
      </Stack>
      {renderComments()}
    </Box>
  );
}
