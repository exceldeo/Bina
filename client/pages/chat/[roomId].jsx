import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import io from 'socket.io-client';
import { useForm } from 'react-hook-form';

import { IoAttach, IoSend, IoImagesOutline } from 'react-icons/io5';

import { useAuthState } from '@/contexts/AuthContext';

import ChatBubble from '@/components/chat/ChatBubble';
import MainLayout from '@/components/MainLayout';

import axiosClient from '@/lib/axios';

// const ENDPOINT = 'https://api.bina.id';
const imagesType = ['image/png', 'image/jpg', 'image/jpeg'];
const ENDPOINT = 'http://localhost:8000';
let socket;

const ChatPage = ({ initialFocusRef }) => {
  const [messages, setMessages] = useState();
  const [receiverName, setReceiverName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const imageInputRef = useRef();
  const messageEndRef = useRef();

  const router = useRouter();
  const { roomId } = router.query;

  const { user } = useAuthState();
  const userId = user.id;
  const receiverUserId =
    user.role === 'UMKM' ? user.idMentor : parseInt(roomId.split(userId)[1]);

  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    socket = io(ENDPOINT, { withCredentials: false });

    socket.emit(
      'join',
      { idUser: userId, idRoom: parseInt(roomId) },
      (error) => {
        if (error) {
          alert(error);
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, router, userId]);

  useEffect(() => {
    const loadDefaultMessages = async () => {
      const response = await axiosClient.get(
        `/chat/${userId}/${receiverUserId}`,
      );
      const data = response.data;

      setMessages(data);
    };

    const getReceiverName = async () => {
      const response = await axiosClient.get(`/users/${receiverUserId}`);
      const data = response.data.name;

      setReceiverName(data);
    };

    getReceiverName();
    loadDefaultMessages();

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (data) => {
    setIsLoading(true);

    if (selectedFile) {
      const formData = new FormData();

      if (imagesType.includes(selectedFile.type)) {
        const newBody = {
          image: selectedFile,
        };

        for (const key in newBody) {
          formData.append(key, newBody[key]);
        }

        const response = await axiosClient.post(
          `/chat/uploadImage/${userId}/${receiverUserId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        socket.emit(
          'sendMessage',
          {
            idUser: userId,
            message: response.data.message,
            receiverUserId: receiverUserId,
            type: 2,
          },
          () => {
            setValue('message', '');
            setSelectedFile(null);
          },
        );
      } else {
        const newBody = {
          file: selectedFile,
        };

        for (const key in newBody) {
          formData.append(key, newBody[key]);
        }

        const response = await axiosClient.post(
          `/chat/uploadFile/${userId}/${receiverUserId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        socket.emit(
          'sendMessage',
          {
            idUser: userId,
            message: response.data.message,
            receiverUserId: receiverUserId,
            type: 3,
          },
          () => {
            setValue('message', '');
            setSelectedFile(null);
          },
        );
      }

      setSelectedFile(null);
    } else {
      const { message } = data;
      if (message !== '') {
        socket.emit(
          'sendMessage',
          {
            idUser: userId,
            message: message,
            receiverUserId: receiverUserId,
            type: 1,
          },
          () => {
            setValue('message', '');
            setSelectedFile(null);
          },
        );
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <NextSeo title='Chat' />
      <MainLayout display='flex' flexDirection='column' p={0}>
        <Box
          position='sticky'
          zIndex={40}
          top={{ base: '3.5rem', md: '4rem' }}
          px={8}
          py={6}
          bg='white'
          borderBottomRadius='lg'
          shadow='md'
        >
          <Stat>
            <StatLabel color='gray.500'>Chat dengan</StatLabel>
            <StatNumber>{receiverName}</StatNumber>
          </Stat>
        </Box>
        <Flex
          position='relative'
          px={8}
          py={4}
          overflowY='auto'
          flexDirection='column'
          flex={1}
        >
          {messages?.map(({ createdAt, message, sendUserId, type }, index) => (
            <ChatBubble
              key={index}
              type={type}
              message={message}
              from={sendUserId}
              dateSent={createdAt}
            />
          ))}
          <Box ref={messageEndRef} />
          {isLoading && (
            <Box
              position='absolute'
              width='100%'
              bottom={0}
              left={0}
              py={2}
              bg='rgba(0, 0, 0, 0.3)'
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <Text textAlign='center' color='white'>
                Loading...
              </Text>
            </Box>
          )}
        </Flex>
        <Box position='sticky' bottom={0} bg='white' shadow='md'>
          <form onSubmit={handleSubmit(handleSendMessage)} autoComplete='off'>
            <Flex
              align='center'
              justify='space-between'
              pl={4}
              pr={2}
              py={2}
              borderTopColor='gray.100'
              borderTopWidth={1}
            >
              {selectedFile && imagesType.includes(selectedFile.type) ? (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt={selectedFile.name}
                  boxSize='100px'
                />
              ) : selectedFile ? (
                <Box bg='gray.50' p={3} borderRadius='lg' maxW='50%'>
                  {selectedFile.name}
                </Box>
              ) : (
                <Input
                  ref={initialFocusRef}
                  {...register('message')}
                  variant='unstyled'
                  placeholder='Type your message'
                  autoFocus
                />
              )}
              <HStack>
                <input
                  type='file'
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept='image/png, image/jpg, image/jpeg'
                  ref={imageInputRef}
                  style={{ display: 'none' }}
                />
                <input
                  type='file'
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  ref={inputRef}
                  style={{ display: 'none' }}
                />
                <IconButton
                  type='button'
                  colorScheme='orange'
                  aria-label='Attach file'
                  onClick={() => imageInputRef.current.click()}
                  variant='ghost'
                  fontWeight='bold'
                  disabled={isLoading}
                  icon={<IoImagesOutline size={24} />}
                />
                <IconButton
                  type='button'
                  colorScheme='orange'
                  aria-label='Attach file'
                  onClick={() => inputRef.current.click()}
                  variant='ghost'
                  fontWeight='bold'
                  disabled={isLoading}
                  icon={<IoAttach size={24} />}
                />
                <IconButton
                  type='submit'
                  colorScheme='orange'
                  aria-label='Send message'
                  variant='ghost'
                  disabled={isLoading}
                  icon={<IoSend />}
                />
              </HStack>
            </Flex>
          </form>
        </Box>
      </MainLayout>
    </>
  );
};

export default ChatPage;
