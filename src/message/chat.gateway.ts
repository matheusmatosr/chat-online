import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Injectable } from '@nestjs/common';
import { CustomSocket } from './types/types';

@WebSocketGateway({ cors: { origin: 'http://localhost:3000' } })
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  handleConnection(socket: CustomSocket) {
    console.log('Usuário conectado!', socket.id);
  }

  handleDisconnect(socket: CustomSocket) {
    console.log('Usuário desconectado!', socket.id);
  }

  @SubscribeMessage('set_username')
  handleSetUsername(
    @MessageBody() username: string,
    @ConnectedSocket() socket: CustomSocket,
  ) {
    socket.data.username = username;
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() text: string,
    @ConnectedSocket() socket: CustomSocket,
  ) {
    const message = this.chatService.createMessage(text, socket);
    socket.broadcast.emit('receive_message', message);
    socket.emit('receive_message', message);
  }

  @SubscribeMessage('edit_message')
  handleEditMessage(
    @MessageBody() data: { id: string; text: string },
    @ConnectedSocket() socket: CustomSocket,
  ) {
    const updated = this.chatService.editMessage(data.id, data.text, socket.id);
    if (updated) {
      socket.broadcast.emit('update_message', updated);
      socket.emit('update_message', updated);
    }
  }

  @SubscribeMessage('delete_message')
  handleDeleteMessage(
    @MessageBody() id: string,
    @ConnectedSocket() socket: CustomSocket,
  ) {
    const deleted = this.chatService.deleteMessage(id, socket.id);
    if (deleted) {
      socket.broadcast.emit('delete_message', id);
      socket.emit('delete_message', id);
    }
  }
}
