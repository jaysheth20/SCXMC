import React from 'react';
import { CardContent, Card } from '@mui/material';
import Typography from '@mui/material/Typography';

import { ShippingMethod } from 'src/components/Checkout/FormModel/ShippingMethodModel';

interface ShippingMethodCardProps {
  option: ShippingMethod;
}

const ShippingMethodCard = (props: ShippingMethodCardProps) => {
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
        <Typography variant="h4" component="div">
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

export default ShippingMethodCard;
