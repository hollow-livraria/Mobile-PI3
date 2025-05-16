import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import { Image } from "expo-image";
import { icon } from "@fortawesome/fontawesome-svg-core";

import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function perfil() {
  return (
    <View style={styles.container}>
      <View style={styles.perfilHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Image
            style={styles.icon}
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
          }}
        >
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
        <Text
          style={{
            color: "white",
            marginLeft: 20,
            marginTop: 20,
            fontSize: 20,
          }}
        >
          Meus Pedidos
        </Text>
        <Text style={{ color: "white", marginLeft: 20, fontSize: 12 }}>
          Ver todos os pedidos
        </Text>
        <View style={styles.pedidosIcons}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="wallet-outline" size={40} color="white" />
            <Text style={{ color: "white", fontSize: "12" }}>A pagar</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Feather name="box" size={40} color="white" />
            <Text style={{ color: "white", fontSize: "12" }}>A preparar</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="car-outline" size={40} color="white" />
            <Text style={{ color: "white", fontSize: "12" }}>A caminho</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="star-outline" size={40} color="white" />
            <Text style={{ color: "white", fontSize: "12" }}>A avaliar</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={{marginTop: 20, color: "white"}}>oi</Text>
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
  perfilHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 150,
  },
  icon: {
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
    height: 150,
    border: "1px solid white",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  pedidosIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginTop: 20,
  },
});
