import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useI18n } from 'next-localization';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

import OrderItem from 'components/Account/Order/OrderItem/OrderItem';
import { OrderType } from 'components/Account/Models/OrderType';
import { getCustomerOrders } from 'src/services/OrderService';
import { RouteFields } from 'lib/component-props/RouteFields';

const OrderHistory = () => {
  const [orderList, setOrderList] = useState<OrderType>();
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as RouteFields;
  const { t } = useI18n();

  useEffect(() => {
    const fatchOrderList = () => {
      getCustomerOrders()
        .then((res) => {
          setOrderList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fatchOrderList();
  }, []);

  return (
    <>
      <section className="cart">
        <div className="container">
          <div className="order-history-back-button-section">
            <Link href="/account">
              <i className="icon-left"></i>
              {t('back')}
            </Link>
            <h3>{fields.pageTitle.value}</h3>
          </div>
          <div className="order-history-container">
            {orderList ? (
              orderList.Orders?.map((item) => <OrderItem key={item.Id} orderItem={item} />)
            ) : (
              <>
                <Skeleton sx={{ mb: 2 }} variant="rounded" height={60} />
                <Skeleton sx={{ mb: 2 }} variant="rounded" height={60} />
                <Skeleton sx={{ mb: 2 }} variant="rounded" height={60} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderHistory;
