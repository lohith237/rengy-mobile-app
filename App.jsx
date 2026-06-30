import { StatusBar, StyleSheet, Text, useColorScheme, } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { StackNavigation } from "./navigation"
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from "react-native-gesture-handler"
import  {store,persistor } from "./redux/store"
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StackNavigation /> 
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
    </PersistGate>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
