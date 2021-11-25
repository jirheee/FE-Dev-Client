import React, { useState, useRef } from 'react';
import { IconButton, Textarea, Flex } from '@chakra-ui/react';
import { ChatIcon, TimeIcon } from '@chakra-ui/icons';

const ChatInput = ({ sendMessage }: any) => {
  const [message, setMessage] = useState('');

  return (
    <Flex p="8px 6px" w="full" backgroundColor="white" flexDir="column">
      <Textarea
        placeholder="Chat"
        fontSize={8}
        rows={2}
        m={0.5}
        p="5px 5px"
        resize="vertical"
        value={message}
        onChange={evt => {
          setMessage(evt.target.value);
        }}
      />
      <Flex justifyContent="right">
        <IconButton
          size="xs"
          icon={<TimeIcon />}
          aria-label="Timeline"
          m={0.5}
        />
        <IconButton
          onClick={evt => {
            sendMessage(message);
            setMessage(''); // clear message after send
          }}
          size="xs"
          icon={<ChatIcon />}
          aria-label="Send Message"
          m={0.5}
        />
      </Flex>
    </Flex>
  );
};

export default ChatInput;
