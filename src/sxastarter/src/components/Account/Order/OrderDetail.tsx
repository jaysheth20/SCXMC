import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useI18n } from 'next-localization';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import OrderInfo from 'src/components/Account/Order/OrderInfo/OrderInfo';
import ReviewOrderTotal from 'src/components/Checkout/ReviewOrder/ReviewOrderTotal';
import BillingAddressReview from 'src/components/Checkout/ReviewOrder/BillingAddressReview';
import ShippingAddressReview from 'src/components/Checkout/ReviewOrder/ShippingAddressReview';
import PickUpReview from 'src/components/Checkout/ReviewOrder/PickUpReview';
import ShipingMethodReview from 'src/components/Checkout/ReviewOrder/ShipingMethodReview';
import PaymentMethodReview from 'src/components/Checkout/ReviewOrder/PaymentMethodReview';
import ReviewCartItem from 'src/components/Checkout/ReviewOrder/ReviewCartItem';
import { OrderDetailType } from 'components/Account/Models/OrderDetailTypes';
import { RouteFields } from 'lib/component-props/RouteFields';
import { OrderTotals, ProductItem } from 'components/Cart/Models/ShoppingCartType';
import { useAppDispatch } from 'src/store/StoreHook';
import { fetchDataStart } from 'src/store/ShoppingCart';
import * as OrderService from 'src/services/OrderService';

const OrderDetail = () => {
  const dispatcher = useAppDispatch();
  const searchParams = useSearchParams();
  const search = searchParams.get('oid');
  const router = useRouter();
  const [orderTotal, setOrderTotal] = useState<OrderTotals>();
  const [orderReview, setOrderReviewModel] = useState<OrderDetailType>();
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as RouteFields;
  const { t } = useI18n();

  useEffect(() => {
    const fetchOrderReviewData = () => {
      OrderService.getOrderDetails(search)
        .then((res) => {
          const data = res.data;
          setOrderReviewModel(data);
          const orderTotal: OrderTotals = {
            SubTotal: data.OrderSubtotal,
            OrderTotal: data.OrderTotal,
            GiftCards: data.GiftCards,
            Shipping: data.OrderShipping,
            Tax: data.Tax,
            OrderTotalDiscount: data.OrderTotalDiscount,
            SubTotalDiscount: data.OrderSubTotalDiscount,
            IsEditable: false,
            RequiresShipping: false,
            SelectedShippingMethod: '',
            HideShippingTotal: false,
            PaymentMethodAdditionalFee: '',
            TaxRates: [],
            DisplayTax: false,
            DisplayTaxRates: false,
            RedeemedRewardPoints: 0,
            RedeemedRewardPointsAmount: '',
            WillEarnRewardPoints: 0,
            CustomProperties: {},
          };
          setOrderTotal(orderTotal);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchOrderReviewData();
  }, [search]);

  const reOrder = () => {
    OrderService.reOrder(search)
      .then(() => {
        dispatcher(fetchDataStart());
        router.push('/shoppingcart');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const returnItems = () => {
    router.push('/account/return-order?oid=' + search);
  };

  return (
    <section className="cart">
      <div className="container">
        {orderReview ? (
          <>
            <div className="order-history-back-button-section">
              <Link href="/account/orderhistory">
                <i className="icon-left"></i>
                {t('back')}
              </Link>
              <h3>{fields.pageTitle.value}</h3>
            </div>
            <OrderInfo orderReview={orderReview} />
            <div className="block">
              <div className={'row'}>
                <div className={'checkout_summary_box'}>
                  <BillingAddressReview billingData={orderReview.BillingAddress} />
                  <br></br>
                  <PaymentMethodReview paymentMethod={orderReview.PaymentMethod} />
                </div>
                {orderReview.IsShippable ? (
                  <div className={'checkout_summary_box'}>
                    {orderReview.PickupInStore ? (
                      <PickUpReview pickupAddress={orderReview.PickupAddress} />
                    ) : (
                      <ShippingAddressReview shippingData={orderReview.ShippingAddress} />
                    )}
                    <br></br>
                    <ShipingMethodReview shippingMethod={orderReview.ShippingMethod} />
                  </div>
                ) : (
                  ''
                )}
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
                  {orderTotal ? <ReviewOrderTotal orderTotal={orderTotal} /> : <Skeleton />}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 text-center ">
                  <Box sx={{ mb: 2, alignContent: 'center', alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      className="btn btn--rounded btn--border"
                      onClick={() => reOrder()}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {t('re-order')}
                    </Button>
                    {orderReview.IsReturnRequestAllowed ? (
                      <Button
                        variant="contained"
                        className="btn btn--rounded btn--yellow"
                        sx={{ mt: 1, mr: 1 }}
                        onClick={() => returnItems()}
                      >
                        {t('return-items')}
                      </Button>
                    ) : null}
                  </Box>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <Skeleton sx={{ height: 200 }} />
              </div>
              <div className="col-md-6">
                <Skeleton sx={{ height: 200 }} />
              </div>
            </div>
            <div className="row">
              <Skeleton sx={{ height: 50 }} />
              <Skeleton sx={{ height: 50 }} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default OrderDetail;
