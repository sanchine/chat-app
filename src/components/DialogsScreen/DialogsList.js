import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DialogElement } from "./DialogElement";
import { fetchDialogs } from "../../store/asyncActions/chat";
// import { fetchDialogs } from "../../store/reducers/dialogs";


export const DialogsList = ({ onOpen }) => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs.dialogs)

  useEffect(() => {
    if (dialogs && dialogs.length === 0) dispatch(fetchDialogs());
  }, [dispatch]);

  const renderDialogItem = ({ item }) => {
    return <DialogElement dialog={item} onOpen={onOpen} />;
  };

  // BUG: WITHOUT FILTERING FOR REAL DATA
  const sortedDialogs = [...dialogs.filter(d => d.last_message_date)]?.sort((a, b) => b?.last_message_date?.localeCompare(a?.last_message_date))

  return (
    <View style={styles.list}>
      <FlatList
        data={sortedDialogs}
        keyExtractor={(post) => post.id}
        renderItem={renderDialogItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  }
});
