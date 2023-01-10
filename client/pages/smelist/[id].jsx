import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import {
  Box,
  Center,
  Text,
  Button,
  Icon,
  Image,
  Flex,
  Spacer,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid
} from '@chakra-ui/react';

import { MdRestaurantMenu } from 'react-icons/md';
import { FaTshirt, FaStore, FaHandshake, FaIndustry, FaMapMarkerAlt } from 'react-icons/fa';

import { useAuthState } from '@/contexts/AuthContext';
import MainLayout from '@/components/MainLayout';

import axiosClient from '@/lib/axios';

const SmeListPage = ({ data }) => {
  const { user } = useAuthState();
  const router = useRouter();
  const { id: mentorId } = router.query;

  return (
    <>
      <NextSeo title={`List UMKM`} />

      <MainLayout position='relative' p={0}>
        <Box>
          <Box
            position='sticky'
            top={{ base: '3.5rem', md: '4rem' }}
            zIndex={1}
            bg='white'
            px={6}
            py={4}
          >
            <Center>
              <Text color='orange.400' fontSize='3xl' fontWeight='bold'>
                UMKM Binaan
              </Text>
            </Center>
          </Box>
          <Box
            minH='100vh'
            px={6}
            py={4}
          >
            {data.map((sme) => (
              <Link key={sme.id} href={`/sme/${sme.id}`} >
                <Box
                  borderRadius='3xl'
                  boxShadow='0 -1px 5px #ccc'
                  px={6}
                  py={4}
                  mb={8}
                >
                  <Flex>
                    <Image
                      borderRadius='3xl'
                      width='20%'
                      src={
                        sme?.DetailUser?.DetailTempatUsahas?.[0]?.imageUrl ||
                        'https://image.freepik.com/free-photo/low-angle-shot-grey-skyscrapers-front-river-dark-cloudy-sky_181624-7042.jpg'
                      }
                      alt='Segun Adebayo'
                    />
                    <Spacer />
                    <Box width='70%'>
                      <Text color='orange.400' fontSize='xl' fontWeight='bold'>
                        {sme.DetailUser.namaLengkap}
                      </Text>
                      <Box mb={1}>
                        {/* {sme.labelPoint == 'Gold' && (
                          <Badge bg='yellow.500'>Gold</Badge>
                        )}
                        {sme.labelPoint == 'Silver' && (
                          <Badge bg='gray'>Silver</Badge>
                        )}
                        {sme.labelPoint == 'Bronze' && (
                          <Badge bg='yellow.700'>Bronze</Badge>
                        )}
                        {sme.labelPoint == 'Orange' && (
                          <Badge bg='orange'>Orange</Badge>
                        )} */}
                      </Box>
                      <Text fontSize='md' mb={1}>
                        {/* {sme.DetailUser.kategoriUsaha == 'Perdagangan' && (
                          <Icon as={FaStore} w={4} h={4} mb={1} />
                        )}
                        {sme.DetailUser.kategoriUsaha == 'Industri Pengolahan' && (
                          <Icon as={FaIndustry} w={4} h={4} mb={1} />
                        )}
                        {sme.DetailUser.kategoriUsaha == 'Jasa' && (
                          <Icon as={FaHandshake} w={4} h={4} mb={1} />
                        )}
                        {sme.DetailUser.kategoriUsaha == 'Kuliner' && (
                          <Icon as={MdRestaurantMenu} w={4} h={4} mb={1} />
                        )}
                        {sme.DetailUser.kategoriUsaha == 'Fashion' && (
                          <Icon as={FaTshirt} w={4} h={4} mb={1} />
                        )} */}
                        <Icon as={FaIndustry} w={4} h={4} mb={1} />
                        &nbsp;{sme.DetailUser.kategoriUsaha}
                      </Text>
                      {/* <Text fontSize='md' mb={4}>
                        <Icon as={FaMapMarkerAlt} w={4} h={4} mb={1} />
                        &nbsp;{sme.DetailUser.lokasiUsaha}
                      </Text> */}
                    </Box>
                  </Flex>
                </Box>
              </Link>
            ))}
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
              href="https://wa.me/6281288882462"
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
        </Box>
      </MainLayout>
    </>
  );
};

export default SmeListPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const response = await axiosClient.get(`/mentors/listumkm/${params.id}`);
  const data = response.data;

  return {
    props: { data },
  };
}
