import { useI18n } from 'next-localization';

import { GiftCard, OrderTotals } from 'src/components/Cart/Models/ShoppingCartType';

interface ReviewOrderTotalProps {
  orderTotal: OrderTotals;
}

const ReviewOrderTotal = (props: ReviewOrderTotalProps) => {
  const { orderTotal } = props;
  const { t } = useI18n();

  return (
    <>
      <div className="summary-wrapper">
        <div className={'row'}>
          <div className="col-md-6">
            <label>{t('sub-total')}</label>
          </div>
          <div className="col-md-6 text-end">{orderTotal.SubTotal}</div>
        </div>
        <div className={'row'}>
          <div className={'col-md-6'}>
            <label>{t('shipping')}</label>
          </div>
          <div className={'col-md-6 text-end'}>
            {orderTotal.Shipping ? orderTotal.Shipping : t('calculated-during-checkout')}
          </div>
        </div>
        <div className="row">
          <div className={'col-md-6'}>
            <label>{t('tax')}</label>
          </div>
          <div className={'col-md-6 text-end'}>{orderTotal.Tax}</div>
        </div>
        <div className="row">
          <div className={'col-md-6'}>
            <label>{t('discount')}</label>
          </div>
          <div className={'col-md-6 text-end'}>{orderTotal.OrderTotalDiscount}</div>
        </div>
        <div className={'row'}>
          <div className={'col-md-6'}>
            <label>{t('gift-card-coupon')}</label>
          </div>
        </div>
        {orderTotal.GiftCards?.map((item: GiftCard) => (
          <div key={'code' + item.Id} className="row">
            <div className="col-6">{item.CouponCode}</div>
            <div className="col-6 text-end">{item.Amount}</div>
          </div>
        ))}
        <div className={'row'}>
          <div className={'col-md-6'}>
            <label>{t('disount')}</label>
          </div>
          <div className={'col-md-6 text-end'}>{orderTotal.SubTotalDiscount}</div>
        </div>
        <div className="block">
          <div className="checkout-total">
            <p>{t('total')}</p>
            <h3>{orderTotal.OrderTotal}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewOrderTotal;
