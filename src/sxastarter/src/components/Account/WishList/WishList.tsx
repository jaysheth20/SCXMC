import React, { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { useI18n } from 'next-localization';

import WishListCard from 'src/components/Account/WishList/WishListCard';
import { fetchWishlistData } from 'src/store/Wishlist';
import { RouteFields } from 'lib/component-props/RouteFields';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';

const WishList = () => {
  const { t } = useI18n();
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as RouteFields;
  const dispatcher = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    const fetchProductsOnMain = () => {
      if (wishlist.Loading === true) dispatcher(fetchWishlistData());
    };
    fetchProductsOnMain();
  }, []);

  return (
    <section className="cart">
      <div className="container">
        {wishlist.Loading == false ? (
          <>
            <div className="order-history-back-button-section">
              <Link href="/account">
                <i className="icon-left"></i>
                {t('back')}
              </Link>
              <h3>{fields.pageTitle.value}</h3>
            </div>
            <section className="block products-content">
              {wishlist.wishlistItems.length !== 0 ? (
                <section className="products-list wish-list">
                  {wishlist.wishlistItems.map((product) => (
                    <WishListCard key={product.Id} product={product} />
                  ))}
                </section>
              ) : (
                <>
                  <h3>{t('wish-list-is-empty')}</h3>
                </>
              )}
            </section>
          </>
        ) : (
          <>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WishList;
