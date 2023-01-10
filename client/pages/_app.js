import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.css';

import theme from '@/theme';

import DEFAULT_SEO from '@/next-seo.config';

import { AuthProvider } from '@/contexts/AuthContext';

import PrivateRoute from '@/components/PrivateRoute';
import * as gtag from '@/lib/gtag';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { asPath } = router;

  const protectedRoutes = [
    {
      path: '/login',
      type: 'Auth',
    },
    {
      path: '/dashboard/coach',
      type: 'Mentor',
    },
    {
      path: '/dashboard/sme',
      type: 'UMKM',
    },
    {
      path: '/sme/[id]',
      type: 'Mentor',
    },
    {
      path: '/smelist/[id]',
      type: 'Mentor',
    },
    {
      path: '/chatlist/[id]',
      type: 'Mentor',
    },
    {
      path: '/chat/[roomId]',
      type: 'All',
    },
  ];

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (process.env.NODE_ENV === 'production') gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <DefaultSeo
          {...DEFAULT_SEO}
          canonical={`https://app.bina.id${asPath}`}
          openGraph={{
            url: `https://app.bina.id${asPath}`,
          }}
        />
        <div>
          <Toaster
            reverseOrder={false}
            toastOptions={{
              style: {
                borderRadius: '8px',
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </div>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          <Component {...pageProps} />
        </PrivateRoute>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
