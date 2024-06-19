import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { DialogsScreen } from "../screens/DialogsScreen";
import { ChatScreen } from "../screens/ChatScreen";
import { AuthScreen } from "../screens/AuthScreen";
import { chatScreenOptions } from "../screenOptions/chatScreenOptions";
import { fetchAuth } from "../store/asyncActions/auth";

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(fetchAuth());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuth ? (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Dialogs"
              component={DialogsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={chatScreenOptions}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
