import React from 'react';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/navigation';
import { useI18n } from 'next-localization';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';

import { useAppSelector } from 'src/store/StoreHook';
import { RouteFields } from 'lib/component-props/RouteFields';

const Account = () => {
  const { t } = useI18n();
  const router = useRouter();
  const value = useSitecoreContext();
  const loggedIn = useAppSelector((state) => state.login);
  const fields = value.sitecoreContext.route?.fields as RouteFields;

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">{fields.pageTitle.value}</h3>
        </div>
        <div className="account-container">
          <div className="col-md-4">
            <div className="block">
              <div className="round-options">
                <div className="account-info-round-item">
                  {loggedIn.Customer ? (
                    <>
                      <label>
                        <span>{t('first-name')}</span>
                        {loggedIn.Customer.FirstName}
                      </label>
                      <label>
                        <span>{t('last-name')}</span>
                        {loggedIn.Customer.LastName}
                      </label>
                      <label>
                        <span>{t('account-email')}</span>
                        {loggedIn.Customer.Email}
                      </label>
                      <label>
                        <span>{t('gender')}</span>
                        {loggedIn.Customer.Gender == 'M' ? t('male') : t('female')}
                      </label>
                      <label></label>
                      <label></label>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row">
              <div className="block">
                <div className="round-options">
                  <div className="round-item" onClick={() => router.push('/account/orderhistory')}>
                    <HistoryIcon></HistoryIcon>
                    <label>{t('order-history')}</label>
                  </div>
                </div>
                <div className="round-options">
                  <div className="round-item" onClick={() => router.push('wishlist')}>
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                    <label>{t('wishlist')}</label>
                  </div>
                </div>
                <div className="round-options">
                  <div
                    className="round-item"
                    onClick={() => router.push('/account/change-password')}
                  >
                    <PasswordOutlinedIcon></PasswordOutlinedIcon>
                    <label>{t('change-password')}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
