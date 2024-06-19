import { createSlice } from "@reduxjs/toolkit";
import { getFormattedDateForMessageList } from "../../utils/dateFormating";
import { sectionateDataByDate } from "../../utils/dataSectionators";

// добавление нового сообщения, которое приходит по веб-сокету
const addMessageToGrouped = (groupedMessages, newMessage) => {
  const date = getFormattedDateForMessageList(newMessage.created);
  const author = newMessage.author_uid;
  // const chatId = newMessage['chat_id']

  // let chat = groupedMessages[chatId]
  let dateGroup = groupedMessages?.find((group) => group.title === date);
  if (!dateGroup) {
    dateGroup = { title: date, data: [] };
    groupedMessages?.push(dateGroup);
  }

  let authorGroup = dateGroup?.data?.find((group) => group.title === author);
  if (!authorGroup) {
    authorGroup = { title: author, data: [] };
    dateGroup?.data?.push(authorGroup);
  }

  authorGroup?.data?.push(newMessage);
  return [...groupedMessages];
};


// Слайс для управления сообщениями
const messagesSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    groupedMessages: [],
    status: "idle",
    firstMessageId: null
  },
  reducers: {
    loadMessages(state, action) {
      state.firstMessageId = action.payload[0].id

      const messages = action.payload;
      const chatId = messages[0].chat_id

      state.messages = messages;

      state.groupedMessages[chatId] = sectionateDataByDate(messages)

    },
    addPreviousMessages(state, action) {
      state.firstMessageId = action.payload[0].id
      const chatId = action.payload[0]['chat_id']
      
      const messages = [...action.payload, ...state.messages];
      state.messages = messages;

      state.groupedMessages[chatId] = sectionateDataByDate(messages);
    },
    addNewMessage(state, action) {
      // state.firstMessageId = action.payload['message_id']
      const newMessage = action.payload //[0]; //[0] for real data
      const chatId = action.payload['chat_id']

      const messages = [...state.messages, newMessage]
      state.messages = [...messages]

      // state.groupedMessages[chatId] = sectionateDataByDate(messages)

      state.groupedMessages[chatId] = addMessageToGrouped(
        state.groupedMessages[chatId],
        newMessage
      );
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
      state.groupedMessages = [];
      state.status = "idle";
    },
  },
});

export const {
  loadMessages,
  addPreviousMessages,
  addNewMessage,
  setStatus,
  clearMessages,
} = messagesSlice.actions;
export const chatReducer = messagesSlice.reducer;
