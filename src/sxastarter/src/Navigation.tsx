import Link from 'next/link';
import { useI18n } from 'next-localization';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Badge from '@mui/material/Badge';

import { UserLogout, fetchDataCustomer } from 'src/store/Login';
import config from 'temp/config';
import { fetchShoppingData } from 'src/store/ShoppingCart';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';

const publicUrl = config.publicUrl;
const Navigation = (): JSX.Element => {
  const router = useRouter();
  const { t } = useI18n();
  const dispatcher = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.login);
  const shoppingcart = useAppSelector((state) => state.shoppingcart);
  useEffect(() => {
    if (shoppingcart.Loading == true) {
      dispatcher(fetchShoppingData());
    }
  }, [dispatcher, shoppingcart]);

  const handleLogOut = () => {
    dispatcher(UserLogout());
    dispatcher(fetchDataCustomer([]));
    router.push('/login');
  };
  const renderLoginButton = () => {
    if (loggedIn.LoggedIn) {
      return (
        <>
          <Link className={'p-2 text-white'} onClick={() => router.push('/shoppingcart')} href="#">
            {shoppingcart.Loading ? (
              <ShoppingCartOutlinedIcon />
            ) : (
              <Badge badgeContent={shoppingcart.cart.Items.length} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            )}
          </Link>
          <Link className={'p-2 text-white'} onClick={() => router.push('/account')} href="#">
            <AccountCircleOutlinedIcon />
          </Link>
          <Link className={'p-2 text-white'} onClick={() => handleLogOut()} href="#">
            <LogoutOutlinedIcon />
          </Link>
        </>
      );
    }
    return (
      <>
        <Link className={'p-2 text-white'} onClick={() => router.push('/login')} href="#">
          {t('login')}
        </Link>
        <Link className={'p-2 text-white'} onClick={() => router.push('/register')} href="#">
          {t('register')}
        </Link>
      </>
    );
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom nev-back-blue">
      <h5 className="my-0 me-md-auto fw-normal">
        <Link href="/" className="text-white">
          <img src={`${publicUrl}/sourceved-logo-white.webp`} alt="Sitecore" />
        </Link>
      </h5>
      <nav className="my-2 my-md-0 me-md-3">{renderLoginButton()}</nav>
    </div>
  );
};

export default Navigation;
