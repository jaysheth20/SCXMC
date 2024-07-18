import React from 'react';
import { CardContent, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

import { PaymentMethod } from 'src/components/Checkout/FormModel/PaymentMethodModel';

interface PaymethodMethodCardProps {
  option: PaymentMethod;
}

const PaymethodMethodCard = (props: PaymethodMethodCardProps) => {
  const { option } = props;

  return (
    <Card
      sx={{
        mx: '2px',
        borderRadius: 2,
        border: 'solid',
        borderWidth: '1px',
        borderColor: option.Selected == true ? 'primary.main' : 'black',
        boxShadow: 1,
        backgroundColor: 'ghostwhite',
        transform: 'scale(0.8)',
      }}
    >
      <CardContent>
        <CardMedia
          component="img"
          sx={{ my: '10px', height: 100, width: 100, objectFit: 'fill', borderRadius: '8px' }}
          image={option.LogoUrl}
        />

        <Typography variant="h5" component="div">
          {option.Name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 20, display: 'inline-block' }}
          color="text.secondary"
        >
          {option.Description}
        </Typography>
        <hr></hr>
        <Typography
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 20,
          }}
        >
          {option.Fee}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PaymethodMethodCard;
