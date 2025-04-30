import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";

import Header from "./src/components/Header";
import Banner from "./src/components/Banner";
import Card from "./src/components/Card";
import Footer from "./src/components/Footer";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Banner />

      {/* <View style={styles.galeria}>
        <Text style={styles.galeriaInfo}>Nossos produtos mais vendidos</Text>
        <View style={styles.galeriaCards}>
        </View>
      </View> */}
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
  galeria: {
    widht: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid yellow",
    marginTop: 200,
    gap: 20,
  },
  galeriaInfo: {
    fontSize: "18px",
    color: "white",
  },
  galeriaCards: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    border: "1px solid black",
    width: "85%",
  },
});
