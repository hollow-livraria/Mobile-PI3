import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Header from './src/components/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! teste</Text>
      <Text style={{ fontFamily: "Gilda Regular", fontWeight: 1000}}>Open up App example text bla bla bla TESTE</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
