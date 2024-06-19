import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { CHAT_INPUT_PLACEHOLDER } from "../../../strings";
import SendButtonImage from "../../../../assets/ChatScreen/send-button.png";
// import { useKeyboardVisible } from "../../../utils/useKeyboardVisible";


export const ChatInputText = ({ onMessageSubmit, onTyping }) => {
  const [ text, setText ] = useState('')

  const onPressHandler = () => {
    if (text == '') return
    onMessageSubmit(text)
    setText('')
    onTyping(false)
  }

  const changeTextHandler = newText => {
    setText(newText)
    onTyping(true)
  }

  const endEditingHandler = () => {
    onTyping(false)
  }

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: '#F0F0F0',
      borderWidth: 1,
      paddingHorizontal: 19
    },
    placeholder: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'segoe-ui',
      marginVertical: 12,
      flex: 1
    },
    sendBtn: {
      width: 30,
      height: 30,
    },
    image: {
      margin: 5,
      width: 20,
      height: 20,
    },
  });

  return (
    <View style={styles.wrapper}>
      {/* <View style={styles.input}> */}
        <TextInput
          style={styles.placeholder}
          placeholder={CHAT_INPUT_PLACEHOLDER}
          defaultValue={text}
          onChangeText={changeTextHandler}
          onEndEditing={endEditingHandler}
          multiline={true}
        ></TextInput>
        <TouchableOpacity style={styles.sendBtn} onPress={onPressHandler}>
          <Image
            style={styles.image}
            source={SendButtonImage}
          />
        </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};