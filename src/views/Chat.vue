<template>
  <div class="main">
    <t-card>
      <!--! side-bar   -->
      <t-layout>
        <t-aside>
          <div class="sidebar">
            <t-button>创建群聊</t-button>

            <div class="item" v-for="(item, index) in chatMap" :key="index">
              <t-badge :count="item[1].unreadCount">
                <t-comment
                  class="itemContent"
                  :avatar="item[1].user.avatar"
                  :author="item[1].user.name"
                  @click="handlerChatOpen(item[1])"
                />
              </t-badge>
            </div>
          </div>
        </t-aside>

        <!-- ! chat-box -->
        <div class="chatBox" v-if="chatHeader !== ''">
          <t-card>
            <t-layout>
              <t-header class="chatHeader">
                <div class="headerContent">
                  {{ chatHeader }}
                </div>
              </t-header>

              <div class="chatContent" id="test">
                <t-content>
                  <div
                    class="item"
                    v-for="(item, index) in recordList"
                    :key="index"
                  >
                    <t-card
                      :style="{
                        'text-align':
                          item.user.id !== userId ? 'left' : 'right',
                      }"
                    >
                      {{ item.content }}
                    </t-card>
                  </div>
                </t-content>
              </div>

              <t-footer class="footer">
                <div v-show="msgInputVisable">
                  <div class="content">
                    <t-input v-model="msgInput" />
                    <t-button @click="sendMsg" style="margin-left: 1%"
                      >send</t-button
                    >
                  </div>
                </div>
              </t-footer>
            </t-layout>
          </t-card>
        </div>
      </t-layout>
    </t-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from '@vue/runtime-core';
import { Message } from '@/types/chatProtocol/message';
import { MessagePlugin } from 'tdesign-vue-next';
import { chat } from '@/api/chat';
import { Invocation } from '@/types/chatProtocol/invocation';
import { UserInfo } from '@/types/domain/user';
import { ChatInfo } from '@/types/chatProtocol/chat';
import ChatBox from '@/components/ChatBox.vue';
import { useStore } from '@/store/counter';

export default defineComponent({
  name: 'Chat',
  components: { ChatBox },
  setup() {
    const wss = new WebSocket(
      `ws://localhost:8888/webSocket?token=${localStorage.getItem('token')}`
    );

    const store = useStore();
    const userId = store.getUserInfo().id; //! now-user
    const recordList: Ref<Array<Message>> = ref([]); // chat-record-list
    const chatMap: Ref<Map<String, ChatInfo>> = ref(new Map());

    // interlocutor-info
    const receiveId = ref('');
    const sessionId = ref('');
    const chatHeader = ref('');

    const msgInput = ref(''); // msg-input-value
    const msgInputVisable = ref(false);

    onMounted(() => {
      initWebSocket();
      initChatList();
    });

    const initWebSocket = () => {
      wss.addEventListener('open', e => {
        console.log('wss is open');
      });

      wss.addEventListener('error', function (event) {
        console.log('WebSocket error: ', event);
      });

      wss.onclose = function (event) {
        console.log('WebSocket is closed now.');
      };

      wss.addEventListener('message', (res: any) => {
        // parse invocation
        const message = JSON.parse(res.data).message;
        // new user
        const chatmap = store.getChatMap();
        let chatInfo = chatmap.get(message.user.id);
        if (chatInfo === undefined) {
          chatInfo = {
            user: message.user,
            unreadCount: 0,
            sessionId: message.sessionId,
            recordList: [],
          };
        }
        // update cache
        if (message.sessionId !== sessionId.value) chatInfo.unreadCount += 1;
        chatInfo.recordList.push(message);
        chatmap.set(message.user.id, chatInfo);
        store.setChatMap(chatmap);
      });
    };

    // send
    const sendMsg = () => {
      if (msgInput.value === '') {
        MessagePlugin.info('不允许发送空白信息');
      } else {
        console.log('wss send');
        // 组装信息
        const user = {
          id: userId,
          avatar: '',
          name: '',
        };

        const message = new Message(
          msgInput.value,
          user,
          receiveId.value,
          sessionId.value
        );
        // 组装协议
        const invocation = new Invocation('privateChat', message);
        // send
        wss.send(JSON.stringify(invocation));
        // update
        const map = store.getChatMap();
        const chatInfo = map.get(receiveId.value);
        chatInfo.recordList.push(message);
        map.set(receiveId.value, chatInfo);
        store.setChatMap(map);

        // reset
        msgInput.value = '';
      }
    };

    // init-chat-map  TODO userid须在登录的时候就赋值
    const initChatList = () => {
      MessagePlugin.info('拉取信息中');
      //cache
      chatMap.value = store.getChatMap();
      // non-cache
      if (chatMap.value.size === 0) {
        chat
          .getChatList(userId)
          .then((res: any) => {
            const data = res.data.data;
            data.forEach((item: any) => {
              const chatInfo: ChatInfo = {
                user: item.user,
                unreadCount: item.unreadCount,
                sessionId: item.sessionId,
                recordList: [],
              };
              chatMap.value.set(item.user.id, chatInfo);
            });
            // upd-cache
            store.setChatMap(chatMap.value);
          })
          .catch(err => {
            MessagePlugin.error('拉起信息列表失败了哦 稍后再试试叭');
          });
      }
    };

    // click-user-avatar | load char record
    const handlerChatOpen = (row: ChatInfo) => {
      chatHeader.value = row.user.name;
      msgInputVisable.value = true;
      sessionId.value = row.sessionId;
      receiveId.value = row.user.id;
      row.unreadCount = 0;
      // cache | get record by userid
      const chatmap = store.getChatMap();
      const chatInfo = chatmap.get(row.user.id);
      recordList.value = chatInfo.recordList;

      // non-cache
      if (recordList.value.length === 0) {
        chat
          .getChatRecords(row.sessionId)
          .then((res: any) => {
            const data = res.data.data;
            recordList.value = data;
            // upd-cache
            chatInfo.recordList = recordList.value;
            chatmap.set(row.user.id, chatInfo);
            store.setChatMap(chatmap);
          })
          .catch(err => {
            MessagePlugin.error('信息记录拉取失败了！');
          });
      }
    };

    return {
      chatHeader,
      recordList,
      chatMap,
      userId,
      sessionId,
      msgInput,
      msgInputVisable,
      sendMsg,
      handlerChatOpen,
    };
  },
});
</script>
<style scoped>
.main {
}
.sidebar {
  margin-top: 5px;
  height: 50rem;
}
.main .sidebar .item {
  border-bottom-style: solid;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  margin-top: 10px;
  margin-right: 30px;
}

.main .sidebar .item .itemContent {
  padding-bottom: 9px;
}

.main .chatBox {
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 4%;
}

.chatHeader {
  font-size: 28px;
  text-align: center;
}

.chatHeader .headerContent {
  margin-top: 3%;
}

.main .chatBox .chatContent {
  border-top-style: solid;
  border-top-color: #ccc;
  border-top-width: 1px;
  background: #ffffff;
  height: 30rem;
  overflow: auto;
}

.main .chatBox .chatContent .item {
  padding-top: 3%;
}

.main .chatBox .footer {
  border-top-style: solid;
  border-top-color: #ccc;
  border-top-width: 1px;
  width: 40rem;
  background: #ffffff;
}

.main .chatBox .footer .content {
  display: flex;
}

.blockBGC {
  background-color: #aaa;
}

.greyBGC {
  background-color: #ccc;
}
</style>
