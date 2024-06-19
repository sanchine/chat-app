import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../store/asyncActions/auth";
import { AUTH_AUTHORIZE_TITLE, AUTH_COMPANY_NAME, AUTH_PASSWORD_PLACEHOLDER, AUTH_REGISTRATION_TITLE, AUTH_USERNAME_PLACEHOLDER } from "../strings";
// import { clearMessages } from "../store/actions/message";
// import { clearDialogs } from "../store/actions/dialog";
import { chatsCleared } from "../store/reducers/chat";


export const AuthScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onLoginSubmitHandler = () => {
    dispatch(
      fetchAuth({
        "name": username,
        "pass": password
      })
    );
    setPassword("");
  };
  const onStayhereLoginSubmitHandler = () => {
    dispatch(
      fetchAuth({
        "name": 'stayhere',
        "pass": '12345'
      })
    );
    setPassword("");
  };
  const onSuperadminLoginSubmitHandler = () => {
    dispatch(
      fetchAuth({
        "name": 'superadmin',
        "pass": '!Poker231123'
      })
    );
    setPassword("");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
      </View>
      <Text style={styles.title}>PARTIZON</Text>
      <TextInput
        style={styles.text_input}
        placeholder={AUTH_USERNAME_PLACEHOLDER}
        defaultValue={username}
        onChangeText={(newUsername) => setUsername(newUsername)}
      ></TextInput>
      <TextInput
        style={styles.text_input}
        placeholder={AUTH_PASSWORD_PLACEHOLDER}
        defaultValue={password}
        secureTextEntry={true}
        onChangeText={(newPassword) => setPassword(newPassword)}
      ></TextInput>
       <TouchableOpacity
          title={AUTH_AUTHORIZE_TITLE}
          onPress={onLoginSubmitHandler}
          style={styles.btn}
      ><Text style={styles.btn_text}>{AUTH_AUTHORIZE_TITLE}</Text></TouchableOpacity>
      {/* <TouchableOpacity
          title={AUTH_AUTHORIZE_TITLE}
          onPress={onStayhereLoginSubmitHandler}
          style={styles.btn}
      ><Text style={styles.btn_text}>STAYHERE</Text></TouchableOpacity>
      <TouchableOpacity
          title={AUTH_AUTHORIZE_TITLE}
          onPress={onSuperadminLoginSubmitHandler}
          style={styles.btn}
      ><Text style={styles.btn_text}>SUPERADMIN</Text></TouchableOpacity> */}
      <View style={styles.footer}>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 10,
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "stretch",
    paddingHorizontal: 40,
  },
  title: {
    flex: 2,
    // paddingBottom: 10,
    fontSize: 24,
    fontWeight: 600,
    color: '#8d6bd1',
    alignItems: "center"
  },
  text_input: {
    marginVertical: 10,
    backgroundColor: "#eeeeee",
    flex: 3,
    textAlign: "center",
    borderRadius: 5,
    fontSize: 28
  },
  btn: {
    backgroundColor: "#8d6bd1",
    color: "red",
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 6,
    borderRadius: 5,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    color: 'white',
    fontSize: 28
  },
  footer: {
    flex: 10
  }
});


{/* <TouchableOpacity
title={AUTH_REGISTRATION_TITLE}
onPress={onRegistrationSubmitHandler} */}
// style={styles.btn}
{/* ><Text style={styles.btn_text}>{AUTH_REGISTRATION_TITLE}</Text></TouchableOpacity> */}