import { useState } from 'react';
import { useI18n } from 'next-localization';
import FormLabel from '@mui/material/FormLabel';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { GiftCard, OrderTotals } from 'src/components/Cart/Models/ShoppingCartType';
import { useAppSelector } from 'src/store/StoreHook';

interface OrderSummaryProps {
  orderTotal: OrderTotals;
  handleRemoveGiftCard: any;
}

const OrderSummary = (props: OrderSummaryProps) => {
  const { orderTotal, handleRemoveGiftCard } = props;
  const { t } = useI18n();
  const [isTermAccepted, setIsTermAccepted] = useState(false);
  const [open, setOpen] = useState(false);
  const [openTermsCondition, setopenTermsCondition] = useState(false);
  const [openTermAlert, setopenTermAlert] = useState(false);
  const router = useRouter();
  const shoppingcart = useAppSelector((state) => state.shoppingcart);
  const checkoutattribute = useAppSelector((state) => state.checkoutattribute);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setopenTermAlert(false);
    setopenTermsCondition(false);
  };

  const showTermCondition = () => {
    setopenTermsCondition(true);
    handleClickOpen();
  };

  const handleContinueCheckout = () => {
    if (!isTermAccepted) {
      setopenTermAlert(true);
      handleClickOpen();
    } else {
      if (
        shoppingcart.cart.CheckoutAttributes &&
        shoppingcart.cart.CheckoutAttributes[0].IsRequired &&
        Object.keys(checkoutattribute.attribute).length
      ) {
        router.push('/checkout');
      }
    }
  };

  const renderDialog = (message: string, conditions?: string) => {
    return (
      <>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {t('terms-of-service')}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>{conditions}</Typography>
            <Typography gutterBottom>{message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </>
    );
  };

  return (
    <>
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
          <div className="col-6">
            {item.CouponCode}
            <Button onClick={() => handleRemoveGiftCard(item.Id)} variant="text">
              <CancelPresentationIcon></CancelPresentationIcon>
            </Button>
          </div>
          <div className="col-6 text-end">{item.Amount}</div>
        </div>
      ))}
      <div className={'row'}>
        <div className={'col-md-6'}>
          <FormLabel>{t('disount')}</FormLabel>
        </div>
        <div className={'col-md-6 text-end'}>{orderTotal.SubTotalDiscount}</div>
      </div>
      <div className="block">
        <div className="checkout-total">
          <p>{t('total')}</p>
          <h3>{orderTotal.OrderTotal}</h3>
        </div>
      </div>
      <hr></hr>
      <div className={'row'}>
        <div className="col-2 text-center">
          <Checkbox
            className="primary-label"
            onChange={(e) => setIsTermAccepted(e.target.checked)}
          />
        </div>
        <div className="col-10">
          {t('term-lable')}
          <Link className="p-2" href={'#'} onClick={() => showTermCondition()}>
            {t('read')}
          </Link>
        </div>
      </div>
      <div className="row checkout-btn-box">
        <Button
          className="btn btn--rounded btn--yellow"
          onClick={() => handleContinueCheckout()}
          variant="contained"
        >
          {t('products-checkout')}
        </Button>
      </div>
      {openTermAlert ? renderDialog(t('accept-terms-services')) : null}
      {openTermsCondition ? renderDialog(t('terms-message'), t('conditions-of-use')) : null}
    </>
  );
};

export default OrderSummary;
