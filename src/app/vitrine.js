import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Header from "../components/Header";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";

import Octicons from "@expo/vector-icons/Octicons";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.filtro}>
      <Octicons
        name="filter"
        size={30}
        color="white"
      />
      <Text style={styles.filtroText}>Filtro</Text>
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
  filtro: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  filtroText: {
    fontSize: "18px",
    color: "white",
    marginVertical: 20,
    marginLeft: 10,
  },
});