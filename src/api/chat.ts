import { StringResponse } from '@/types/common/responseData';
import service from './httpChat';

export const chat = {
  getChatInfo(): StringResponse {
    return service.get('/chat/get-chat-info');
  },
  getChatRecords(sessionId: string): StringResponse {
    return service.get(`/chat/get-chat-record/${sessionId}`);
  },
  // test(): StringResponse {
  //   return service.get('/chat/test');
  // },

  //- -------  -
  getChatList(userId: string): StringResponse {
    return service.get(`/chat/get-chat-list/${userId}`);
  },
};
