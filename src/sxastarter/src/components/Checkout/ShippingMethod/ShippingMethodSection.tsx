import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useI18n } from 'next-localization';
import Skeleton from '@mui/material/Skeleton';

import {
  ShippingMethod,
  ShippingMethodModel,
  ShippingMethodReq,
} from 'src/components/Checkout/FormModel/ShippingMethodModel';
import ShippingMethodCard from 'src/components/Checkout/ShippingMethod/ShippingMethodCard';
import * as CheckoutService from 'src/services/CheckoutService';

interface ShippingMethodSectionProps {
  handleNext: any;
  handleBack: any;
  isshipToSameAddress: any;
}

const ShippingMethodSection = (props: ShippingMethodSectionProps) => {
  const { handleBack, handleNext, isshipToSameAddress } = props;
  const [selectedShipping, setselectedShipping] = useState('');
  const [shippingMethod, setShippingMethods] = useState<ShippingMethodModel>();
  const [submitting, setSubmitting] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    shippingMethod?.ShippingMethods.map(
      (e) =>
        (e.Selected =
          e.Name + '___' + e.ShippingRateComputationMethodSystemName == selectedShipping
            ? true
            : false)
    );
    setShippingMethods({ ...shippingMethod! });
  }, [selectedShipping]);

  useEffect(() => {
    CheckoutService.getShippingMethods()
      .then((res) => {
        setShippingMethods(res.data);
        const preselectedMethod = res.data?.ShippingMethods.find((x) => x.Selected);
        if (preselectedMethod) {
          setselectedShipping(
            preselectedMethod.Name +
              '___' +
              preselectedMethod.ShippingRateComputationMethodSystemName
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (item: ShippingMethod) => {
    setselectedShipping(item.Name + '___' + item.ShippingRateComputationMethodSystemName);
  };

  const selectShippingMethods = () => {
    setSubmitting(true);
    if (shippingMethod) {
      const req: ShippingMethodReq = {
        IsPickup: false,
        PickupPointName: '',
        ShippingMethodName: selectedShipping,
      };
      CheckoutService.selectShippingMethod(req)
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
    }
  };

  return (
    <>
      <div className="row">
        {shippingMethod?.ShippingMethods && Array.isArray(shippingMethod.ShippingMethods) ? (
          shippingMethod.ShippingMethods?.map((option) => (
            <div className="col" onClick={() => handleChange(option)} key={option.Name}>
              <ShippingMethodCard option={option} />
            </div>
          ))
        ) : (
          <>
            <div className="col">
              <Skeleton sx={{ height: 100 }}></Skeleton>
            </div>
            <div className="col">
              <Skeleton sx={{ height: 100 }}></Skeleton>
            </div>
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
              onClick={() => (isshipToSameAddress ? handleBack(2) : handleBack(1))}
              sx={{ mt: 1, mr: 1 }}
            >
              {t('back')}
            </Button>
            {selectedShipping ? (
              <>
                <Button
                  className="btn btn--rounded btn--yellow"
                  variant="contained"
                  sx={{ mt: 1, mr: 1 }}
                  disabled={submitting}
                  onClick={() => selectShippingMethods()}
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

export default ShippingMethodSection;
