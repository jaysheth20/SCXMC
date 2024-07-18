import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useI18n } from 'next-localization';

import { OrderDetailType } from 'components/Account/Models/OrderDetailTypes';
import * as OrderService from 'src/services/OrderService';

interface OrderInfoProps {
  orderReview: OrderDetailType;
}

const OrderInfo = (props: OrderInfoProps) => {
  const { orderReview } = props;
  const searchParams = useSearchParams();
  const search = searchParams.get('oid');
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);

  const print = () => {
    setSubmitting(true);
    OrderService.printInvoice(search).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Order ' + search + '.pdf');
      document.body.appendChild(link);
      link.click();
      setSubmitting(false);
    });
  };

  return (
    <div className="block order-info">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="row print-button">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <Button
                variant="contained"
                className="btn btn-small btn--rounded btn--yellow"
                sx={{ mt: 1, mr: 1 }}
                disabled={submitting}
                onClick={() => print()}
              >
                {t('pdf-invoice')}
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>{t('order-number')}</label>
            </div>
            <div className="col-md-6 text-start">{orderReview.Id}</div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>{t('order-date')}</label>
            </div>
            <div className="col-md-6 text-start">
              {dayjs(orderReview.CreatedOn).format('MMM DD, YYYY')}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>{t('order-status')}</label>
            </div>
            <div className="col-md-6 text-start">{orderReview.OrderStatus}</div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>{t('order-total')}</label>
            </div>
            <div className="col-md-6 text-start">{orderReview.OrderTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
