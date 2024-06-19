import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const ChatHeader = ({ author }) => {
  const iconName = "ios-star";

  const onBackPressHandler = () => {
    console.log("111");
  };

  return (
    <View style={styles.header}>
      <View style={styles.content}>
        <Text style={styles.title}>{author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginRight: 0,
  },
  header: {
    marginBottom: 0,
  },
  content: {
    flexDirection: "row",
  },
  alertRectanle: {
    backgroundColor: "#FF001F",
    borderRadius: 20,
    width: 14,
    height: 14,
    alignItems: "center",
    marginBottom: 34,
    flexShrink: 0,
    marginTop: 11,
  },
  alertCount: {
    color: "white",
    fontSize: 10,
    fontWeight: 600,
  },
});
