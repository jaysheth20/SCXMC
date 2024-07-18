import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import { useI18n } from 'next-localization';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CartItem from 'src/components/Cart/CartItem';
import CheckoutAttributes from 'src/components/Cart/CheckoutAttributes';
import DiscountCode from 'src/components/Cart/DiscountCode';
import GiftCard from 'src/components/Cart/GiftCard';
import {
  OrderTotals,
  ProductItem,
  ShoppingCartType,
  UpdateCartRequest,
} from 'src/components/Cart/Models/ShoppingCartType';
import OrderSummary from 'src/components/Cart/OrderSummary';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';
import { fetchShoppingData } from 'src/store/ShoppingCart';
import { Attribute } from 'src/store/CheckoutAttribute';
import * as ShoppingCartService from 'src/services/ShoppingCartService';
import CheckoutStatus from 'components/CheckoutStatus/CheckoutStatus';

const ShoppingCart = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cart, setCart] = useState<ShoppingCartType | any>();
  const [orderTotal, setOrderTotal] = useState<OrderTotals>();
  const [selectedcheckoutAttributes, setselectedCheckoutAttributes] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackseverity, setSnackseverity] = useState('');
  const { t } = useI18n();
  const updateReq: UpdateCartRequest[] = [];
  const dispatcher = useAppDispatch();
  const shoppingcart = useAppSelector((state) => state.shoppingcart);
  const checkoutattribute = useAppSelector((state) => state.checkoutattribute);

  useEffect(() => {
    if (shoppingcart.cart?.Items?.length > 0) {
      ShoppingCartService.changeCheckoutAttribute(checkoutattribute)
        .then((res) => {
          setselectedCheckoutAttributes(res.data.SelectedAttributes);
          setOrderTotal(res?.data.OrderTotals);
          handleSanck(true, 'Cart Total updated', 'success');
          dispatcher(fetchShoppingData());
        })
        .catch((err) => {
          console.log(err);
          handleSanck(true, 'Cart Total updated', 'error');
        });
    }
  }, [checkoutattribute]);

  useEffect(() => {
    fatchShoppingCart();
  }, [shoppingcart.cart]);

  const setQuantity = (event: any, pritem: ProductItem) => {
    if (event > 0) {
      const updatedCart = { ...cart };
      updatedCart.Items = updatedCart?.Items?.map((item: ProductItem) => {
        if (item.Id === pritem.Id) {
          return { ...item, Quantity: parseInt(event) };
        }
        return item;
      });
      setCart({ ...updatedCart! });
    }
  };

  const updateCart = () => {
    setIsSubmitting(true);
    cart?.Items?.forEach((element: ProductItem) => {
      return updateReq.push({ Quantity: element.Quantity, CartItemId: element.Id });
    });
    if (!updateReq) {
      return;
    }
    ShoppingCartService.updateCartItemsQuantity(updateReq)
      .then(() => {
        dispatcher(fetchShoppingData());
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSanck = (isOpen: boolean, message: string, severity: string) => {
    setSnackOpen(isOpen);
    setSnackMessage(message);
    setSnackseverity(severity);
    setTimeout(() => {
      setSnackOpen(false);
    }, 2000);
  };

  const handleAttributesChange = (event: SelectChangeEvent) => {
    setSnackMessage('');
    setSnackOpen(false);
    dispatcher(Attribute({ [event.target.name]: event.target.value }));
  };

  const handleRemoveGiftCard = (giftcard: number) => {
    ShoppingCartService.removeGiftCard(giftcard)
      .then(() => {
        fetchCartTotal();
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

  const fetchSelectedCheckoutAttributes = () => {
    ShoppingCartService.getSelectedCheckoutAttributes()
      .then((res) => {
        setselectedCheckoutAttributes(res.data.replace('"', ''));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromCart = (id: number) => {
    ShoppingCartService.removeFromCart(id)
      .then(() => {
        dispatcher(fetchShoppingData());
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fatchShoppingCart = () => {
    if (shoppingcart.Loading == false) {
      setCart(shoppingcart.cart);
      fetchCartTotal();
      if (selectedcheckoutAttributes == '') {
        fetchSelectedCheckoutAttributes();
      }
      if (
        !Object.keys(checkoutattribute.attribute).length &&
        shoppingcart.cart?.CheckoutAttributes &&
        shoppingcart.cart?.CheckoutAttributes.length > 0 &&
        shoppingcart.cart?.CheckoutAttributes[0].IsRequired
      ) {
        shoppingcart.cart?.CheckoutAttributes.map((item: any) => {
          item.Values.map((value: any) => {
            if (value.IsPreSelected) {
              dispatcher(Attribute({ ['checkout_attribute_' + item.Id]: value.Id }));
            }
          });
        });
      }
    } else {
      dispatcher(fetchShoppingData());
    }
  };

  return (
    <>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">{t('shopping-cart')}</h3>
            {snackOpen ? (
              <Alert variant="filled" severity={snackseverity === 'success' ? 'success' : 'error'}>
                {snackMessage}
              </Alert>
            ) : null}
            <CheckoutStatus step="cart" />
          </div>
          {cart ? (
            cart.Items?.length > 0 ? (
              <>
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
                        <th>{t('remove')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.Items?.map((item: ProductItem) => (
                        <CartItem
                          key={item.Id}
                          productitem={item}
                          removeFromCart={() => {
                            removeFromCart(item.Id);
                          }}
                          setQuantity={setQuantity}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="cart-actions">
                  <Link href="#" onClick={() => router.push('/')} className="cart__btn-back">
                    <i className="icon-left"></i>
                    {t('continue-shopping')}
                  </Link>
                  <div className="cart-actions__items-wrapper">
                    <Button
                      variant="contained"
                      className="btn btn--rounded btn--yellow"
                      type={'button'}
                      onClick={() => updateCart()}
                    >
                      {isSubmitting ? t('loading') : t('update-cart')}
                    </Button>
                  </div>
                </div>
                <div className={'cart-actions'}>
                  <div className={'col-md-6'}>
                    <CheckoutAttributes
                      onChangeName={handleAttributesChange}
                      attributes={cart.CheckoutAttributes}
                    ></CheckoutAttributes>
                  </div>
                  <div className={'col-md-3'}></div>
                  <div className={'col-md-3 p-4 text-end'}>
                    <label>{selectedcheckoutAttributes}</label>
                  </div>
                </div>
                <hr></hr>
                <div className={'row'}>
                  <div className={'col-md-8'}>
                    <DiscountCode discountBox={cart.DiscountBox} />
                    <GiftCard></GiftCard>
                  </div>
                  <div className={'col-md-4'}>
                    {orderTotal ? (
                      <OrderSummary
                        handleRemoveGiftCard={handleRemoveGiftCard}
                        orderTotal={orderTotal}
                      />
                    ) : (
                      <Skeleton sx={{ height: 250 }}></Skeleton>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="cart__intro">
                  <h3>{t('shopping-cart-empty')}</h3>
                </div>
                <Button
                  className="btn btn--rounded btn--yellow"
                  onClick={() => router.push('/')}
                  variant="contained"
                >
                  {t('continue-shopping')}
                </Button>
              </>
            )
          ) : (
            <>
              <Skeleton sx={{ height: 100 }} />
              <Skeleton sx={{ height: 100 }} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
