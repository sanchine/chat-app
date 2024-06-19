import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CHAT_OF_SUPPORT,
  SUPPORT_WORK_TIME,
  LAST_ONLINE,
  SUPPORT_CHAT_ID,
  CHAT_HEADER_ONLINE_USER,
} from "../../strings";
import { getFormattedUserLastSeen } from "../../utils/dateFormating";
import { useSelector } from "react-redux";


export const ChatHeaderTitle = ({ data }) => {
  const onlineUsers = useSelector(state => state.chat.onlineUsers)
  
  let last_date = null;


  let companionIndex = null;
  for (let i = 0; i < data.members.length; ++i) {
    if (!data.members[i].current_user) companionIndex = i;
  }

  // console.warn('onlineUsers:', onlineUsers)
  // const interlocutor = data.members.find(user => !user.current_user)

  // const isInterlocutorOnline = onlineUsers.find(user => user.uid === interlocutor.id)

  if (data.adv_id !== SUPPORT_CHAT_ID)
    last_date = getFormattedUserLastSeen(data.members[companionIndex].last_online)

  return (
    <View style={styles.headerTitle}>
      <Text style={styles.author}>
        {data.adv_id !== SUPPORT_CHAT_ID
          ? data.members[companionIndex].name
          : CHAT_OF_SUPPORT}
      </Text>
      <Text style={styles.date}>
        {data.adv_id === SUPPORT_CHAT_ID
          ? SUPPORT_WORK_TIME
          : true
            ? CHAT_HEADER_ONLINE_USER
            : LAST_ONLINE + last_date
        }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    // position: 'absolute',
    left: -15,
    top: 3
  },
  author: {
    fontSize: 16,
    fontWeight: 600,
  },
  date: {
    fontSize: 10,
    fontWeight: 400,
    color: "#959595",
  },
});
