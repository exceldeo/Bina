import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import Lightbox from 'react-image-lightbox';
import { VStack, Box, Text, Image, Flex, Link } from '@chakra-ui/react';

import { HiOutlineDownload } from 'react-icons/hi';

import 'react-image-lightbox/style.css';

import { useAuthState } from '@/contexts/AuthContext';

const ChatBubble = ({ dateSent, message, from, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthState();
  const isMe = from === user.id;

  const alignment = isMe ? 'flex-end' : 'flex-start';
  const bottomRightRadius = isMe ? 0 : 24;
  const bottomLeftRadius = isMe ? 24 : 0;

  return (
    <VStack mt={4} alignItems={alignment} alignSelf={alignment}>
      {type === 2 ? (
        <Image
          src={`http://localhost:8000/uploads/${message}`}
          alt={message}
          boxSize='250px'
          cursor='zoom-in'
          onClick={() => setIsOpen(true)}
        />
      ) : type === 3 ? (
        <Flex bg='gray.50' p={3} borderRadius='lg'>
          {message}
          <Link
            href={`http://localhost:8000/uploads/${message}`}
            ml={2}
            isExternal
          >
            <HiOutlineDownload color='#ED8936' size={24} />
          </Link>
        </Flex>
      ) : (
        <Box
          bg={isMe ? 'orange.100' : 'gray.100'}
          px={4}
          py={3}
          maxW={80}
          borderTopLeftRadius={24}
          borderTopRightRadius={24}
          borderBottomLeftRadius={bottomLeftRadius}
          borderBottomRightRadius={bottomRightRadius}
        >
          {message}
        </Box>
      )}
      <Text fontSize='xs' color='gray'>
        {format(parseISO(dateSent), 'dd/MM/yyyy HH:mm')}
      </Text>
      {isOpen && (
        <Lightbox
          mainSrc={`http://localhost:8000/uploads/${message}`}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </VStack>
  );
};

export default ChatBubble;
