import AsyncStorage from "@react-native-async-storage/async-storage";
import { newMessageAdded, messageRead } from "../store/reducers/chat";


let subscribers = [];
let dispatch = null;

let ws;
let wsAddress = `ws://chat.algusdev.ru:8000?jwt=`;

const closeHandler = () => {
  setTimeout(createChannel, 10000);
};


const messageHandler = (e) => {
  // console.warn(e)
  const json = JSON.safeJsonParse(e.data)
  // console.warn(json)

  if (!json) return

  try {
    const type = json.type;
    const data = json.data;
    // console.warn(data)

    switch (type) {
      case "send_message":
        dispatch(newMessageAdded(data))
        break
      case "read_message":
        dispatch(messageRead(data))
        break
      // case "send_message":
      //   dispatch(loadNewMessage(json.data));
      //   dispatch(loadNewLastMessage(json.data));
      //   break;
      // case "typing_message":
      //   dispatch(chatStatusLoaded(json));
      //   break;
      // case "stop_typing_message":
      //   dispatch(chatStatusLoaded(json));
      //   break;
      // case "online_user":
      //   dispatch(loadOnlineUsers(data));
      //   break;
      // case "offline_user":
      //   dispatch(loadOnlineUsers(data));
      //   break;
      // case "read_message":
      //   dispatch(readMessage(data)); // in Chat
      //   // dispatch(readLastMessage(data)); // in Dialogs
      //   // dispatch(readLastMessage(data))
      //   // dispatch(decrementUnreadChatsCount(data))
      //   break;
      // case "unread_chats":
      //   dispatch(loadUnreadChatsCount(data.count_unread_chats));
      //   break;
      default:
        break;
    }
    return;
  } catch (e) {
    console.error(e);
  }
};

const createChannel = () => {
  cleanUp();
  ws?.close();
  ws = new WebSocket(wsAddress);
  createEventListeners();
};

const cleanUp = () => {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
};

const createEventListeners = () => {
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
};

export const chatApi = {
  async start() {
    try {
      const tokens = await JSON.parse(await AsyncStorage.getItem('tokens'))
      wsAddress += tokens.accessToken
    } catch (error) {
      console.error("getToken:", error);
    } finally {
      createChannel();
    }
  },
  stop() {
    subscribers = [];
    cleanUp();
    ws?.close();
  },
  subscribe(callback, _dispatch) {
    subscribers.push(callback);
    dispatch = _dispatch;
    return () => {
      subscribers = subscribers.filter((s) => s !== callback);
    };
  },
  unsubscribe(callback) {
    subscribers = subscribers.filter((s) => s !== callback);
  },
  sendMessage(message) {
    ws?.send(message);
  },
  sendStatus(status) {
    ws?.send(status);
  },
  sendReadMessage(status) {
    ws?.send(status);
  },
};
