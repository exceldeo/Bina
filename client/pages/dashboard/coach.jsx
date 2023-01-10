import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import { Box, Button, Center, Flex, Link, Spacer, Text } from '@chakra-ui/react';
import Slider from 'react-slick';

import { useAuthState } from '@/contexts/AuthContext';

import MainLayout from '@/components/MainLayout';

import axiosClient from '@/lib/axios';
import SmeTag from '@/components/sme/SmeTag';

const CoachDashboardPage = () => {
  const [smeList, setSmeList] = useState(null);

  const { user } = useAuthState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: smeList?.length >= 3 ? 3 : smeList?.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getSmeList = async () => {
      const response = await axiosClient.get(`/mentors/listumkm/${user.id}`);
      const data = response.data;

      setSmeList(data);
    };

    getSmeList();
  }, [user.id]);

  return (
    <>
      <NextSeo title='Dashboard' />

      <MainLayout p={0}>
        <Box
          position='sticky'
          top={{ base: '3.5rem', md: '4rem' }}
          zIndex={1}
          bg='white'
          px={8}
          py={10}
          shadow='md'
          borderBottomRadius='3xl'
        >
          <Text color='gray.600' fontSize='3xl' fontWeight='bold'>
            Selamat Datang!
          </Text>
          <Text color='orange.400' fontSize='xl' fontWeight='bold'>
            {user.name}
          </Text>
        </Box>
        <Box px={8} py={6} minH='100vh'>
          <Flex align='end' mb={4}>
            <Text color='orange.400' fontSize='xl' fontWeight='bold'>
              UMKM Binaan
            </Text>
            <Spacer />
            <Link href={`/smelist/${user.id}`} passHref style={{ textDecoration: 'none' }}>
              <Text color='gray.500' fontSize='sm'>Lihat Semua</Text>
            </Link>
          </Flex>
          {smeList && (
            <Slider {...settings}>
              {smeList?.map((sme) => {
                return (
                  <NextLink key={sme.id} href={`/sme/${sme.id}`} passHref>
                    <Box
                      position='relative'
                      overflow='hidden'
                      h={56}
                      bgImage={
                        sme?.DetailUser?.DetailTempatUsahas?.[0]?.imageUrl ||
                        'https://image.freepik.com/free-photo/low-angle-shot-grey-skyscrapers-front-river-dark-cloudy-sky_181624-7042.jpg'
                      }
                      bgPosition='center'
                      bgRepeat='no-repeat'
                      bgSize='cover'
                      borderRadius='xl'
                      cursor='pointer'
                    >
                      <Box
                        position='absolute'
                        bottom='0'
                        left='0'
                        w='100%'
                        h={16}
                        px={4}
                        pt={5}
                        color='white'
                        bgGradient='linear(to-b, rgba(0,0,0,0), rgba(0,0,0,0.8))'
                      >
                        <Text fontWeight='bold'>{sme.name}</Text>
                      </Box>
                      {/* <SmeTag
                        position='absolute'
                        category={sme?.labelPoint}
                        top={0}
                        right={0}
                        mt={2}
                        mr={2}
                      >
                        Gold
                      </SmeTag> */}
                    </Box>
                  </NextLink>
                );
              })}
            </Slider>
          )}
          <Link
            href={`/chatlist/${user.id}`}
            _hover={{ textDecoration: 'none' }}
            style={{ textDecoration: 'none' }} 
            _focus={{ boxShadow: 'none' }}
          >
            <Box
              bg='white'
              width='100%'
              py={2}
              mt={8}
              style={{ boxShadow: '0px -1px 5px #ccc' }}
              borderRadius='3xl'
            >
              <Center>
                <Text color='orange.400' fontSize='lg' fontWeight='bold'>
                  Pesan Masuk
                </Text>
              </Center>
            </Box>
          </Link>
        </Box>
        <Box
          position='sticky'
          bottom={0}
          zIndex={1}
          bg='white'
          width='100%'
          px={8}
          py={6}
          style={{ boxShadow: '0px -1px 5px #ccc' }}
          borderTopRadius='3xl'
        >
          <Text color='gray.600' fontWeight='bold' mb={3}>
            Anda menemukan kendala?
          </Text>
          <Link
            href='https://wa.me/6281288882462'
            isExternal
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Button
              colorScheme='orange'
              fontSize=''
              fontWeight='bold'
              isFullWidth
            >
              Hubungi CS Bina
            </Button>
          </Link>
        </Box>
      </MainLayout>
    </>
  );
};

export default CoachDashboardPage;
