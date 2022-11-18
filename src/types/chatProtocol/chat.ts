import { Message } from './message';

export interface ChatInfo {
  sessionId: string;
  user: User;
  recordList: Array<Message>;
  unreadCount: number;
}

export interface User {
  id: string;
  avatar: string;
  name: string;
}
