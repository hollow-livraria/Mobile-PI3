// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, TextInput } from "react-native";
import { Image } from "expo-image";

export default function Comment() {
  return (
    <View style={styles.cardBody}>
      <View style={styles.perfil}>
        <Image
          source={"https://github.com/hollow-livraria.png"}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
        <View>
        <Text>Livraria</Text>
        <Text>07/07/2004</Text>
        </View>
      </View>
      <View style={styles.comment}>
        <Text>O Sacramentos Sabina Syrah foi uma grata surpresa! Achei o vinho bem equilibrado, com um aroma agradável de frutas vermelhas e um toque leve de especiarias. O sabor é suave, mas com boa estrutura, ideal para quem gosta de vinhos que não sejam muito pesados. Para o preço, é uma excelente escolha, especialmente para acompanhar carnes assadas ou queijos.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 100,
    width: "90%",
    backgroundColor: "#EAE5E1",
    padding: 20,
    borderRadius: 5,
  },
  perfil: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
});
