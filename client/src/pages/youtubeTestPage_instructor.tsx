import React from 'react';

import YouTube from '../components/youtube';

import { SocketProvider } from '../context/socket';

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
      name={user.name}
      studentNumber={user.studentNumber}
      room={user.room}
      videoId="j1_5ttGRzFs"
      width={600}
      height={400}
    />
  );
};

export default (
  <SocketProvider url="localhost:5000">
    <YouTubePage />
    <ChatTestPage />
  </SocketProvider>
);
