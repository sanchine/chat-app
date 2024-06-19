import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text } from "react-native";
import { CHAT_OF_SUPPORT, SUPPORT_CHAT_ID } from "../../strings";
import SupportBannerAvatar from "../../../assets/DialogsScreen/support_banner_avatar.png";
import { getFormattedLastMessageDate } from "../../utils/dateFormating";

export const DialogElement = ({ dialog, onOpen }) => {
  const isUnread =
    dialog.last_message_status !== "3" && !dialog.last_message_current_user
      ? true
      : false;

  const isMessageChecked = !isUnread ? true : false;

  const interlocutor = dialog.members.find((member) => !member.current_user);

  const styles = StyleSheet.create({
    dialog: {
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
      paddingHorizontal: 8,
      paddingBottom: 14,
      paddingTop: 13,
    },
    dialogFrame: {
      // position: 'relative',
      flexDirection: "row",
      // backgroundColor: 'lightgreen',
      // width: '100%',
      justifyContent: "space-between",
    },
    image: {
      width: 70,
      height: 70,
      marginRight: 12,
      // backgroundColor: 'lightblue'
    },
    preview: {
      flex: 1,
      flexDirection: "row",
    },
    messageFrame: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    infoColumn: {
      flexDirection: "column",
      width: "83%",
      alignItems: "flex-start",
    },
    authorInfo: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: 6,
    },
    avatarCircle: {
      backgroundColor:
        dialog.adv !== undefined ? interlocutor.avatar_bgcolor : null,
      borderRadius: 22,
      width: 21,
      height: 21,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 6,
      marginVertical: 1.5,
    },
    avatar: {
      // borderRadius: 22,
      width: 21,
      height: 21,
    },
    headerChar: {
      fontFamily: "segoe-ui",
      color: "#FFFFFF",
      fontSize: 12,
      // fontWeight: 400
      lineHeight: 20,
    },
    authorName: {
      fontFamily: "segoe-ui-bold",
      fontSize: 16,
      fontWeight: 600,
    },
    message: {
      flexDirection: "column",
      maxWidth: "100%",
    },
    dialogName: {
      fontFamily: isMessageChecked ? "segoe-ui" : "segoe-ui-bold",
      fontSize: 14,
      height: 20,
    },
    lastMessage: {
      fontSize: 14,
      fontFamily: isMessageChecked ? "segoe-ui" : "segoe-ui-bold",
      height: 20,
      color: isMessageChecked ? "#838383" : "black",
      maxWidth: "100%",
    },
    dateBlock: {
      // position: 'absolute',
      // right: 0,
      // paddingTop: 1,
    },
    date: {
      fontSize: 14,
      fontWeight: isMessageChecked ? 400 : 600,
      height: 20,
      // backgroundColor: 'yellow',
      color: isMessageChecked ? "#838383" : "black",
    },
  });

  let last_message_date = getFormattedLastMessageDate(dialog.last_message_date);

  if (dialog.adv_id === SUPPORT_CHAT_ID) {
    return (
      <TouchableOpacity
        style={styles.dialog}
        activeOpacity={0.7}
        onPress={() => onOpen(dialog)}
      >
        <View style={styles.dialogFrame}>
          <Image
            style={styles.image}
            source={{
              uri: "http://chat.algusdev.ru/modules/custom/ae_chat_api/assets/img/customer_support.png",
            }}
          />

          <View style={styles.preview}>
            <View style={styles.messageFrame}>
              <View style={styles.infoColumn}>
                <View style={styles.authorInfo}>
                  <View style={styles.avatarCircle}>
                    <Image style={styles.avatar} source={SupportBannerAvatar} />
                  </View>
                  <Text style={styles.authorName}>{CHAT_OF_SUPPORT}</Text>
                </View>

                <View style={styles.message}>
                  <Text style={styles.dialogName}></Text>
                  <Text style={styles.lastMessage}>{dialog.last_message}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.dateBlock}>
            <Text style={styles.date}>{last_message_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.dialog}
      activeOpacity={0.3}
      onPress={() => onOpen(dialog)}
    >
      <View style={styles.dialogFrame}>
        <Image style={styles.image} source={{ uri: dialog.adv.img }} />

        <View style={styles.preview}>
          <View style={styles.messageFrame}>
            <View style={styles.infoColumn}>
              <View style={styles.authorInfo}>
                <View style={styles.avatarCircle}>
                  {interlocutor.avatar === undefined ? (
                    <Text style={styles.headerChar}>
                      {interlocutor.avatar_letter}
                    </Text>
                  ) : (
                    <Image
                      style={styles.avatar}
                      source={{ uri: dialog.adv.author.avatar }}
                    />
                  )}
                </View>
                <Text style={styles.authorName}>{interlocutor.name}</Text>
              </View>

              <View style={styles.message}>
                <Text style={styles.dialogName} numberOfLines={1}>
                  {dialog?.adv?.title}
                </Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {dialog?.last_message_current_user ? "Вы: " : null}
                  {dialog?.last_message}
                </Text>
              </View>
            </View>

            <View style={styles.dateBlock}>
              <Text style={styles.date}>{last_message_date}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
