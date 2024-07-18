import React from 'react';
import { useI18n } from 'next-localization';

import { BillingAddress } from 'components/Cart/Models/ShoppingCartType';

interface ShippingAddressReviewProps {
  shippingData: BillingAddress;
}

const ShippingAddressReview = (props: ShippingAddressReviewProps) => {
  const { shippingData } = props;
  const { t } = useI18n();

  return (
    <>
      <h5>{t('shipping-address')}</h5>
      <div className="row">
        <div className="col-md-6">
          <label>{t('first-name')}</label>
        </div>
        <div className="col-md-6 text-start">{shippingData.FirstName}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{t('last-name')}</label>
        </div>
        <div className="col-md-6 text-start">{shippingData.LastName}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{t('email')}</label>
        </div>
        <div className="col-md-6 text-start">{shippingData.Email}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{t('phone')}</label>
        </div>
        <div className="col-md-6 text-start">{shippingData.PhoneNumber}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{t('fax')}</label>
        </div>
        <div className="col-md-6 text-start">{shippingData.FaxNumber}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{shippingData.Address1}</label>
          <br></br>
          <label>{shippingData.Address2}</label>
          <br></br>
          <label> {shippingData.City}</label>
          <br></br>
          <label> {shippingData.StateProvinceName}</label>
          <br></br>
          <label> {shippingData.CountryName}</label>
          <br></br>
          <label> {shippingData.ZipPostalCode}</label>
          <br></br>
        </div>
      </div>
    </>
  );
};

export default ShippingAddressReview;
