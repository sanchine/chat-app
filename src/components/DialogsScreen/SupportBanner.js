import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import SupportBannerAvatar from '../../../assets/DialogsScreen/support_banner_avatar.png'
import { DIALOG_SUPPORT_BANNER_LABEL, DIALOG_SUPPORT_BANNER_DESCRIPTION } from "../../strings";

export const SupportBanner = ({ onOpen }) => {
    return (
        <TouchableOpacity style={styles.banner} activeOpacity={0.7} onPress={onOpen}>
            <View style={styles.content}>
                <Image source={SupportBannerAvatar} />
                <View style={styles.textBlock}>
                    <Text style={styles.label}>{ DIALOG_SUPPORT_BANNER_LABEL }</Text>
                    <Text style={styles.description}>{ DIALOG_SUPPORT_BANNER_DESCRIPTION }</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    banner: {
        paddingHorizontal: 8,
        marginBottom: 12,
        // backgroundColor: 'red'
    },
    content: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: "#F3E5FF",
    },
    textBlock: {
        paddingLeft: 12,
        flexDirection: "column",
        alignItems: "flex-start" 
    },
    label: {
        fontFamily: "segoe-ui-bold",
        fontSize: 14,
        fontWeight: 700,
        height: 24,
    },
    description: {
        fontFamily: "segoe-ui",
        fontSize: 14,
        fontWeight: 400
    }
})