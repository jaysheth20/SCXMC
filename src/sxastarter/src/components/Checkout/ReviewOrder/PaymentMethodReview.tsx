import React from 'react';
import { useI18n } from 'next-localization';

interface PaymentMethodReviewProps {
  paymentMethod: string;
}

const PaymentMethodReview = (props: PaymentMethodReviewProps) => {
  const { paymentMethod } = props;
  const { t } = useI18n();
  return (
    <>
      <h5>{t('payment')}</h5>
      <div className="row">
        <div className="col-6">
          {' '}
          <label>{t('payment-method')}:</label>
        </div>
        <div className="col-6">
          {' '}
          <label>{paymentMethod}</label>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodReview;
