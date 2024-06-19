import React from "react";
import { ChatHeaderTitle } from "../components/ChatScreen/ChatHeaderTitle";
import { View, Text } from "react-native";

export const chatScreenOptions = ({route}) => {
    const data = route.params.dialog;

    return ({
        headerTitle: () => <ChatHeaderTitle data={data} />,
    })
}