import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import { bootstrap } from "./src/bootstrap";
import { store } from "./src/store";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { useFonts } from "expo-font";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    'segoe-ui': require('./assets/fonts/Segoe-UI.ttf'),
    'segoe-ui-bold': require('./assets/fonts/Segoe-UI-Bold.ttf'),
  })

  if (!isLoading && !fontsLoaded) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsLoading(true)}
        onError={(e) => console.error(e)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
