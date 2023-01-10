import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Link,
  Spacer,
  Spinner,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import { MdRestaurantMenu } from 'react-icons/md';
import { FaTshirt, FaStore, FaHandshake, FaIndustry, FaMapMarkerAlt } from 'react-icons/fa';

import { useAuthState } from '@/contexts/AuthContext';

import axiosClient from '@/lib/axios';
import MainLayout from '@/components/MainLayout';
import SmeDetails from '@/components/sme/SmeDetails';

const SmeDashboardPage = () => {
  const [data, setData] = useState(null);
  const [material, setMaterial] = useState(null);
  const { user } = useAuthState();

  useEffect(() => {
    const getSmeDetails = async () => {
      const response = await axiosClient.get(`/mentors/detailumkm/${user.id}`);
      const data = response.data;
      setData(data);
    };

    const getMaterials = async () => {
      const response = await axiosClient.get(`/materi/${user.id}`);
      const material = response.data;
      setMaterial(material);
    };

    getSmeDetails();
    getMaterials();
  }, [user.id]);

  console.log
  return (
    <>
      <NextSeo title='Dashboard' />

      <MainLayout position='relative' p={0}>
        {data ? (
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

            <Tabs isFitted>
              <TabList px={1}>
                <Tab>Materi</Tab>
                <Tab>Profil Saya</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0}>
                  <Box minH='100vh' px={6} py={2} mt={6}>
                    {material?.map((material) => {
                      return (
                        <Link key={material.id} href={material.link} isExternal style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                          <Box borderRadius='3xl' style={{ boxShadow: '0px -1px 5px #ccc' }} mb={8}>
                            <Flex>
                              <Image
                                borderLeftRadius='3xl'
                                width='33%'
                                height='150px'
                                src='https://image.freepik.com/free-photo/businessman-holding-bunch-coins_23-2148793764.jpg'
                                alt='Materi'
                              />
                              <Box position='relative' width='66%' px={4} py={4}>
                                <Text color='gray.600' fontSize='xl' fontWeight='bold'>
                                  {material.name}
                                </Text>
                                <Box position='absolute' bottom='0' width='100%' mb={2} pr={8}>
                                  <Flex align='end'>
                                    {/* <Text color='orange.400' fontSize='lg' fontWeight='bold'>
                                      Coach Test
                                    </Text> */}
                                    <Spacer />
                                    <Text fontSize='xl' fontWeight='bold'>
                                      {material.type == 1 && (
                                        'PDF'
                                      )}
                                      {material.type == 2 && (
                                        'Video'
                                      )}
                                      {material.type == 3 && (
                                        'PPT'
                                      )}
                                      {material.type == 4 && (
                                        'XLSX'
                                      )}
                                    </Text>
                                  </Flex>
                                </Box>
                              </Box>
                            </Flex>
                          </Box>
                        </Link>
                      );
                    })}
                  </Box>

                  <Box
                    position='sticky'
                    bottom={0}
                    zIndex={1}
                    bg='white'
                    width='100%'
                    px={6}
                    py={4}
                    style={{ boxShadow: '0px -1px 5px #ccc' }}
                    borderTopRadius='3xl'
                  >
                    <Box 
                      my={4}
                    >
                      <Flex>
                        <Image
                          borderRadius='full'
                          width='20%'
                          src={data?.mentorFoto || 'https://bit.ly/dan-abramov'}
                          alt='Mentor'
                        />
                        <Spacer />
                        <Box width='70%'>
                          <Text fontSize='md' fontWeight='bold'>
                            Mentor
                          </Text>
                          <Text color='orange.400' fontSize='xl' fontWeight='bold'>
                            {data.mentorName}
                          </Text>
                          <Text>
                            {data.mentorDeskripsi}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                    <Center>
                      <NextLink href={`/chat/${user.idMentor}${user.id}`} passHref>
                        <Button
                          colorScheme='orange'
                          fontSize=''
                          fontWeight='bold'
                          isFullWidth
                        >
                          Chat Mentor
                        </Button>
                      </NextLink>
                    </Center>
                  </Box>
                </TabPanel>
                
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
                    py={4}
                    mt={6}
                  >
                    <Center mb={4}>
                      <Text color='gray.600' fontWeight='bold'>
                        Anda menemukan kendala?
                      </Text>
                    </Center>
                    <Center>
                      <NextLink 
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
                      </NextLink>
                    </Center>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        ) : (
          <Center pt={40}>
            <Spinner size='lg' color='orange.400' thickness='4px' />
          </Center>
        )}
      </MainLayout>
    </>
  );
};

export default SmeDashboardPage;