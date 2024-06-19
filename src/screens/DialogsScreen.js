import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DialogsList } from "../components/DialogsScreen/DialogsList";
import { DialogsHeader } from "../components/DialogsScreen/DialogsHeader";
import { SupportBanner } from "../components/DialogsScreen/SupportBanner";
import {
  startMessagesListening,
  stopMessagesListening,
} from "../store/asyncActions/message";
import { fetchLogout } from "../store/asyncActions/auth";
import axios from "axios";


export const DialogsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  const openDialogHandler = (dialog) => {
    navigation.push("Chat", { dialog });
  };

  const openSupportChatHandler = async () => {
    try {
      const res = await axios.get('http://chat.algusdev.ru/ae_chat_api/post_chat?adv_id=0')
      const data = res.data
      console.log(data)
      openDialogHandler(data.result[0])
    } catch (e) {
      console.error('dialogScreen/supportChatHandler:', e)
    }
  };

  const onLogoutHandler = () => {
    dispatch(fetchLogout());
  };

  return (
    <View style={styles.mainBlock}>
      <DialogsHeader
        logoutHandler={onLogoutHandler}
      />
      <SupportBanner onOpen={openSupportChatHandler} />
      <DialogsList onOpen={openDialogHandler}/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBlock: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    fontFamily: "segoe-ui-bold",
    backgroundColor: "#FFFFFF",
    flexDirection: 'column'
  },
});
