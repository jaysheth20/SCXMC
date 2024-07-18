import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { useI18n } from 'next-localization';
import { useEffect, useState } from 'react';

import { AppliedDiscountsWithCode, DiscountBox } from 'src/components/Cart/Models/ShoppingCartType';
import { fetchShoppingData } from 'src/store/ShoppingCart';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';
import * as ShoppingCartService from 'src/services/ShoppingCartService';

interface DiscountCodeProps {
  discountBox: DiscountBox;
}

const DiscountCode = (props: DiscountCodeProps) => {
  const { discountBox } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [discountCoupon, setDiscountCoupon] = useState('');
  const { t } = useI18n();
  const dispatcher = useAppDispatch();
  const shoppingcart = useAppSelector((state) => state.shoppingcart);
  const [applyedCoupon, setapplyedCoupon] = useState<AppliedDiscountsWithCode[]>(
    discountBox.AppliedDiscountsWithCodes
  );

  useEffect(() => {
    setapplyedCoupon(shoppingcart.cart?.DiscountBox?.AppliedDiscountsWithCodes);
    setIsLoadingCoupons(false);
  }, [shoppingcart.cart]);

  const handleSanck = (isOpen: boolean, message: string) => {
    setSnackOpen(isOpen);
    setSnackMessage(message);
    setTimeout(() => {
      setSnackOpen(false);
    }, 2000);
  };

  const handleAppyDiscountCoupon = () => {
    setIsLoadingCoupons(true);
    setIsSubmitting(true);
    ShoppingCartService.applyDiscountCoupon(discountCoupon)
      .then((res) => {
        setIsSubmitting(false);
        if (res.data.DiscountBox.IsApplied === true) {
          fetchCartDetail();
          setDiscountCoupon('');
          setIsLoadingCoupons(false);
        } else {
          setIsLoadingCoupons(false);
          setDiscountCoupon('');
          handleSanck(true, res.data.DiscountBox.Messages.join(','));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveCoupon = (discountID: number) => {
    setIsLoadingCoupons(true);
    ShoppingCartService.removeDiscountCoupon(discountID)
      .then(() => {
        fetchCartDetail();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCartDetail = () => {
    dispatcher(fetchShoppingData());
  };

  return (
    <>
      <div className={'my-3'}>
        <FormControl>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                value={discountCoupon}
                onChange={(e) => {
                  setDiscountCoupon(e.target.value);
                }}
                placeholder={t('discount-code')}
                className="cart__promo-code"
              />
            </div>
            <div className="col-md-6">
              <Button
                variant="contained"
                className="btn btn--rounded btn--yellow"
                type={'button'}
                disabled={isSubmitting}
                onClick={() => handleAppyDiscountCoupon()}
              >
                {t('apply-coupon')}
              </Button>
            </div>
          </div>
        </FormControl>
      </div>
      <div className={'col-md-6'}>
        <>
          <div className="row  primary-label">
            {isLoadingCoupons ? (
              <Skeleton></Skeleton>
            ) : (
              applyedCoupon?.map((item: AppliedDiscountsWithCode) => (
                <div key={'code' + item.Id} className="row">
                  <div className="col-12">
                    {' '}
                    <FormLabel className="primary-label" color={'success'}>
                      {t('entered-coupon-code')}:
                    </FormLabel>{' '}
                    {item.CouponCode}{' '}
                    <Button onClick={() => handleRemoveCoupon(item.Id)} variant="text">
                      <CancelPresentationIcon></CancelPresentationIcon>
                    </Button>{' '}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      </div>
      <div className={'col-md-6'}>
        {snackOpen ? (
          <Alert variant="filled" severity={'error'}>
            {snackMessage}
          </Alert>
        ) : null}
      </div>
    </>
  );
};

export default DiscountCode;
