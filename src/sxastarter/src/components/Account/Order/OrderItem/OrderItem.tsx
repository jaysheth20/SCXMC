import React from 'react';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import IconButton from '@mui/material/IconButton';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/navigation';

import { Order } from 'src/components/Account/Models/OrderType';

interface OrderItemProps {
  orderItem: Order;
}

const OrderItem = (props: OrderItemProps) => {
  const { orderItem } = props;
  const { t } = useI18n();
  const router = useRouter();

  return (
    <div className="round-options">
      <div className="order-history-round-item">
        <div className="row">
          <div className="col-md-11">
            {' '}
            <label className="order-number">
              {t('order-number')}:{orderItem.Id}
            </label>
          </div>
          <div className="col-md-1">
            {orderItem.OrderStatusEnum == 'Complete' && orderItem.IsReturnRequestAllowed ? (
              <IconButton
                className="order-button"
                onClick={() => router.push('/account/return-order?oid=' + orderItem.Id)}
                aria-label="Order return"
              >
                <KeyboardReturnOutlinedIcon />
              </IconButton>
            ) : null}
            <IconButton
              className="order-button"
              onClick={() => router.push('/account/orderdetail?oid=' + orderItem.Id)}
              aria-label="Order detail"
            >
              <SegmentOutlinedIcon />
            </IconButton>
          </div>
        </div>
        <div className="order-history-round-item-detail">
          <div className="row">
            <div className="col-2">{t('order-status')}</div>
            <div className="col-4">{orderItem.OrderStatus}</div>
          </div>
          <div className="row">
            <div className="col-2">{t('order-date')}</div>
            <div className="col-4">{orderItem.CreatedOn}</div>
          </div>
          <div className="row">
            <div className="col-2">{t('order-total')}</div>
            <div className="col-4">{orderItem.OrderTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
