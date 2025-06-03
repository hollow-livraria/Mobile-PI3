import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import CartCard from "../components/CartCard";

//            <Octicons name="trash" size={24} color="black" /> lixeira

export default function carrinho() {
  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <Text style={{ color: "white", fontSize: 20 }}>Carrinho</Text>
        <Text style={{ color: "white" }}>3 items</Text>
      </View>
      <ScrollView style={styles.cartHolder}>
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
      </ScrollView>
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
  cartHeader: {
    marginTop: 50,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  cartHolder: {
    width: "90%",
    height: "10%",
    flexDirection: "column",
    backgroundColor: "#20232A",
  },
});
