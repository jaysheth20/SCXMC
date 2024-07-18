import React from 'react';
import { useI18n } from 'next-localization';

interface ShipingMethodReviewProps {
  shippingMethod: string;
}

const ShipingMethodReview = (props: ShipingMethodReviewProps) => {
  const { shippingMethod } = props;
  const { t } = useI18n();

  return (
    <>
      <h5>{t('shipping')}</h5>
      <div className="row">
        <div className="col-6">
          {' '}
          <label>{t('shipping-method')}:</label>
        </div>
        <div className="col-6">
          {' '}
          <label>{shippingMethod}</label>
        </div>
      </div>
    </>
  );
};

export default ShipingMethodReview;
