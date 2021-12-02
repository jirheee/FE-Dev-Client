import React from 'react';

import YouTube from '../components/youtube';

import { SocketProvider } from '../context/socket';
import { MemberType } from '../types';

import ChatTestPage from './chatTestPage';

const YouTubePage = (): React.ReactElement<any, any> => {
  // Instructor example
  const user = {
    name: 'Kim',
    studentNumber: -1, // -1
    room: 10
  };

  return (
    <YouTube
      memberType={MemberType.INSTRUCTOR}
      room="uuid"
      videoId="j1_5ttGRzFs"
    />
  );
};

export default (
  <SocketProvider url="localhost:5000">
    <YouTubePage />
    <ChatTestPage />
  </SocketProvider>
);
