import { Paper } from '@mui/material';

function Item({item}) {
  return (
    <Paper sx={{backgroundColor: '#010402', boxSizing: 'content-box'}}>
      <img src={item.image} alt={item.title} style={{width:'100%', height: '100%'}}/>
    </Paper>
  );
}

export default Item;
