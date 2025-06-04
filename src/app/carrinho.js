import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import CartCard from "../components/CartCard";

export default function carrinho() {
  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <Text style={{ color: "#E1D5C2", fontSize: 20, marginBottom: 10 }}>
          Carrinho
        </Text>
        <Text style={{ color: "white", marginBottom: 10 }}>3 items</Text>
      </View>
      <ScrollView
        style={styles.cartHolder}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
      </ScrollView>
      <Text style={{color: "#E1D5C2", marginTop: 20, marginLeft: 35, fontSize: 18, alignSelf: "flex-start"}}>A escolha certa para o seu paladar!</Text>
      <Galeria />
      <View style={styles.buyBody}>
        <View style={{backgroundColor: "white", width: "60%", height: 130, alignItems: "center"}}>
          <Text style={{fontSize: 25, marginTop: 10}}>R$ 1.500</Text>
        </View>
        <View style={{backgroundColor: "#20232A", width: "40%", height: 130, alignItems: "center"}}>
          <Text style={{color: "#E1D5C2", fontSize: 20, marginTop: 10}}>Finalizar (3)</Text>
        </View>
      </View>
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
    marginTop: 30,
    maxHeight: 330,
    flexDirection: "column",
    backgroundColor: "#20232A",
  },
  buyBody:{
    width: "100%",
    height: 20,
    marginTop: 20,
    marginBottom: 35,
    flexDirection: "row",
  }
});
