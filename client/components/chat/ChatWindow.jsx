import { useRef } from 'react';
import { Flex, IconButton, Input } from '@chakra-ui/react';

import { IoAttach, IoSend } from 'react-icons/io5';

import ChatBubble from '@/components/chat/ChatBubble';

const messages = [
  {
    message: 'Hey Travis! Would you like to go out for a coffee?',
    from: 'others',
    dateSent: '20:21',
  },
  {
    message: 'Sure! At 11:00 am?',
    from: 'me',
    dateSent: '20:22',
  },
  {
    message: "That's too early! How about at noon?",
    from: 'others',
    dateSent: '20:22',
  },
  {
    message: 'That sounds good as well. Where should we meet?',
    from: 'me',
    dateSent: '20:23',
  },
  {
    message: 'Meet me at the hardware store on 21 Duck Street.',
    from: 'others',
    dateSent: '20:23',
  },
  {
    message: "Sounds good. I'll bring my friend with me as well!",
    from: 'me',
    dateSent: '20:24',
  },
  {
    message: 'Which one? The developer or the designer?',
    from: 'others',
    dateSent: '20:24',
  },
  {
    message: 'The developer. You remember Tony, right?',
    from: 'me',
    dateSent: '20:24',
  },
  {
    message: "Yeah! Tony's a great guy!",
    from: 'others',
    dateSent: '20:25',
  },
  {
    message: 'Indeed he is! Alright, see you later 👋!',
    from: 'me',
    dateSent: '20:25',
  },
];

const ChatWindow = ({ initialFocusRef }) => {
  const inputRef = useRef();

  return (
    <Flex w='full' maxHeight='50vh' flexDirection='column'>
      <Flex px={2} overflowY='auto' flexDirection='column' flex={1}>
        {messages.map(({ message, from, dateSent }, index) => (
          <ChatBubble
            key={index}
            message={message}
            from={from}
            dateSent={dateSent}
          />
        ))}
      </Flex>
      <Flex pl={4} pr={2} py={2} borderTopColor='gray.100' borderTopWidth={1}>
        <Input
          ref={initialFocusRef}
          variant='unstyled'
          placeholder='Type your message'
        />
        <input
          type='file'
          accept='image/png, image/jpg, image/jpeg'
          name='file'
          ref={inputRef}
          style={{ display: 'none' }}
        />
        <IconButton
          colorScheme='orange'
          aria-label='Send message'
          onClick={() => inputRef.current.click()}
          variant='ghost'
          fontWeight='bold'
          icon={<IoAttach size={24} />}
        />
        <IconButton
          colorScheme='orange'
          aria-label='Send message'
          variant='ghost'
          icon={<IoSend />}
        />
      </Flex>
    </Flex>
  );
};

export default ChatWindow;
