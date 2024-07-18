import React, { useContext } from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from 'src/store';
import { ThemeContext } from 'components/ThemeContext/ThemeContext';
import config from 'temp/config';

const Header = dynamic(() => import('components/Header/Header'), { ssr: false });
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  pageTitle: Field;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const { theme } = useContext(ThemeContext);
  const fields = route?.fields as RouteFields;
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="app-main" data-theme={theme}>
            <Head>
              <title>{fields.pageTitle.value.toString() || 'Page'}</title>
              <link rel="icon" href={`${publicUrl}/favicon.ico`} />
              {headLinks.map((headLink) => (
                <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
              ))}
            </Head>
            <Header />
            <main className={pathname !== '/' ? 'main-page' : 'main-home-page'}>
              {route && (
                <>
                  <Placeholder name="jss-main" rendering={route} />
                  <footer className="site-footer">
                    <div className="container">
                      <div className="site-footer__top">
                        <div className="site-footer__description">
                          <Placeholder name="jss-footer-left" rendering={route} />
                        </div>

                        <div className="site-footer__links">
                          <Placeholder name="jss-footer-right" rendering={route} />
                        </div>
                      </div>
                    </div>
                    <Placeholder name="jss-footer-bottom" rendering={route} />
                  </footer>
                </>
              )}
            </main>
            {/* <Footer /> */}
          </div>
        </PersistGate>
      </Provider>
    </>
  );
};

export default Layout;
