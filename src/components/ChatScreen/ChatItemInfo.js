import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";


export const ChatItemInfo = ({ title, image }) => {

  
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 18,
      paddingBottom: 8,
      borderBottomColor: '#F1F1F1',
      borderBottomWidth: 1,

      maxWidth: '100%',
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 56
    },
    label: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 400,
      height: 40,
      maxWidth: '90%',
      fontFamily: 'segoe-ui',
    },
    image: {
      width: 40,
      height: 40,
      marginRight: 16
    }
  });

  // title = "Крюк буксирного прибора УРАЛ (АО 'АЗ 'УРАЛ') - 53444 Крюк буксирного Крюк буксирного прибора УРАЛ (АО 'АЗ 'УРАЛ') - 53444...прибора УРАЛ (АО 'АЗ 'УРАЛ') - 53444..."
  
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.label} numberOfLines={2} >{title}</Text>
        <Image style={styles.image} source={{uri: image}} />
      </View>
    </View>
  );
};


