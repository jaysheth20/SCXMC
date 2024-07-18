import React, { useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Skeleton from '@mui/material/Skeleton';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import BillingAddressSection from 'src/components/Checkout/Address/BillingAddressSection';
import ShippingAddressSection from 'src/components/Checkout/Address/ShippingAddressSection';
import ShippingMethodSection from 'src/components/Checkout/ShippingMethod/ShippingMethodSection';
import PaymentMethodSection from 'src/components/Checkout/PaymentMethod/PaymentMethodSection';
import PaymentInformationSection from 'src/components/Checkout/PaymentInformation/PaymentInformationSection';
import OrderReviewSection from 'src/components/Checkout/ReviewOrder/OrderReviewSection';
import { CardDetail } from 'src/components/Checkout/FormModel/PaymentInformation';
import CheckoutStatus from 'components/CheckoutStatus/CheckoutStatus';
import * as ShoppingCartService from 'src/services/ShoppingCartService';
import { RouteFields } from 'lib/component-props/RouteFields';

const Checkout = () => {
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as RouteFields;
  const [activeStep, setActiveStep] = useState(0);
  const [isshipToSameAddress, setIsShipToSameAddress] = useState(false);
  const [isPickup, setPickup] = useState(false);
  const [requiresShipping, setRequiresShipping] = useState(false);
  const [cardDetail, setCardDetail] = useState<CardDetail>();
  const [steps, setSteps] = useState<any>([]);

  useEffect(() => {
    ShoppingCartService.getOrderTotals()
      .then((res) => {
        if (res.data.RequiresShipping) {
          setRequiresShipping(true);
          setSteps([
            'Billing address',
            'Shipping Address',
            'Shipping Method',
            'Payment method',
            'Payment Information',
            'Confrim Order',
          ]);
        } else {
          setRequiresShipping(false);
          setSteps(['Billing address', 'Payment method', 'Payment Information', 'Confrim Order']);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleNext = (plus: number) => {
    setActiveStep((prevActiveStep) => prevActiveStep + plus);
  };

  const handleBack = (minus: number) => {
    setActiveStep((prevActiveStep) => prevActiveStep - minus);
  };

  const handlePaymentInfo = (detail: CardDetail) => {
    setCardDetail(detail);
  };

  const handleShipToSameAddress = (isShipSame: boolean) => {
    setIsShipToSameAddress(isShipSame);
  };

  const handleSetPickup = (isPickup: boolean) => {
    setPickup(isPickup);
  };

  const renderStepContent = (step: number) => {
    if (requiresShipping) {
      switch (step) {
        case 0:
          return (
            <BillingAddressSection
              handleShipToSameAddress={handleShipToSameAddress}
              handleNext={handleNext}
            />
          );
        case 1:
          return (
            <ShippingAddressSection
              handleNext={handleNext}
              handleSetPickup={handleSetPickup}
              handleBack={handleBack}
            />
          );
        case 2:
          return (
            <ShippingMethodSection
              handleNext={handleNext}
              isshipToSameAddress={isshipToSameAddress}
              handleBack={handleBack}
            />
          );
        case 3:
          return (
            <PaymentMethodSection
              handleNext={handleNext}
              isPickup={isPickup}
              handleBack={handleBack}
            />
          );
        case 4:
          return (
            <PaymentInformationSection
              handleNext={handleNext}
              handlePaymentInfo={handlePaymentInfo}
              handleBack={handleBack}
            />
          );
        case 5:
          return <OrderReviewSection cardDetail={cardDetail} handleBack={handleBack} />;
        default:
          return <div>Not Found</div>;
      }
    } else {
      switch (step) {
        case 0:
          return (
            <BillingAddressSection
              handleShipToSameAddress={handleShipToSameAddress}
              handleNext={handleNext}
            />
          );
        case 1:
          return (
            <PaymentMethodSection
              handleNext={handleNext}
              isPickup={false}
              handleBack={handleBack}
            />
          );
        case 2:
          return (
            <PaymentInformationSection
              handleNext={handleNext}
              handlePaymentInfo={handlePaymentInfo}
              handleBack={handleBack}
            />
          );
        case 3:
          return <OrderReviewSection cardDetail={cardDetail} handleBack={handleBack} />;
        default:
          return <div>Not Found</div>;
      }
    }
  };
  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">{fields.pageTitle.value}</h3>
          <CheckoutStatus step="checkout" />
        </div>

        <div className="checkout-content">
          <div className="col-md-12">
            {steps && steps.length ? (
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step: any, index: any) => (
                  <Step key={step}>
                    <div className="block">
                      <StepLabel className="stepper-label">
                        {step}
                        <hr className="my-1"></hr>
                      </StepLabel>
                      <StepContent>{renderStepContent(index)}</StepContent>
                    </div>
                  </Step>
                ))}
              </Stepper>
            ) : (
              <>
                {' '}
                <Skeleton sx={{ height: 100 }} />
                <Skeleton sx={{ height: 100 }} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Checkout;
