import { useRef } from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

import { HiOutlineChat } from 'react-icons/hi';

import ChatWindow from '@/components/chat/ChatWindow';

const ChatButton = () => {
  const initialFocusRef = useRef();

  return (
    <Box position='absolute' bottom={6} right={{ base: 6, sm: 0 }}>
      <Popover initialFocusRef={initialFocusRef} placement='top-start'>
        <PopoverTrigger>
          <IconButton
            aria-label='Open chat window'
            colorScheme='orange'
            icon={<HiOutlineChat size={24} />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Stat px={2}>
              <StatLabel color='gray.500'>Chatting with</StatLabel>
              <StatNumber>Dina Harrison</StatNumber>
            </Stat>
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <ChatWindow initialFocusRef={initialFocusRef} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ChatButton;
