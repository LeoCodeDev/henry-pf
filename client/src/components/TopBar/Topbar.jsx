import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const VariantButtonGroup = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
         marginTop: 9,
        },
      }}
    >
      
      <ButtonGroup variant="text" aria-label="text button group">
        <Button>All Teams</Button>
        <Button>FrontEnd</Button>
        <Button>BackEnd</Button>
        <Button>FullStack</Button>
        <Button>MobileApp</Button>
        <Button>DataScientist</Button>
        <Button>DevOps</Button>
        <Button>UX/UI</Button>
        <Button>QA Engineer</Button>
        <Button>Users</Button>
      </ButtonGroup>
    </Box>
  );
}

export { VariantButtonGroup }