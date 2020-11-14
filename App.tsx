import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { setConsole } from 'react-query';
import List from './components/List';

LogBox.ignoreLogs(['Setting a timer']);

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <List />
      </SafeAreaView>
    </PaperProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: StatusBar.currentHeight || 0,
  },
});
