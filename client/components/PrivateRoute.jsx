import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Spinner } from '@chakra-ui/react';

import { useAuthState } from '@/contexts/AuthContext';

export default function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthState();

  const currentRoute = protectedRoutes.find(
    (route) => route.path === router.pathname,
  );

  useEffect(() => {
    if (!isLoading && Boolean(currentRoute)) {
      if (isAuthenticated) {
        if (
          currentRoute.type === 'Auth' ||
          (currentRoute.type !== user.role && currentRoute.type !== 'All')
        ) {
          if (user.role === 'Mentor') {
            router.replace('/dashboard/coach');
          } else if (user.role === 'UMKM') {
            router.replace('/dashboard/sme');
          }
        }
      } else {
        if (currentRoute.type !== 'Auth') {
          router.replace('/login');
        }
      }
    }
  }, [currentRoute, isAuthenticated, isLoading, router, user]);

  if (
    ((isLoading || !isAuthenticated) && currentRoute?.type !== 'Auth') ||
    ((isLoading || isAuthenticated) && currentRoute?.type === 'Auth') ||
    ((isLoading || isAuthenticated) &&
      currentRoute?.type !== user?.role &&
      currentRoute?.type !== 'All')
  ) {
    return (
      <Flex minH='100vh' align='center' justify='center'>
        <Spinner thickness='4px' size='lg' color='orange.400' />
      </Flex>
    );
  }

  return children;
}
