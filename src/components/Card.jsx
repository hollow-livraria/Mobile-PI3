// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, TextInput } from "react-native";
import { Image } from "expo-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Card() {
  return (
    <View style={styles.cardBody}>
      <Image
        source={require("../../assets/imgs/vinhoTest.png")}
        style={{ width: 100, height: 100, borderRadius: 5 }}
      />
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
  }
});
