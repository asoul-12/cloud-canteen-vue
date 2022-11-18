import { User } from './chat';

export class Message {
  public content: string;
  public user: User;
  public receiveUserId: string;
  public sessionId: string;
  public sendTime: string | undefined;

  constructor(
    content: string,
    user: User,
    receiveId: string,
    sessionId: string
  ) {
    this.content = content;
    this.user = user;
    this.receiveUserId = receiveId;
    this.sessionId = sessionId;
  }
}
