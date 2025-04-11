// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";

export default function Banner() {
  return (
    <View style={styles.container}>
      <Image style={styles.bannerImg} source="https://picsum.photos/seed/696/3000/2000" />
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
    backgroundColor: "red",
    border: "1px solid blue"
  },
  bannerImg: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: 0,
    border: "1px solid white"
  },
  bannerTexts: {
    border: "1px solid black",
    width: "50%",
    margin: 20,
    gap: 10
  },
  conheca: {
    fontSize: 5
  },
  vinhoTinto: {
    fontSize: 20
  },
  desc: {
    fontSize: 10
  }
});
