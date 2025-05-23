import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Header from "../components/Header";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.favoritos}>
        <Text style={{fontSize: 25, color: "white"}}>Favoritos</Text>
      </View>
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
  favoritos: {
    width: "100%",
    height: 100,
    border: "1px solid white",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
});
