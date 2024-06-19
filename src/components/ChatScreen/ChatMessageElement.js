import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export const ChatMessageElement = React.memo(
  ({
  message,
  currentUser,
  currentCompanion,
  isInterlocutorMessage,
  isRenderAvatar,
  statusIconName,
  isLastMessageInGroup
}) => {

  const created = Date.parse(message.created);

  const date = new Date(created);

  const dateOptions = {
    hours: "numeric",
    minutes: "numeric",
  };
  

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: !isInterlocutorMessage ? 'flex-end' : 'flex-start',
      marginBottom: isLastMessageInGroup ? 24 : 8,
      width: '100%',
      paddingLeft:!isInterlocutorMessage ? 0 : 44,
      // marginTop:
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: !isInterlocutorMessage ? 'flex-end' : 'flex-start',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: !isInterlocutorMessage ? 'flex-end' : 'flex-start',
    },
    messageText: {
      fontFamily: 'segoe-ui',
      padding: 12,
      backgroundColor: !isInterlocutorMessage ? '#F3E5FF' : '#F1F1F1',
      borderRadius: 6,
      lineHeight: 17,
      fontSize: 12,
      fontWeight: 400,
      marginRight: !isInterlocutorMessage ? 0 : 8,
      marginLeft: !isInterlocutorMessage ? 8 : 0,
      maxWidth: '70%',
    },
    time: {
      marginBottom: 6,
      fontFamily: 'segoe-ui',
      fontSize: 10,
      fontWeight: 400,
      lineHeight: 14,
      // textAlign: 'left',
      color: '#8E8E8E'
    },
    timeBlock: {
      flexDirection: 'row'
    },
    status: {
      // color: "#01DC3E",
      color: message.status == 1 || message.status == 2 ? "#B8B8B8" : "#01DC3E",
      marginRight: 2
    }
  })

  const TimeBlock = () => {
    return (
      <Text style={styles.time}>
        {date.toLocaleTimeString("ru", dateOptions).slice(0, 5)}
      </Text>
    );
  };

  const MessageStatusAndTimeBlock = () => {

    return (
      <View style={styles.timeBlock}>
        <Ionicons name={statusIconName} size={14} style={styles.status} />
        <TimeBlock />
      </View>
    );
  };


  return (
    <View style={styles.wrapper}>
    {isInterlocutorMessage ? (

      <View style={styles.content}>
        
        <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
          <Text style={styles.messageText}>{message.text}</Text>
          <TimeBlock />
        </TouchableOpacity>
      </View>

      ) : (

        <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
          <MessageStatusAndTimeBlock />
          <Text style={styles.messageText}>{message.text}</Text>
        </TouchableOpacity>
    )}


    </View>
  );
}
);
