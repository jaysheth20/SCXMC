import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useI18n } from 'next-localization';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

import { appyGiftCard } from 'src/services/ShoppingCartService';
import { fetchShoppingData } from 'src/store/ShoppingCart';
import { useAppDispatch } from 'src/store/StoreHook';

const GiftCard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackseverity, setSnackseverity] = useState('');
  const [giftCard, setGiftCard] = useState('');
  const dispatcher = useAppDispatch();
  const { t } = useI18n();

  const handleSanck = (isOpen: boolean, message: string, severity: string) => {
    setSnackOpen(isOpen);
    setSnackMessage(message);
    setSnackseverity(severity);
    setTimeout(() => {
      setSnackOpen(false);
    }, 2000);
    setGiftCard('');
  };

  const handleAppyGiftCard = () => {
    if (giftCard === '') return;
    setIsSubmitting(true);
    appyGiftCard(giftCard)
      .then((res) => {
        setIsSubmitting(false);
        if (res.data.GiftCardBox.IsApplied === true) {
          dispatcher(fetchShoppingData());
          handleSanck(true, res.data.GiftCardBox.Message, 'success');
        } else {
          handleSanck(true, res.data.GiftCardBox.Message, 'error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={'my-3'}>
        <FormControl>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                value={giftCard}
                onChange={(e) => {
                  setGiftCard(e.target.value);
                }}
                placeholder={t('gift-card-coupon')}
                className="cart__promo-code"
              />
            </div>
            <div className="col-md-6">
              <Button
                variant="contained"
                className="btn btn--rounded btn--yellow"
                type={'button'}
                disabled={isSubmitting}
                onClick={() => handleAppyGiftCard()}
              >
                {t('add-gift-card')}
              </Button>
            </div>
          </div>
        </FormControl>
      </div>
      <div className={'col-md-6'}>
        {snackOpen ? (
          <Alert variant="filled" severity={snackseverity === 'success' ? 'success' : 'error'}>
            {snackMessage}
          </Alert>
        ) : null}
      </div>
    </>
  );
};

export default GiftCard;
