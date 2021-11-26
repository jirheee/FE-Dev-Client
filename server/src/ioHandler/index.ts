import { Server as SocketIOServer, Socket } from 'socket.io';
import Logger from '../loader/logger';

const OnJoinLecture = (socket: Socket) => (request: string) => {
  const { lectureId } = JSON.parse(request);
  const lectureName = `Lecture_${lectureId}`;
  socket.join(lectureName);
  Logger.info(`A User Joined to ${lectureName}`);
  socket.emit('JoinLecture', { lectureId, status: 200 });
};

const OnChatTextMessage = (socket: Socket) => (request: string) => {
  const { lectureId, textMessage } = JSON.parse(request);
  socket.emit('ChatTextMessage', {
    time: new Date().toISOString(),
    textMessage
  });
  socket.to(`Lecture_${lectureId}`).emit(textMessage);
};

const OnInstructorTimeChange = (socket: Socket) => (request: string) => {
  const { lectureId, newtime } = JSON.parse(request);

  socket.to(`Lecture_${lectureId}`).emit('InstructorTimeChange', `${newtime}`);
};

const OnInstructorPlayPause =
  (socket: Socket, isPlay: boolean) => (request: string) => {
    const { lectureId } = JSON.parse(request); // argument request: string

    socket
      .to(`Lecture_${lectureId}`)
      .emit(isPlay ? 'InstructorPlay' : 'InstructorPause');
  };

const OnTimeMarkerClicked = (socket: Socket) => (request: string) => {
  const { markerId, markerType } = JSON.parse(request);
  socket.emit('TimeMarkerClicked', markerId, markerType);
  // Listening on 'client/src/components/chat.tsx'
};

export default (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    Logger.info('User connected');
    socket.on('disconnect', () => {
      socket.disconnect();
    });

    socket.on('JoinLecture', OnJoinLecture(socket));
    socket.on('ChatTextMessage', OnChatTextMessage(socket));

    // client/components/youtube.tsx
    socket.on('InstructorTimeChange', OnInstructorTimeChange(socket));
    socket.on('InstructorPlay', OnInstructorPlayPause(socket, true));
    socket.on('InstructorPause', OnInstructorPlayPause(socket, false));

    // client/components/timeMarker.tsx
    socket.on('TimeMarkerClicked', OnTimeMarkerClicked(socket));
  });
};
