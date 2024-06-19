import AsyncStorage from "@react-native-async-storage/async-storage";
import { chatApi } from "../../api/chatApi";
import { newMessageAdded } from "../reducers/chat";

export const startMessagesListening = () => async (dispatch) => {
  chatApi.start(dispatch)
}

export const stopMessagesListening = () => async (dispatch) => {
  // chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
  chatApi.stop()
}

export const sendMessage = (message) => async (dispatch) => {
  chatApi.sendMessage(message)
}




// export const sendChatStatus = (status) => async (dispatch) => {
//   chatApi.sendMessage(status)
// }

// export const sendReadMessage = (status) => async (dispatch) => {
//   chatApi.sendMessage(status)
// }