import { Socket } from 'socket.io';

export interface CustomSocketData {
  username: string;
}

export interface ServerToClientEvents {
  receive_message: (message: Message) => void;
  update_message: (message: Message) => void;
  delete_message: (id: string) => void;
}

export interface ClientToServerEvents {
  set_username: (username: string) => void;
  message: (text: string) => void;
  edit_message: ({ id, text }: { id: string; text: string }) => void;
  delete_message: (id: string) => void;
}

export interface Message {
  id: string;
  text: string;
  author: string;
  authorId: string;
  edited?: boolean;
  timestamp: string;
}

export type CustomSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  any,
  CustomSocketData
>;
