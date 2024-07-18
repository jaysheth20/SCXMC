import { useI18n } from 'next-localization';

import { BillingAddress } from 'components/Cart/Models/ShoppingCartType';

interface BillingAddressReviewProps {
  billingData: BillingAddress;
}

const BillingAddressReview = (props: BillingAddressReviewProps) => {
  const { billingData } = props;
  const { t } = useI18n();

  return (
    <div className="billing-address-block">
      <h5>{t('billing-address')}</h5>
      <div className="row">
        <div className="col-md-6">
          <label>{t('first-name')}</label>
        </div>
        <div className="col-md-6 text-start">{billingData.FirstName}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{t('last-name')}</label>
        </div>
        <div className="col-md-6 text-start">{billingData.LastName}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{t('email')}</label>
        </div>
        <div className="col-md-6 text-start">{billingData.Email}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{t('phone')}</label>
        </div>
        <div className="col-md-6 text-start">{billingData.PhoneNumber}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{t('fax')}</label>
        </div>
        <div className="col-md-6 text-start">{billingData.FaxNumber}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>{billingData.Address1}</label>
          <br></br>
          <label>{billingData.Address2}</label>
          <br></br>
          <label> {billingData.City}</label>
          <br></br>
          <label> {billingData.StateProvinceName}</label>
          <br></br>
          <label> {billingData.CountryName}</label>
          <br></br>
          <label> {billingData.ZipPostalCode}</label>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default BillingAddressReview;
