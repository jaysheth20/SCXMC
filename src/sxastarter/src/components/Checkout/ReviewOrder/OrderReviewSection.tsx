import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/navigation';

import { CardDetail } from 'src/components/Checkout/FormModel/PaymentInformation';
import ReviewCartItem from 'src/components/Checkout/ReviewOrder/ReviewCartItem';
import ReviewOrderTotal from 'src/components/Checkout/ReviewOrder/ReviewOrderTotal';
import BillingAddressReview from 'src/components/Checkout/ReviewOrder/BillingAddressReview';
import ShippingAddressReview from 'src/components/Checkout/ReviewOrder/ShippingAddressReview';
import PickUpReview from 'src/components/Checkout/ReviewOrder/PickUpReview';
import ShipingMethodReview from 'src/components/Checkout/ReviewOrder/ShipingMethodReview';
import PaymentMethodReview from 'src/components/Checkout/ReviewOrder/PaymentMethodReview';
import {
  OrderTotals,
  ProductItem,
  ShoppingCartType,
} from 'components/Cart/Models/ShoppingCartType';
import { fetchShoppingData } from 'src/store/ShoppingCart';
import { Attribute } from 'src/store/CheckoutAttribute';
import * as CheckoutService from 'src/services/CheckoutService';
import * as ShoppingCartService from 'src/services/ShoppingCartService';
import { useAppDispatch } from 'src/store/StoreHook';

interface OrderReviewSectionProps {
  handleBack: any;
  cardDetail?: CardDetail;
}

const OrderReviewSection = (props: OrderReviewSectionProps) => {
  const { handleBack, cardDetail } = props;
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [orderTotal, setOrderTotal] = useState<OrderTotals>();
  const [orderReview, setOrderReviewModel] = useState<ShoppingCartType>();
  const { t } = useI18n();
  const dispatcher = useAppDispatch();

  useEffect(() => {
    CheckoutService.getOrderSummary()
      .then((res) => {
        setOrderReviewModel(res.data);
        fetchCartTotal();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const confrimOrder = () => {
    setSubmitting(true);
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
    CheckoutService.confirmOrder(PaymentInfo)
      .then((res) => {
        console.log(res);
        setSubmitting(false);
        dispatcher(fetchShoppingData());
        dispatcher(Attribute({}));
        router.push('/ordersuccess?ordernumber=' + res.data.OrderId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCartTotal = () => {
    ShoppingCartService.getOrderTotals()
      .then((res) => {
        setOrderTotal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return orderReview ? (
    <>
      <div className={'row'}>
        <div className={'checkout_summary_box'}>
          <BillingAddressReview billingData={orderReview.OrderReviewData.BillingAddress} />
          <br></br>
          <PaymentMethodReview paymentMethod={orderReview.OrderReviewData.PaymentMethod} />
        </div>
        <div className={'checkout_summary_box'}>
          {orderReview.OrderReviewData.SelectedPickupInStore ? (
            <PickUpReview pickupAddress={orderReview.OrderReviewData.PickupAddress} />
          ) : (
            <ShippingAddressReview shippingData={orderReview.OrderReviewData.ShippingAddress} />
          )}
          <br></br>
          <ShipingMethodReview shippingMethod={orderReview.OrderReviewData.ShippingMethod} />
        </div>
      </div>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">{t('shopping-cart')}</h3>
          </div>
          <div className="cart-list">
            <table>
              <thead>
                <tr>
                  <th>{t('sku')}</th>
                  <th>{t('image')}</th>
                  <th>{t('product')}</th>
                  <th>{t('price')}</th>
                  <th>{t('order-quantity')}</th>
                  <th>{t('total')}</th>
                </tr>
              </thead>
              <tbody>
                {orderReview.Items?.map((item: ProductItem) => (
                  <ReviewCartItem key={item.Id} productitem={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <hr></hr>
      <div className={'row'}>
        <div className={'col-md-8'}></div>
        <div className={'col-md-4'}>
          {orderTotal ? (
            <ReviewOrderTotal orderTotal={orderTotal} />
          ) : (
            <Skeleton sx={{ height: 250 }}></Skeleton>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 text-center ">
          <Box sx={{ mb: 2, alignContent: 'center', alignItems: 'center' }}>
            <Button
              variant="outlined"
              className="btn btn--rounded btn--border"
              onClick={() => handleBack(1)}
              sx={{ mt: 1, mr: 1 }}
            >
              {t('back')}
            </Button>

            <Button
              variant="contained"
              className="btn btn--rounded btn--yellow"
              sx={{ mt: 1, mr: 1 }}
              disabled={submitting}
              onClick={() => confrimOrder()}
            >
              {submitting ? t('loading') : t('confirm-order')}
            </Button>
          </Box>
        </div>
      </div>
    </>
  ) : (
    <>
      <Skeleton sx={{ height: 100 }} />
      <Skeleton sx={{ height: 100 }} />
    </>
  );
};

export default OrderReviewSection;
