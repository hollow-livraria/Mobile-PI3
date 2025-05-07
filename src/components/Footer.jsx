// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                            じしˍ,)ノ

import { View, StyleSheet, Text, TextInput } from "react-native";
import { Image } from "expo-image";
import Entypo from "@expo/vector-icons/Entypo";

export default function Footer() {
  return (
    <View style={styles.container}>
            <Image style={styles.home} source={require("../../assets/imgs/home.png")} />
            <Image style={styles.favoritos} source={require("../../assets/imgs/favorites.png")} />
            <Image style={styles.carrinho} source={require("../../assets/imgs/cart.png")} />
            <Image style={styles.conta} source={require("../../assets/imgs/account.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 50,
    justifyContent: "center",
    height: 70,
    width: "100%",
    backgroundColor: "#000002",
    padding: 15,
    position: "absolute",
    bottom:-1,
    boxShadow: "0px -2px 10px rgba(255, 255, 255, 0.20)",
    borderTopWidth: 1,
  },
  home: {
    width: 40,
    height: 40,
  },
  favoritos: {
    width: 70,
    height: 45,
  },
  carrinho: {
    width: 40,
    height: 40,
  },
  conta: {
    width: 40,
    height: 40,
  }
});
