import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useI18n } from 'next-localization';

import PaymethodMethodCard from 'src/components/Checkout/PaymentMethod/PaymethodMethodCard';
import {
  PaymentMethod,
  PaymentMethodModel,
} from 'src/components/Checkout/FormModel/PaymentMethodModel';
import * as CheckoutService from 'src/services/CheckoutService';

interface PaymentMethodSectionProps {
  handleNext: any;
  handleBack: any;
  isPickup: any;
}

const PaymentMethodSection = (props: PaymentMethodSectionProps) => {
  const { handleBack, handleNext, isPickup } = props;
  const [selectedMethod, setselectedPickup] = useState('');
  const [paymentMethod, setPaymentMethods] = useState<PaymentMethodModel>();
  const [submitting, setSubmitting] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    paymentMethod?.PaymentMethods.map(
      (e) => (e.Selected = e.PaymentMethodSystemName == selectedMethod ? true : false)
    );
    setPaymentMethods({ ...paymentMethod! });
  }, [selectedMethod]);

  useEffect(() => {
    CheckoutService.getPickupMethods()
      .then((res) => {
        setPaymentMethods(res.data);
        const preselectedMethod = res.data?.PaymentMethods.find((x) => x.Selected);
        if (preselectedMethod) {
          setselectedPickup(preselectedMethod.PaymentMethodSystemName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (item: PaymentMethod) => {
    setselectedPickup(item.PaymentMethodSystemName);
  };

  const selectPaymentMethods = () => {
    setSubmitting(true);
    if (selectedMethod)
      CheckoutService.selectPaymentMethod(selectedMethod)
        .then((res) => {
          setSubmitting(false);
          if (res.status === 200) {
            handleNext(1);
          }
        })
        .catch((err) => {
          setSubmitting(false);
          console.log(err);
        });
  };

  return (
    <>
      <div className="row">
        {paymentMethod?.PaymentMethods && Array.isArray(paymentMethod.PaymentMethods) ? (
          paymentMethod.PaymentMethods?.map((option) => (
            <div className="col" onClick={() => handleChange(option)} key={option.Name}>
              <PaymethodMethodCard option={option} />
            </div>
          ))
        ) : (
          <>
            {' '}
            <div className="col">
              <Skeleton sx={{ height: 100 }}></Skeleton>
            </div>
            <div className="col">
              <Skeleton sx={{ height: 100 }}></Skeleton>
            </div>
          </>
        )}
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 text-center ">
          <Box sx={{ mb: 2, alignContent: 'center', alignItems: 'center' }}>
            <Button
              className="btn btn--rounded btn--border"
              variant="outlined"
              onClick={() => (isPickup ? handleBack(2) : handleBack(1))}
              sx={{ mt: 1, mr: 1 }}
            >
              {t('back')}
            </Button>
            {selectedMethod ? (
              <>
                <Button
                  className="btn btn--rounded btn--yellow"
                  variant="contained"
                  sx={{ mt: 1, mr: 1 }}
                  disabled={submitting}
                  onClick={() => selectPaymentMethods()}
                >
                  {submitting ? t('loading') : t('continue')}
                </Button>
              </>
            ) : null}
          </Box>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodSection;
