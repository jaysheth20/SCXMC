import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useI18n } from 'next-localization';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { WishlistItem } from 'src/components/Account/Models/WishListType';
import * as WishListService from 'src/services/WishListService';
import { useAppDispatch } from 'src/store/StoreHook';
import { fetchWishlistData, fetchWishlistSuccess } from 'src/store/Wishlist';
import { fetchShoppingData } from 'src/store/ShoppingCart';

interface WishlistCardProps {
  product: WishlistItem;
}

const WishListCard = (props: WishlistCardProps): JSX.Element => {
  const { product } = props;
  const dispatcher = useAppDispatch();
  const { t } = useI18n();
  const router = useRouter();

  const moveItemToCart = (productId: number) => {
    dispatcher(fetchWishlistSuccess([]));
    WishListService.moveWishlistItemsToCart(productId)
      .then(() => {
        dispatcher(fetchWishlistData());
        dispatcher(fetchShoppingData());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItemFromWishList = (productId: number) => {
    dispatcher(fetchWishlistSuccess([]));
    WishListService.deleteWishlistItems(productId)
      .then(() => {
        dispatcher(fetchWishlistData());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="product-item">
      <div className="product__image">
        <Link onClick={() => router.push(`/product?pid=${product.ProductId}`)} href="#">
          <img src={product.Picture.ImageUrl} alt="product" />
        </Link>
      </div>
      <div className="product__description">
        <h3>{product.ProductName}</h3>
        <h3>
          {' '}
          <p dangerouslySetInnerHTML={{ __html: product.AttributeInfo }} color="text.secondary"></p>
        </h3>
        <div className={'product__price '}>
          <h4>{product.UnitPrice}</h4>
        </div>
      </div>
      <CardActions>
        <Button
          className="btn btn--rounded btn--yellow btn-submit"
          variant="contained"
          sx={{ width: 1 }}
          onClick={() => moveItemToCart(product.Id)}
          type={'button'}
        >
          {t('move-to-cart')}
        </Button>
        <Button
          className="btn btn--rounded btn--yellow btn-submit"
          variant="contained"
          sx={{ width: 1 }}
          onClick={() => removeItemFromWishList(product.Id)}
          type={'button'}
        >
          {t('remove')}
        </Button>
      </CardActions>
    </div>
  );
};

export default WishListCard;
