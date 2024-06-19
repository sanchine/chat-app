import AsyncStorage from "@react-native-async-storage/async-storage";
import { addNewMessage } from "../store/reducers/chat";


let ws;
let wsAddress = `ws://chat.algusdev.ru:8000?jwt=`;
// let wsAddress = `ws://192.168.0.3:3001`;
let dispatch = null

const closeHandler = () => {
  // console.log('ws closed')
  setTimeout(createChannel, 10000);
};

JSON.safeParse = (json) => {
    try {
        const data = JSON.parse(json)
        return data
    } catch (e) {
        console.log(e)
    }
}


const messageHandler = (e) => {

  try {
    // Попытаемся распарсить сообщение
    const json = JSON.parse(e.data);
    // const message = JSON.parse(json.data)

    // Сообщение получено полностью, обрабатываем его
    const type = json.type;
    const data = json.data;

    switch (type) {
      case "send_message":
        console.log('send_message: ', JSON.stringify(data, null, 2))
        dispatch(addNewMessage(data))
        break
      default:
        break;
    }

  } catch (e) {
    console.log(e)
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
  async start(_dispatch) {
    try {
      const tokens = await JSON.parse(await AsyncStorage.getItem('tokens'))
      wsAddress += tokens.accessToken
      dispatch = _dispatch 
    } catch (error) {
      console.error("getToken:", error);
    } finally {
      createChannel();
    }
  },
  stop() {
    cleanUp();
    ws?.close();
  },
  sendMessage(message) {
    ws?.send(message);
  }
};
