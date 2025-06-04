// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "expo-router";

export default function Card() {
    const router = useRouter();
  return (
    <View style={styles.cardBody}>
      <Pressable onPress={() => router.push("/productDetails")}>
        <Image
          source={require("../../assets/imgs/vinho_teste.png")}
          style={{ width: 100, height: 100, borderRadius: 5 }}
        />
      </Pressable>

      <View style={styles.bar}></View>
      <Text style={styles.title}>vinho muito legal</Text>
      <View style={styles.compra}>
        <Text>R$ 10,00</Text>
        <FontAwesomeIcon icon={faPlus} style={styles.add} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 200,
    width: 170,
    backgroundColor: "#EAE5E1",
    padding: 20,
    borderRadius: 5,
  },
  bar: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    margin: 10,
  },
  title: {
    fontSize: 15,
  },
  compra: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  add: {
    marginTop: 5,
  },
});
