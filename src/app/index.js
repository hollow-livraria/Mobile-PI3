import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Header from "../components/Header";
import Banner from "../components/Banner";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";



export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Banner />
      <Text style={styles.galeriaInfo}>Nossos produtos mais vendidos</Text>
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
  galeriaInfo: {
    fontSize: "18px",
    color: "white",
    marginTop: 20,
  },
});
