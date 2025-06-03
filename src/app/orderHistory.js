import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import Footer from "../components/Footer";
import OrderCard from "../components/OrderCard";
import { Image } from "expo-image";

import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";

export default function orderHistory  () {
  return (
    <View style={styles.container}>
      <View style={styles.perfilHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Image
            style={styles.avatar}
            source={"https://github.com/hollow-livraria.png"}
          />
          <View style={{ marginTop: 20 }}>
            <Text style={styles.nomePerfil}>Livraria</Text>
            <Pressable style={styles.editBtn} onPress={() => alert("Cliquei")}>
              <Text style={styles.editText}>Editar perfil</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 20,
          }}>
          <Octicons
            name="heart"
            size={25}
            color="white"
            style={{ marginRight: 15 }}
          />
          <Feather name="shopping-cart" size={25} color="white" />
        </View>
      </View>
      <View style={styles.pedidos}>
        <Text style={{ color: "#E1D5C2", fontSize: 28 }}>
          Historico de pedidos
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 90 }}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </ScrollView>

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
  perfilHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 150,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 20,
    alignSelf: "left",
  },
  nomePerfil: {
    fontSize: "18px",
    color: "white",
    marginLeft: 20,
  },
  editBtn: {
    backgroundColor: "#313131",
    width: 100,
    height: 30,
    marginLeft: 20,
    marginTop: 10,
  },
  editText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  pedidos: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 100,
    border: "1px solid white",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    padding: 10,
    marginTop: 20,
    justifyContent: "center",
  },
});
