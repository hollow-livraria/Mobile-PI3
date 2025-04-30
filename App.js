import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";

import Header from "./src/components/Header";
import Banner from "./src/components/Banner";
import Card from "./src/components/Card";
import Galeria from "./src/components/Galeria";
import Footer from "./src/components/Footer";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Banner />
      <Galeria />
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
});
