import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Giftcardform from 'src/components/Product/GiftCardForm';
import {
  AddToCartReq,
  GiftCard,
  ProductDetailType,
} from 'src/components/Product/Models/ProductDetailType';
import ProductAttributes from 'src/components/Product/ProductAttributes';
import ProductImageGallery from 'src/components/Product/ProductImageGallery';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import * as ProductService from 'src/services/ProductService';
import { addItemToCart, addToWishlist } from 'src/services/ShoppingCartService';
import { submitGoal, submitPageView } from 'src/services/TrackingService';
import * as WishListService from 'src/services/WishListService';
import { putProductDetails } from 'src/store/ProductDetails';
import { fetchShoppingData } from 'src/store/ShoppingCart';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';
import { fetchWishlistData, fetchWishlistSuccess } from 'src/store/Wishlist';

const prodAttr: { [field: string]: string } = {};

const ProductDetail = () => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [snackOpen, setSnackOpen] = useState(false);
  const [wishListId, setWishListId] = useState(0);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackseverity, setSnackseverity] = useState('');
  const [giftcard, setGiftCard] = useState<GiftCard>();
  const searchParams = useSearchParams();
  const search = searchParams.get('pid');
  const [product, setProduct] = useState<ProductDetailType>();
  const { t } = useI18n();
  const dispatcher = useAppDispatch();
  const productDetail = useAppSelector((state) => state.productDetails);
  const wishlist = useAppSelector((state) => state.wishlist);
  const value = useSitecoreContext();

  useEffect(() => {
    const prodcutStore = productDetail?.productItems as ProductDetailType[];
    if (prodcutStore && search && prodcutStore.find((x) => x.Id === parseInt(search))) {
      const storedProduct = prodcutStore.find((x) => x.Id === parseInt(search));
      setProduct(storedProduct);
      setQuantity(1);
      setPrice(storedProduct?.ProductPrice?.Price ?? '0');
      setGiftCard(storedProduct?.GiftCard);
    } else {
      ProductService.getProductDetails(search)
        .then((res) => {
          dispatcher(putProductDetails(res.data));
          setProduct(res.data);
          setGiftCard(res.data.GiftCard);
          setQuantity(1);
          setPrice(res.data.ProductPrice.Price);
          if (wishlist.Loading === true) dispatcher(fetchWishlistData());
        })
        .catch((err) => {
          console.log(err);
        });
    }
    submitGoal('ProductDetails');
    submitPageView(value.sitecoreContext.itemId, value.sitecoreContext.itemPath);
  }, []);

  useEffect(() => {
    const wishlistObj = wishlist.wishlistItems?.find((x) => x.ProductId.toString() == search);
    if (wishlistObj) {
      setWishListId(wishlistObj.Id);
    } else {
      setWishListId(0);
    }
  }, [wishlist]);

  const handleSanck = (isOpen: boolean, message: string, severity: string) => {
    setSnackOpen(isOpen);
    setSnackMessage(message);
    setSnackseverity(severity);
    setTimeout(() => {
      setSnackOpen(false);
    }, 6000);
  };

  const handleGiftCardChange = (giftcard: GiftCard) => {
    setGiftCard(giftcard);
  };

  const handleGiftCardAddtoCart = () => {
    console.log(giftcard);
    const data: AddToCartReq = {
      Quantity: quantity,
      Attributes: {
        IsGiftCard: true,
        ['giftcard_' + search?.toString() + '.RecipientName']: giftcard?.RecipientName ?? '',
        ['giftcard_' + search?.toString() + '.RecipientEmail']: giftcard?.RecipientEmail ?? '',
        ['giftcard_' + search?.toString() + '.SenderEmail']: giftcard?.SenderEmail ?? '',
        ['giftcard_' + search?.toString() + '.SenderName']: giftcard?.SenderName ?? '',
        ['giftcard_' + search?.toString() + '.Message']: giftcard?.Message ?? '',
        ['giftcard_' + search?.toString() + '.GiftCardType']: giftcard?.GiftCardType,
      },
    };
    addItemToCart(data, search)
      .then((res) => {
        console.log(res);
        if (res.data.Errors) {
          handleSanck(true, res.data.Errors, 'error');
        } else {
          dispatcher(fetchShoppingData());
          handleSanck(true, 'Product Added to cart', 'success');
        }
      })
      .catch((err) => {
        handleSanck(true, err.response.data.Errors.join(', '), 'error');
      });
  };

  const handleAttributesChange = (event: SelectChangeEvent) => {
    handleSanck(false, '', '');
    prodAttr[event.target.name] = event.target.value;
    ProductService.changeProductAttribute(prodAttr, search)
      .then((res) => {
        setPrice(res.data.Price);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItemFromWishList = (wishListID: number) => {
    dispatcher(fetchWishlistSuccess([]));
    WishListService.deleteWishlistItems(wishListID)
      .then(() => {
        dispatcher(fetchWishlistData());
        handleSanck(true, 'Product removed wish list', 'info');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToWishList = () => {
    const data: AddToCartReq = {
      Quantity: quantity,
      Attributes: prodAttr,
    };
    dispatcher(fetchWishlistSuccess([]));
    addToWishlist(data, search)
      .then((res) => {
        console.log(res);
        if (res.data.Errors) {
          handleSanck(true, res.data.Errors, 'error');
        } else {
          handleSanck(true, 'Product Added to wish list', 'success');
          dispatcher(fetchWishlistData());
        }
      })
      .catch((err) => {
        console.log(err);
        handleSanck(true, err.response.data.Errors.join(', '), 'error');
      });
  };

  const handleAddtoCart = () => {
    const data: AddToCartReq = {
      Quantity: quantity,
      Attributes: prodAttr,
    };

    addItemToCart(data, search)
      .then((res) => {
        console.log(res);
        if (res.data.Errors) {
          handleSanck(true, res.data.Errors, 'error');
        } else {
          dispatcher(fetchShoppingData());
          handleSanck(true, 'Product Added to cart', 'success');
        }
      })
      .catch((err) => {
        handleSanck(true, err.response.data.Errors.join(', '), 'error');
      });
  };

  const rendershipping = () => {
    return (
      <p>
        <LocalShippingOutlinedIcon /> {t('free-shipping')}
      </p>
    );
  };

  return (
    <>
      <Breadcrumb />
      <section className="product-single">
        <div className="container">
          {product ? (
            <>
              <div className="product-single__content">
                <ProductImageGallery
                  defaultPicture={product.DefaultPictureModel}
                  images={product.PictureModels}
                />
                <section className="product-content">
                  <div className="product-content__intro">
                    <span className="product-on-sale">Sale</span>
                    <h2 className="product__name">{product.Name}</h2>
                    <h6 className={'mb-2'}>{product.ShortDescription}</h6>
                    <Rating
                      name="read-only"
                      value={product.ProductReviewOverview.RatingSum}
                      readOnly
                    />
                    <p className="text-secondary mb-3">
                      {product.ProductReviewOverview.TotalReviews} Review(s){' '}
                    </p>
                    <p className="text-secondary mb-3">{product.StockAvailability} </p>
                    <p className="text-secondary mb-3">
                      {product.IsFreeShipping == true ? rendershipping() : null}
                      {product.DeliveryDate != null ? (
                        <p>
                          {t('delivery-date')} {product.DeliveryDate}
                        </p>
                      ) : null}
                    </p>
                  </div>
                  <div className="product-content__filters">
                    {product.GiftCard.IsGiftCard ? (
                      <Giftcardform
                        handleGiftCardChange={handleGiftCardChange}
                        giftCard={giftcard}
                      />
                    ) : (
                      <ProductAttributes
                        onChangeName={handleAttributesChange}
                        attributes={product.ProductAttributes}
                      />
                    )}
                    <div className="product-filter-item">
                      <div className="product__prices">
                        <h4>{price}</h4>
                      </div>
                      <div className="quantity-buttons">
                        <div className="quantity-button">
                          <button
                            type="button"
                            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
                            className="quantity-button__btn"
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                            className="quantity-button__btn"
                          >
                            +
                          </button>
                        </div>
                        {product.GiftCard.IsGiftCard ? (
                          <button
                            type="submit"
                            onClick={() => handleGiftCardAddtoCart()}
                            className="btn btn--rounded btn--yellow"
                          >
                            {' '}
                            {t('add-to-cart')}
                          </button>
                        ) : (
                          <button
                            type="submit"
                            onClick={() => handleAddtoCart()}
                            className="btn btn--rounded btn--yellow"
                          >
                            {' '}
                            {t('add-to-cart')}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            wishListId > 0
                              ? removeItemFromWishList(wishListId)
                              : handleAddToWishList()
                          }
                          className={`btn-heart ${wishListId ? 'btn-heart--active' : ''}`}
                        >
                          <i className="icon-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {snackOpen ? (
                    <Alert
                      severity={
                        snackseverity === 'success'
                          ? 'success'
                          : snackseverity === 'error'
                          ? 'error'
                          : 'info'
                      }
                    >
                      {snackMessage}
                    </Alert>
                  ) : null}
                </section>
              </div>

              <div className="product-single__info">
                <div className="product-single__info-btns">
                  <button type="button" className={'btn btn--rounded btn--active'}>
                    {t('description')}
                  </button>
                </div>
                <section className="product-single__description">
                  <div className="product-description-block">
                    {product.FullDescription ? (
                      <div dangerouslySetInnerHTML={{ __html: product.FullDescription }}></div>
                    ) : null}
                  </div>
                </section>
              </div>
            </>
          ) : (
            <>
              <div className={'product-single__content'}>
                <Skeleton sx={{ height: 300 }} />
                <section className="product-content">
                  <div className="product-content__intro">
                    <Skeleton sx={{ height: 200 }} />
                  </div>
                  <div className="product-content__filters">
                    <Skeleton sx={{ height: 200 }} />
                  </div>
                </section>
              </div>
              <div className="product-single__info">
                <Skeleton />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};
export default ProductDetail;
