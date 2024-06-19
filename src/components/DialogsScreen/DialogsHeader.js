import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DIALOG_HEADER_TITLE } from "../../strings";
import { useSelector } from "react-redux";

export const DialogsHeader = ({ logoutHandler }) => {
  const unreadChatsCount = useSelector((state) => state.dialogs.unreadChatsCount);

  return (
    <View style={styles.header}>

      <View style={styles.content}>
        <Text style={styles.title}>{DIALOG_HEADER_TITLE}</Text>

        {/* UNREAD CHATS COUNT INDICATOR */}
        {unreadChatsCount !== 0 ? (
          <View style={styles.alertRectanle}>
            <Text style={styles.alertCount}>{unreadChatsCount}</Text>
          </View>
        ) : null}

      </View>


      <TouchableOpacity
        activeOpacity={0.5}
        onPress={logoutHandler}
        style={styles.button}
      >
        <Text>Выход</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginRight: 6,
  },
  header: {
    // fontFamily: "",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 34,

  },
  content: {
    flexDirection: "row",
  },
  alertRectanle: {
    backgroundColor: "#FF001F",
    borderRadius: 22,
    width: 14,
    height: 14,
    alignItems: "center",
    flexShrink: 0,
    marginTop: 11,
  },
  alertCount: {
    color: "white",
    fontSize: 10,
    fontWeight: 600,
  },
  button: {
    paddingTop: 6
  },
});
