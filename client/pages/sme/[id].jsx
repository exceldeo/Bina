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
import SmeDetails from '@/components/sme/SmeDetails';

const SmeDetailPage = ({ data }) => {
  const { user } = useAuthState();
  const router = useRouter();
  const { id: smeId } = router.query;

  return (
    <>
      <NextSeo title={`Profil ${data.DetailUser.namaLengkap}`} />

      <MainLayout position='relative' p={0}>
        <Box>
          <Box
            position='sticky'
            top={{ base: '3.5rem', md: '4rem' }}
            zIndex={5}
            bg='white'
            bgImage={data?.DetailUser?.DetailTempatUsahas?.[0]?.imageUrl || ''}
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            borderBottomRadius='3xl'
            boxShadow='md'
            px={6}
            py={4}
            mb={8}
          >
            <Text color={data?.DetailUser?.DetailTempatUsahas?.[0]?.imageUrl ? 'white' : 'black'} fontSize='5xl' fontWeight='bold' mt={8}>
              {data.DetailUser.namaLengkap}
            </Text>
            <Flex>
              <Box>
                <Text color={data?.DetailUser?.DetailTempatUsahas?.[0]?.imageUrl ? 'white' : 'black'} fontSize='lg'>
                  {/* {data.DetailUser.kategoriUsaha == 'Perdagangan' && (
                    <Icon as={FaStore} w={4} h={4} mb={1} />
                  )}
                  {data.DetailUser.kategoriUsaha == 'Industri Pengolahan' && (
                    <Icon as={FaIndustry} w={4} h={4} mb={1} />
                  )}
                  {data.DetailUser.kategoriUsaha == 'Jasa' && (
                    <Icon as={FaHandshake} w={4} h={4} mb={1} />
                  )}
                  {data.DetailUser.kategoriUsaha == 'Kuliner' && (
                    <Icon as={MdRestaurantMenu} w={4} h={4} mb={1} />
                  )}
                  {data.DetailUser.kategoriUsaha == 'Fashion' && (
                    <Icon as={FaTshirt} w={4} h={4} mb={1} />
                  )} */}
                  <Icon as={FaIndustry} w={4} h={4} mb={1} />
                  &nbsp;{data.DetailUser.kategoriUsaha}
                </Text>
                {/* <Text color={data?.DetailUser?.DetailTempatUsahas?.[0]?.imageUrl ? 'white' : 'black'} fontSize='lg' mb={4}>
                  <Icon as={FaMapMarkerAlt} w={4} h={4} mb={1} />
                  &nbsp;{data.DetailUser.lokasiUsaha}
                </Text> */}
              </Box>
              <Spacer />
              {/* <Box>
                {data.labelPoint == 'Gold' && (
                  <Badge bg='yellow.500'>Gold</Badge>
                )}
                {data.labelPoint == 'Silver' && (
                  <Badge bg='gray'>Silver</Badge>
                )}
                {data.labelPoint == 'Bronze' && (
                  <Badge bg='yellow.700'>Bronze</Badge>
                )}
                {data.labelPoint == 'Orange' && (
                  <Badge bg='orange'>Orange</Badge>
                )}
              </Box> */}
            </Flex>
          </Box>

          <Box minH='100vh' borderRadius='3xl' boxShadow='0 -1px 5px #ccc' px={6} py={4} mt={6}>
            <SmeDetails data={data} />
          </Box>
          <Box
            position='sticky'
            bottom={0}
            zIndex={1}
            bg='white'
            borderTopRadius='3xl'
            boxShadow='0 -1px 5px #ccc'
            px={6}
            py={6}
            mt={6}
          >
            <Center>
              <Link href={`/chat/${user.id}${smeId}`} passHref>
                <Button
                  colorScheme='orange'
                  fontSize=''
                  fontWeight='bold'
                  isFullWidth
                >
                  Kirim Pesan
                </Button>
              </Link>
            </Center>
          </Box>

          {/* <Tabs isFitted>
            <TabList px={1}>
              <Tab>Profil</Tab>
              <Tab>Galeri Produk</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <Box minH='100vh' borderRadius='3xl' boxShadow='0 -1px 5px #ccc' px={6} py={4} mt={6}>
                  <SmeDetails data={data} />
                </Box>
                <Box
                  position='sticky'
                  bottom={0}
                  zIndex={1}
                  bg='white'
                  borderTopRadius='3xl'
                  boxShadow='0 -1px 5px #ccc'
                  px={6}
                  py={6}
                  mt={6}
                >
                  <Center>
                    <Link href={`/chat/${user.id}${smeId}`} passHref>
                      <Button
                        colorScheme='orange'
                        fontSize=''
                        fontWeight='bold'
                        isFullWidth
                      >
                        Kirim Pesan
                      </Button>
                    </Link>
                  </Center>
                </Box>
              </TabPanel>
              <TabPanel p={0}>
                <Box minH='100vh' mt={8}>
                  {data?.DetailUser?.DetailProduks[0] && (
                    <Grid templateColumns="repeat(2, 1fr)" gap={6} px={6}>
                      {data.DetailUser.DetailProduks.map((prod) => (
                        <Image
                          key={prod.imageUrl}
                          borderRadius='xl'
                          boxShadow='md'
                          w='100%'
                          src={prod.imageUrl}
                          alt='Produk'
                        />
                      ))}
                    </Grid>
                  )}
                </Box>

                <Box
                  position='sticky'
                  bottom={0}
                  zIndex={1}
                  bg='white'
                  borderTopRadius='3xl'
                  boxShadow='0 -1px 5px #ccc'
                  px={6}
                  py={6}
                  mt={6}
                >
                  <Center>
                    <Link href={`/chat/${user.id}${smeId}`} passHref>
                      <Button
                        colorScheme='orange'
                        fontSize=''
                        fontWeight='bold'
                        isFullWidth
                      >
                        Kirim Pesan
                      </Button>
                    </Link>
                  </Center>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs> */}
        </Box>
      </MainLayout>
    </>
  );
};

export default SmeDetailPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const response = await axiosClient.get(`/mentors/detailumkm/${params.id}`);
  const data = response.data;

  return {
    props: { data },
  };
}
