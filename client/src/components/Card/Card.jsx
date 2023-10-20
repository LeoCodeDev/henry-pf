import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export const BasicCard= ({children, customHeight}) => {
  return (
    <Card sx={{ minWidth: 255, minHeight:  customHeight || 155 , padding: 0}}>
      <CardContent sx={{padding: 2}}>
        {children}
      </CardContent>
    </Card>
  );
}