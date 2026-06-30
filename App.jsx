import { StatusBar, StyleSheet, Text, useColorScheme, } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { StackNavigation } from "./navigation"
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler"
function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StackNavigation /> 
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
