// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                            じしˍ,)ノ

import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export default function Banner() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/vitrine")}>
        <ImageBackground
          style={styles.bannerImg}
          source={require("../../assets/imgs/vinho_tinto.png")}>
          <View style={styles.bannerTexts}>
            <Text style={styles.conheca}>Conheça Nossos:</Text>
            <Text style={styles.vinhoTinto}>Vinhos Tintos</Text>
            <Text style={styles.desc}>
              Intensos, encorpados e repletos de aromas marcantes, os vinhos
              tintos brasileiros são perfeitos para quem aprecia sabor e
              tradição.{" "}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
  },
  bannerImg: {
    height: 200,
    width: "100%",
  },
  bannerTexts: {
    width: "50%",
    margin: 20,
    gap: 10,
  },
  conheca: {
    fontSize: 12,
    color: "white",
  },
  vinhoTinto: {
    fontSize: 25,
    color: "white",
  },
  desc: {
    fontSize: 15,
    color: "white",
  },
});
