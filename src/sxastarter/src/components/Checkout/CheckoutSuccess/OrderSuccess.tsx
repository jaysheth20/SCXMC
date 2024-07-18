import React from 'react';
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useI18n } from 'next-localization';

const OrderSuccess = () => {
  const searchParams = useSearchParams();
  const ordernumber = searchParams.get('ordernumber');
  const { t } = useI18n();

  return (
    <section className="cart">
      <div className="container">
        <Typography variant="h5" gutterBottom>
          {t('order-number')}: {ordernumber}
        </Typography>
        <Typography variant="subtitle1">{t('order-success')}</Typography>
      </div>
    </section>
  );
};

export default OrderSuccess;
