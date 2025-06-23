// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function OrderConfirmationCard({ produto }) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            produto.imagem ||
            produto.fotoVinho ||
            "https://i.imgur.com/default-avatar.png",
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.quantidade}>Quantidade: {produto.quantidade || 1}</Text>
        <Text style={styles.preco}>R$ {produto.preco}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    width: "100%",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 12,
    backgroundColor: "#444",
  },
  info: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  nome: {
    color: "#E1D5C2",
    fontSize: 16,
    marginBottom: 2,
  },
  quantidade: {
    color: "white",
    fontSize: 14,
    marginBottom: 2,
  },
  preco: {
    color: "white",
    fontSize: 14,
  },
});
