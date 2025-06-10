import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Galeria from "../components/Galeria";
import Footer from "../components/Footer";

export default function favoritos() {
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
    backgroundColor: "#000002",
    alignItems: "center",
  },
  favoritos: {
    width: "100%",
    height: 120,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
});
