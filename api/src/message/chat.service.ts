import { Injectable } from '@nestjs/common';
import { CustomSocket, Message } from './types/types';

@Injectable()
export class ChatService {
  private messages: Message[] = [];

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }

  createMessage(text: string, socket: CustomSocket): Message {
    const message: Message = {
      id: this.generateId(),
      text,
      author: socket.data.username,
      authorId: socket.id,
      timestamp: new Date().toISOString(),
    };
    this.messages.push(message);
    return message;
  }

  editMessage(id: string, text: string, authorId: string): Message | null {
    const index = this.messages.findIndex(
      (msg) => msg.id === id && msg.authorId === authorId,
    );
    if (index !== -1) {
      this.messages[index].text = text;
      this.messages[index].edited = true;
      return this.messages[index];
    }
    return null;
  }

  deleteMessage(id: string, authorId: string): boolean {
    const index = this.messages.findIndex(
      (msg) => msg.id === id && msg.authorId === authorId,
    );
    if (index !== -1) {
      this.messages.splice(index, 1);
      return true;
    }
    return false;
  }
}
