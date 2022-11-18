import { Message } from './message';

export class Invocation {
  /**
   * 私聊
   * 群聊
   * 重连
   * 心跳
   */
  private type: string;
  private message: Message;

  constructor(type: string, message: Message) {
    this.type = type;
    this.message = message;
  }
}
