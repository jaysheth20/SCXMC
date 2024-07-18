import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import { useI18n } from 'next-localization';

import {
  CardDetail,
  PaymentInformation,
} from 'src/components/Checkout/FormModel/PaymentInformation';
import CreditCartInformation from 'src/components/Checkout/PaymentInformation/CreditCartInformation';
import * as CheckoutService from 'src/services/CheckoutService';

interface PaymentInformationSectionProps {
  handleNext: any;
  handleBack: any;
  handlePaymentInfo: any;
}

const PaymentInformationSection = (props: PaymentInformationSectionProps) => {
  const { handleBack, handleNext, handlePaymentInfo } = props;
  const [paymentInformation, setPaymentInformation] = useState<PaymentInformation>();
  const [cardDetail, setCardDetail] = useState<CardDetail>();
  const [accteptedType, setAccteptedType] = useState<string[]>(['']);
  const [submitting, setSubmitting] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const { t } = useI18n();

  useEffect(() => {
    CheckoutService.getPaymentInfo()
      .then((res) => {
        setPaymentInformation(res.data);
        if (res.data.CreditCardTypes) {
          const strcarttype: string[] = [];
          res.data.CreditCardTypes.forEach((x) => strcarttype.push(x.Value));
          setAccteptedType({ ...strcarttype });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardDetail = (card: CardDetail) => {
    const isEmpty = checkProperties(card);
    setIsValidForm(!isEmpty);
    setCardDetail(card);
  };

  const checkProperties = (obj: any) => {
    for (const key in obj) {
      if (obj[key] === null || obj[key] == '') return true;
    }
    return false;
  };

  const handleSanck = (isOpen: boolean, message: string) => {
    setSnackOpen(isOpen);
    setSnackMessage(message);
    setTimeout(() => {
      setSnackOpen(false);
    }, 6000);
  };

  const validatePaymentMethod = () => {
    setSubmitting(true);
    if (paymentInformation?.PaymentMethodName == 'Payments.CheckMoneyOrder') {
      handleNext(1);
    } else {
      const PaymentInfo: any = {
        PaymentInfo: {
          CardCode: cardDetail?.CardCode,
          CardholderName: cardDetail?.CardholderName,
          CreditCardType: cardDetail?.CreditCardType,
          ExpireMonth: cardDetail?.ExpireMonth,
          ExpireYear: cardDetail?.ExpireYear,
          CardNumber: cardDetail?.CardNumber,
        },
      };
      CheckoutService.validatePaymentInfo(PaymentInfo)
        .then((res) => {
          setSubmitting(false);
          if (res.data.Success === true) {
            handlePaymentInfo(cardDetail);
            handleNext(1);
          } else {
            handleSanck(true, res.data.Errors.join(','));
          }
        })
        .catch((err) => {
          setSubmitting(false);
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="row">
        {paymentInformation?.PaymentMethodName == 'Payments.Manual' ? (
          <CreditCartInformation
            accteptedType={accteptedType}
            handleCardDetail={handleCardDetail}
          />
        ) : paymentInformation?.PaymentMethodName == 'Payments.CheckMoneyOrder' ? (
          <>
            <div className="col-md-4"></div>
            <div
              className="col-md-6"
              dangerouslySetInnerHTML={{ __html: paymentInformation.DescriptionText }}
            ></div>
          </>
        ) : (
          <Skeleton sx={{ height: 100 }}></Skeleton>
        )}
        <div className="row">
          {' '}
          <div className="col-md-4"></div>
          <div className="col-md-4">
            {snackOpen ? (
              <Alert variant="filled" severity={'error'}>
                {snackMessage}
              </Alert>
            ) : null}
          </div>{' '}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 text-center ">
          {' '}
          <Box sx={{ mb: 2, alignContent: 'center', alignItems: 'center' }}>
            <Button
              className="btn btn--rounded btn--border"
              variant="outlined"
              onClick={() => handleBack(1)}
              sx={{ mt: 1, mr: 1 }}
            >
              {t('back')}
            </Button>
            {isValidForm ? (
              <>
                <Button
                  variant="contained"
                  className="btn btn--rounded btn--yellow"
                  sx={{ mt: 1, mr: 1 }}
                  disabled={submitting}
                  onClick={() => validatePaymentMethod()}
                >
                  {submitting ? t('loading') : t('continue')}
                </Button>
              </>
            ) : null}
          </Box>
        </div>{' '}
      </div>
    </>
  );
};

export default PaymentInformationSection;
