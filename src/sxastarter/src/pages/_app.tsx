// pages/_app.tsx
import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import Bootstrap from 'src/Bootstrap';

import 'assets/main.scss';
import 'assets/app.css';

import { useEffect, useRef } from 'react';
import { loadEngage } from '../lib/engageClient';

function App({ Component, pageProps, router }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  const resolvedLocale = pageProps.locale || 'en';
  const itemId = pageProps.layoutData?.sitecore?.route?.itemId || undefined;

  // ✅ Keep engageInstance stable across renders
  const engageRef = useRef<Awaited<ReturnType<typeof loadEngage>> | null>(null);

  useEffect(() => {
    const initEngage = async () => {
      if (!engageRef.current) {
        try {
          const engageInstance = await loadEngage();
          engageRef.current = engageInstance;

          console.log('✅ Engage initialized in _app.tsx');

          // ✅ Initial page view
          engageInstance.pageView({
            channel: 'WEB',
            currency: 'USD',
            language: resolvedLocale,
            page: router.asPath,
          }, {
            itemId: itemId,
          });
        } catch (err) {
          console.error('❌ Error initializing Engage:', err);
        }
      }
    };

    initEngage();

    // ✅ Track route changes
    const handleRouteChange = (url: string) => {
      const engageInstance = engageRef.current;
      if (engageInstance) {
        engageInstance.pageView({
          channel: 'WEB',
          currency: 'USD',
          language: resolvedLocale,
          page: url,
        }, {
          itemId: undefined,
        });
        console.log(`📄 Page view event sent for: ${url}`);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, resolvedLocale, itemId]);

  return (
    <>
      <Bootstrap {...pageProps} />
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <Component {...rest} />
      </I18nProvider>
    </>
  );
}

export default App;
