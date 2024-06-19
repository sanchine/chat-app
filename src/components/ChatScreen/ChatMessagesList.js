import React, { useRef, useEffect, useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text, SectionList } from "react-native";
import { useDispatch } from "react-redux";
import { ChatMessageElement } from "../ChatScreen/ChatMessageElement";
import { fetchMessages } from "../../store/asyncActions/chat";
import { sendMessage } from "../../store/asyncActions/message";

// import { fetchMessages } from "../../store/reducers/chat";

export const ChatMessagesList = ({ chatInfo }) => {
  const sectionListRef = useRef(null);
  const dispatch = useDispatch();

  const groupedMessages = useSelector(state => state.chat.groupedMessages[chatInfo.id])
  // const messages = useSelector(state => state.chat.messages)
  const status = useSelector(state => state.chat.status)
  const firstMessageId = useSelector(state => state.chat.firstMessageId)

  let dataLengthByDate = 0;
  let prevFirstMessageId = null;

  useEffect(() => {

    const fetchData = () => {
      dispatch(fetchMessages(chatInfo.id));
    }

    if (!groupedMessages) fetchData()
    
  }, [dispatch, firstMessageId, chatInfo.id])    


  const handleLoadMoreMessages = useCallback(() => {

    // if (status === 'loading') return

    if (prevFirstMessageId !== firstMessageId) {
      dispatch(fetchMessages(chatInfo.id, firstMessageId));
      prevFirstMessageId = firstMessageId
    }
  }, [firstMessageId])


  const handleSendReadMessage = useCallback((data) => {
    const message = {
      type: "read_message",
      data,
    };
    // dispatch(readMessage(data))
    // dispatch(readLastMessage(data))
    dispatch(sendMessage(JSON.stringify(message)));
  }, []);


  const renderItem = ({ item, index }) => {
    const keyExtractorByAvatar = (item) => item.id;

    dataLengthByDate = item.data.length;

    const elementStyles = StyleSheet.create({
      avatarCircle: {
        width: 36,
        height: 36,
        marginRight: 8,
        backgroundColor: chatInfo.currentCompanion.avatar_bgcolor,
        // item.adv !== undefined ? chatInfo.currentCompanion.avatar_bgcolor : null,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        // paddingTop: 10
        position: "absolute",
      },
      headerChar: {
        color: "#FFFFFF",
        fontFamily: "segoe-ui",
        fontSize: 18,
        fontWeight: 400,
      },
      avatarBlock: {
        width: 36,
        // minHeight: 36,
        marginRight: 8,
        alignItems: "flex-start",
      },
    });


    return (
      <View>
        {/* render author avatar */}
        {item.title === chatInfo.currentCompanion.uid ? (
        <View style={elementStyles.avatarBlock}>
          <View style={elementStyles.avatarCircle}>
            {chatInfo.currentCompanion.avatar === undefined ? (
              <Text style={elementStyles.headerChar}>
                {chatInfo.currentCompanion.avatar_letter}
              </Text>
            ) : (
              <Image
                style={elementStyles.avatar}
                source={{ uri: chatInfo.currentCompanion.avatar }}
              />
            )}
          </View>
        </View>
      ) : null}

         {/* render author messages sequence */}
        {item.data.map((m, i) => {

          const isLastMessageInGroup = dataLengthByDate - 1 === i ? true : false;

          // if (i === 0) console.log(JSON.stringify(m, null, 2))

          const isInterlocutorMessage =
            chatInfo.currentUser.uid === m.author_uid ? false : true;

          const statusIconName = m.status === "1" ? "checkmark" : "checkmark-done";

          if (isInterlocutorMessage && m.status !== 3) {
            const _data = {
              chat_id: m.chat_id,
              message_id: m.id,
            };
            handleSendReadMessage(_data);
          }

          return (
            <ChatMessageElement
              key={`${m.id}-${i}`}
              message={m}
              currentUser={chatInfo.currentUser}
              isLastMessageInGroup={isLastMessageInGroup}
              statusIconName={statusIconName}
              isInterlocutorMessage={isInterlocutorMessage}
              currentCompanion={chatInfo.currentCompanion}
            />
          )
        })}
      </View>
    );
  }

  const renderSectionHeader = ({ section: { title } }) => <DateBlock created={title} />

  
  const DateBlock = ({ created }) => (
    <View style={styles.dateBlock}>
      <Text style={styles.date}>{created}</Text>
    </View>
  );


  return (
    <View style={styles.wrapper}>
    
      {groupedMessages ? (
        <SectionList
          style={styles.list}
          ref={sectionListRef}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          sections={groupedMessages} //[chatInfo.id]}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          onStartReached={handleLoadMoreMessages}
        />
      ) : (
        <ActivityIndicator size={64} style={styles.indicator} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 16,
    flex: 1,
    // paddingHorizontal: 19
  },
  dateBlock: {
    alignItems: "center",
    marginBottom: 10,
  },
  date: {
    fontFamily: "segoe-ui",
    fontSize: 10,
    color: "#959595",
  },
  typingMessage: {
    fontFamily: "segoe-ui",
    color: "grey",
    fontWeight: 400,
  },
  indicator: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 19,
  },
});
