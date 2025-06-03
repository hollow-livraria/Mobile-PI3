import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Galeria from "../components/Galeria";
import Footer from "../components/Footer";

import Octicons from "@expo/vector-icons/Octicons";

export default function carrinho() {
  return (
    <View style={styles.container}>
        <View>
            <Text style={{color: "white", marginTop: 100}}>Carrinho</Text>
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
});