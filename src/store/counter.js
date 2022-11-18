import { defineStore } from 'pinia';

export const useStore = defineStore('counter', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      userInfo: {
        id: '',
        canteenId: '',
      },
      chatRecordMap: new Map(), // <id , chattInfo : {user,record}>
      chatMap: new Map(), // chatInfo : user
    };
  },
  actions: {
    getUserInfo() {
      return this.userInfo;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    getChatRecordMap() {
      return this.chatRecordMap;
    },
    setChatRecordMap(map) {
      this.chatRecordMap = map;
    },
    getChatMap() {
      return this.chatMap;
    },
    setChatMap(map) {
      this.chatMap = map;
    },
  },
});
