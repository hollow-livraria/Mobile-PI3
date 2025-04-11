// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                            じしˍ,)ノ

import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";

export default function Banner() {
  return (
    <View style={styles.container}>
      <Image style={styles.bannerImg} source="../assets/imgs/vinho_tinto.png" />
      <View style={styles.bannerTexts}>
        <Text style={styles.conheca}>Conheça Nossos:</Text>
        <Text style={styles.vinhoTinto}>Vinhos Tintos</Text>
        <Text style={styles.desc}>Intensos, encorpados e repletos de aromas marcantes, os vinhos tintos brasileiros são perfeitos para quem aprecia sabor e tradição. </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: 120,
  },
  bannerImg: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: 0,
  },
  bannerTexts: {
    width: "50%",
    margin: 20,
    gap: 10
  },
  conheca: {
    fontSize: 12,
    color: "white"
  },
  vinhoTinto: {
    fontSize: 25,
    color: "white"

  },
  desc: {
    fontSize: 15,
    color: "white"

  }
});
