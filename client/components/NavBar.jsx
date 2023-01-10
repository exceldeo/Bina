import { useRef } from 'react';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Link,
  Portal,
  SimpleGrid,
  useBoolean,
  useFocusOnShow,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import { HiHome, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import NavLink from '@/components/NavLink';
import { useAuthDispatch, useAuthState } from '@/contexts/AuthContext';

const links = [{ label: 'Home', href: '/login', icon: HiHome }];

const variants = {
  show: {
    display: 'revert',
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  hide: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.1, ease: 'easeIn' },
    transitionEnd: { display: 'none' },
  },
};

const Backdrop = ({ show }) => (
  <Portal>
    <motion.div
      initial={false}
      animate={show ? 'show' : 'hide'}
      transition={{ duration: 0.1 }}
      variants={{
        show: { opacity: 1, display: 'revert' },
        hide: { opacity: 0, transitionEnd: { display: 'none' } },
      }}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        background: 'rgba(0,0,0,0.2)',
        inset: 0,
      }}
    />
  </Portal>
);

const Transition = ({ in: inProp, ...rest }) => {
  return (
    <motion.div
      {...rest}
      initial={false}
      variants={variants}
      animate={inProp ? 'show' : 'hide'}
      style={{
        transformOrigin: 'top right',
        position: 'absolute',
        width: 'calc(100% - 32px)',
        top: '24px',
        left: '16px',
        margin: '0 auto',
        zIndex: 1,
      }}
    />
  );
};

const NavBar = () => {
  const [show, { toggle, off }] = useBoolean();
  const ref = useRef(null);
  const router = useRouter();
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  useFocusOnShow(ref, { visible: show, shouldFocus: true });

  const handleLogout = () => {
    navigator.serviceWorker.getRegistrations().then( function(registrations) { for(let registration of registrations) { registration.unregister(); } }); 
    dispatch('LOGOUT');
    router.replace('/login');
  };

  const handleHomeButtonClick = () => {
    if (user.role === 'Mentor') {
      router.push('/dashboard/coach');
    } else if (user.role === 'UMKM') {
      router.push('/dashboard/sme');
    }
  };

  return (
    <Box as='header' position='sticky' top={0} bg='white' zIndex={40}>
      <Flex
        align='center'
        justify='space-between'
        mx='auto'
        px={4}
        minH={{ base: '3.5rem', md: '4rem' }}
        w='100%'
        maxW='lg'
      >
        <Link onClick={handleHomeButtonClick}>
          <NextImage src='/images/logo.png' alt='Logo' height={40} width={30} />
        </Link>
        <Box
          as='button'
          type='button'
          aria-label='Open menu'
          // p={1}
          fontSize='2xl'
          color='gray.600'
          onClick={toggle}
        >
          <HiOutlineMenu />
        </Box>

        <Transition in={show}>
          <RemoveScroll enabled={show}>
            <Backdrop show={show} />
          </RemoveScroll>
          <FocusLock disabled={!show} returnFocus>
            <Box
              bg={mode('white', 'gray.700')}
              maxW='lg'
              mx='auto'
              shadow='lg'
              rounded='lg'
              ref={ref}
              tabIndex={0}
              outline={0}
            >
              <Box pt={4} pb={6} px={5}>
                <Flex justify='start' align='center'>
                  <IconButton
                    size='md'
                    fontSize='2xl'
                    aria-label={`Close menu`}
                    variant='ghost'
                    color={mode('gray.600', 'gray.400')}
                    onClick={off}
                    icon={<HiOutlineX />}
                  />
                </Flex>
                <SimpleGrid as='nav' gap={6} mt={4} columns={1}>
                  {links.map((link, idx) => (
                    <NavLink
                      key={idx}
                      href={link.href}
                      icon={link.icon}
                      onClick={toggle}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <Flex
                    as='button'
                    m={-3}
                    p={3}
                    onClick={handleLogout}
                    align='center'
                    rounded='md'
                    cursor='pointer'
                    _hover={{ bg: mode('gray.50', 'gray.600') }}
                  >
                    <Icon
                      as={RiLogoutBoxRLine}
                      color='orange.400'
                      fontSize='xl'
                    />
                    <Box marginStart={3} fontWeight='medium'>
                      Logout
                    </Box>
                  </Flex>
                </SimpleGrid>
              </Box>
            </Box>
          </FocusLock>
        </Transition>
      </Flex>
    </Box>
  );
};

export default NavBar;
