import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export const BasicCard= ({children, customHeight}) => {
  return (
    <Card sx={{ minWidth: 255, minHeight:  customHeight | 155 }}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}