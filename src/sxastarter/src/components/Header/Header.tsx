import { useState, useEffect, useRef, useContext } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';

import Logo from 'src/assets/icons/logo';
import { UserLogout, fetchDataCustomer } from 'src/store/Login';
import { fetchDataSuccess, fetchShoppingData } from 'src/store/ShoppingCart';
import { fetchWishlistSuccess } from 'src/store/Wishlist';
import { Logout } from 'src/services/AccountService';
import { abandonSession } from 'src/services/TrackingService';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';
import { ThemeContext } from 'components/ThemeContext/ThemeContext';
import ProductCategory from 'components/Product/ProductCategory/ProductCategory';

type HeaderType = {
  isErrorPage?: boolean;
};

const Header = (props: HeaderType) => {
  const { isErrorPage } = props;
  const router = useRouter();
  const dispatcher = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.login);
  const shoppingcart = useAppSelector((state) => state.shoppingcart);
  const arrayPaths = ['/'];
  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (shoppingcart.Loading == true) {
      dispatcher(fetchShoppingData());
    }
  }, [shoppingcart]);

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }
    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const handleLogOut = () => {
    Logout().then((response) => {
      if (response.data.IsSuccess) {
        abandonSession();
        dispatcher(UserLogout());
        dispatcher(fetchDataCustomer([]));
        dispatcher(fetchDataSuccess([]));
        dispatcher(fetchWishlistSuccess([]));
        router.push('/login');
      }
    });
  };

  const headerClass = () => {
    if (window.scrollY === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? 'site-header--fixed' : ''}`}>
      <div className="container">
        <Link onClick={() => router.push('/')} href="#">
          <h1 className="site-logo">
            <Logo />
            SV Commerce
          </h1>
        </Link>
        <nav ref={navRef} className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}>
          <ProductCategory />
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${searchOpen ? 'search-form--active' : ''}`}
          >
            <form className={`search-form`}>
              <i className="icon-cancel" onClick={() => setSearchOpen(!searchOpen)}></i>
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i onClick={() => router.push('/search')} className="icon-search"></i>
          </button>
          <DarkModeSwitch
            className="dark-toggle"
            checked={theme === 'light' ? false : true}
            onChange={toggleTheme}
            moonColor={!onTop ? 'white' : 'black'}
            sunColor={!onTop ? 'black' : 'white'}
            size={24}
          />
          {loggedIn.LoggedIn ? (
            <>
              <Link onClick={() => router.push('/shoppingcart')} href="#">
                <button className="btn-cart">
                  <i className="icon-cart"></i>
                  {shoppingcart?.cart?.Items?.length > 0 && (
                    <span className="btn-cart__count">{shoppingcart.cart.Items.length}</span>
                  )}
                </button>
              </Link>
              <Link onClick={() => router.push('/account')} href="#">
                <button className="site-header__btn-avatar">
                  <AccountCircleOutlinedIcon />
                </button>
              </Link>
              <Link onClick={() => handleLogOut()} href="#">
                <button className="site-header__btn-avatar">
                  <LogoutIcon />
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link onClick={() => router.push('/login')} href="#">
                <button className="site-header__btn-avatar">
                  <LoginIcon />
                </button>
              </Link>
              <Link onClick={() => router.push('/register')} href="#">
                <button className="site-header__btn-avatar">
                  <AppRegistrationIcon />
                </button>
              </Link>
            </>
          )}
          <button onClick={() => setMenuOpen(true)} className="site-header__btn-menu">
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
