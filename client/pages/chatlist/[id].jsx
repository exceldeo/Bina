import NextLink from 'next/link';

import { Box, Button, Text, Image, Flex, Spacer, Link } from '@chakra-ui/react';

import { format, parseISO } from 'date-fns';

import MainLayout from '@/components/MainLayout';

import axiosClient from '@/lib/axios';

const chatList = ({ data }) => {
  return (
    <MainLayout p={0}>
      <Box
        position='sticky'
        top={{ base: '3.5rem', md: '4rem' }}
        zIndex={1}
        bg='white'
        px={8}
        py={6}
        shadow='md'
        borderBottomRadius='3xl'
      >
        <Text color='gray.600' fontSize='3xl' fontWeight='bold'>
          Pesan Masuk
        </Text>
      </Box>
      <Box minH='100vh' px={6} py={4} mt={2}>
        {data?.map((chat) => {
          return (
            <NextLink key={chat.umkmId} href={`/chat/${chat.mentorId}${chat.umkmId}`} passHref>
              <Box
                borderBottom='1px'
                color='orange.300'
                width='100%'
                py={4}
              >
                <Flex align='center'>
                  <Box width='20%'>
                    <Image
                      boxSize={16}
                      borderRadius="full"
                      src="https://bit.ly/sage-adebayo"
                      alt="Segun Adebayo"
                      mr={1}
                    />
                  </Box>
                  <Box width='70%'>
                    <Flex>
                      <Text fontSize='md' fontWeight='bold' color='orange'>
                        {chat.umkmName}
                      </Text>
                      <Spacer />
                      <Text fontSize='sm' color='gray'>
                        {format(parseISO(chat.createdAt), 'HH:mm')}
                      </Text>
                    </Flex>
                    <Text fontSize='sm' color='gray'>
                      {chat.message}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </NextLink>
          );
        })}
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
  )
}

export default chatList

export async function getServerSideProps(context) {
  const { params } = context;
  const response = await axiosClient.get(
    `http://api.bina.id/api/v1/chat/listlastchatmentor/${params.id}`,
  );
  const data = response.data;

  return {
    props: { data },
  };
}