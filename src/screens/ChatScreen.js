import React, { useCallback, useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ChatItemInfo } from "../components/ChatScreen/ChatItemInfo";
import { ChatMessagesList } from "../components/ChatScreen/ChatMessagesList";
import { ChatInputText } from "../components/ChatScreen/ChatInputText/ChatInputText";
import {
  sendMessage,
} from "../store/asyncActions/message";
import { CHAT_OF_SUPPORT, SUPPORT_CHAT_ID, CHAT_STATUS_IS_TYPING, CHAT_STATUS_STOP_TYPING } from "../strings";


export const ChatScreen = ({ route }) => {
  const info = route.params.dialog;
  const chatId = info.id;
  const currentCompanion = info.members.find(item => !item.current_user)

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const onMessageSubmitHandler = useCallback(
    (text) => {
      const message = {
        type: "send_message",
        data: {
          content: text,
          chat_id: chatId,
        },
      };
      dispatch(sendMessage(JSON.stringify(message)));
    },
    [] // [dispatch]
  );

  const onTypingHandler = (isTyping) => {
    const message = {
      type: isTyping ? CHAT_STATUS_IS_TYPING : CHAT_STATUS_STOP_TYPING,
      data: {
        uid: currentUser.uid,
        chatId
      }
    }
    // dispatch(sendMessage(JSON.stringify(message)))
  }

  return (
    <View style={styles.wrapper}>

      {info.adv_id !== SUPPORT_CHAT_ID ? (
        <ChatItemInfo
          title={
            info.adv !== undefined ? info.adv.title : CHAT_OF_SUPPORT
          }
          image={info.adv.img}
        />
      ) : null}

      <ChatMessagesList
        chatInfo={{
          ... info,
          currentUser, currentCompanion
        }}
      />
      
      <ChatInputText onTyping={onTypingHandler} onMessageSubmit={onMessageSubmitHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // width: "100%",
    backgroundColor: "#FFFFFF",
  }
});
