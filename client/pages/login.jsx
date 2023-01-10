import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Box, Button, Center, Flex, Link, Text, VStack } from '@chakra-ui/react';

import { useAuthDispatch } from '@/contexts/AuthContext';

import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';

import axiosClient from '@/lib/axios';
import { defaultToastMessage } from '@/lib/constants';
import { bearerToken } from '@/lib/helper';

const send = (userId) => {
  navigator.serviceWorker
    .register('/worker.js', {
      scope: '/',
    })
    .then((register) => {
      let serviceWorker;

      if (register.installing) {
        serviceWorker = register.installing;
      } else if (register.waiting) {
        serviceWorker = register.waiting;
      } else if (register.active) {
        serviceWorker = register.active;
      }

      if (serviceWorker) {
        serviceWorker.addEventListener('statechange',async function (e) {
          if (e.target.state == 'activated') {
            await register.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                  process.env.NEXT_PUBLIC_VAPID_KEY,
                ),
              })
              .then((subscription) => {
                console.log(JSON.stringify(subscription))
                return axiosClient.post(
                  `/subscribe/${userId}`,
                  JSON.stringify(subscription),
                );
              })
              .then((response) => {
                console.log('Push Sent...', response);
              });
          }
        });
      }
    });
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const Login = () => {
  const router = useRouter();

  const dispatch = useAuthDispatch();

  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    let tempToken;

    toast.promise(
      axiosClient
        .post('/auth/login', data, {
          withCredentials: false,
        })
        .then((res) => {
          const { token } = res.data;
          tempToken = token;
          localStorage.setItem('token', tempToken);

          return axiosClient.get('/auth/checkData', {
            headers: { ...bearerToken() },
            withCredentials: false,
          });
        })
        .then((user) => {
          const role = user.data.user.role;
          dispatch('LOGIN', { ...user.data.user, token: tempToken });

          if (role === 'Mentor') {
            router.replace('/dashboard/coach');
          } else if (role === 'UMKM') {
            router.replace('/dashboard/sme');
          }

          // Check for service worker
          if ('serviceWorker' in navigator) {
            send(user.data.user.id);
          }
        }),
      {
        ...defaultToastMessage,
        success: 'Berhasil! Anda bisa masuk ke akun anda',
      },
    );
  };

  return (
    <>
      <NextSeo title='Login' />

      <Flex
        width='100wh'
        minHeight='100vh'
        justifyContent='center'
        bg='gray.100'
      >
        <VStack
          align='stretch'
          flex='1'
          width='full'
          maxWidth='md'
          bg='white'
          shadow='xl'
        >
          <Box
            bg='gray.100'
            align='center'
            px={6}
            py={12}
            mb={24}
            shadow='md'
            borderBottomRadius='3xl'
          >
            <Image src='/images/logo.png' alt='Logo' height='130' width='100' />
            {/* <Text color='gray.600' fontSize='xl' fontWeight='bold' mt={4}>
              Selamat Datang!
            </Text> */}
          </Box>

          <FormProvider {...methods}>
            <VStack
              as='form'
              spacing='4'
              flex={1}
              px={8}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type='text'
                label='Email / Telepon'
                id='email'
                validation={{
                  required: 'Email / Telepon tidak boleh kosong',
                }}
              />

              <PasswordInput
                type='password'
                label='Password'
                id='password'
                validation={{
                  required: 'Password tidak boleh kosong',
                  minLength: {
                    value: 8,
                    message: 'Password harus lebih dari 8 karakter',
                  },
                }}
              />

              <Button
                type='submit'
                align='center'
                colorScheme='orange'
                textColor='white'
                my={4}
                isFullWidth
              >
                Masuk
              </Button>
            </VStack>
          </FormProvider>

          <Box
            bg='white'
            px={8}
            py={4}
            mt={6}
          >
            <Link 
              align='center'
              href="https://wa.me/6281288882462"
              isExternal
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Button
                bg='gray.200'
                textColor='orange.500'
                isFullWidth
              >
                Hubungi CS Bina
              </Button>
            </Link>
            <Center my={2}>
              <Text color='gray.600' fontSize='sm' fontWeight='bold'>
                Anda menemukan kendala?
              </Text>
            </Center>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default Login;
