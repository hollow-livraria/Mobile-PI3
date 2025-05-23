// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                            じしˍ,)ノ

import { View, StyleSheet, Pressable } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

import { useRouter } from "expo-router";

export default function Footer() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Octicons name="home" size={35} color="white" />
      <Octicons name="heart" size={35} color="white" />
      <Feather name="shopping-cart" size={35} color="white" />
      <Pressable onPress={() => router.push("/perfil")}>
        <Octicons name="person" size={40} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    width: "100%",
    backgroundColor: "#000002",
    padding: 15,
    boxShadow: "0px -2px 10px rgba(255, 255, 255, 0.20)",
    borderTopWidth: 1,
  },
});
