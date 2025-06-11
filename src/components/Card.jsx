// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "expo-router";

export default function Card({ produto }) {
  const router = useRouter();
  return (
    <View style={styles.cardBody}>
      <Pressable onPress={() => router.push("/productDetails")}>
        <Image
          source={produto?.fotoVinho}
          style={{ width: 100, height: 100, borderRadius: 5 }}
        />
      </Pressable>
      <Text style={styles.title}>{produto?.nome || "Sem nome"}</Text>
      <Text style={styles.preco}>
        R$ {produto?.preco?.toFixed ? produto.preco.toFixed(2) : produto?.preco || "0,00"}
      </Text>
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
    justifyContent: "center",
  },
  bar: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    margin: 10,
  },
  title: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
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
