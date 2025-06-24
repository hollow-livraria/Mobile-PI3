// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import Octicons from "react-native-vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartCard({ produto, onUpdate }) {
  const updateQuantidade = async (delta) => {
    const userStr = await AsyncStorage.getItem("user");
    if (!userStr) return;
    const userObj = JSON.parse(userStr);
    const cpf = userObj.cpf || userObj.user?.cpf;
    const cartKey = `cart:${cpf}`;
    let cart = [];
    const cartStr = await AsyncStorage.getItem(cartKey);
    if (cartStr) cart = JSON.parse(cartStr);
    const idx = cart.findIndex(
      (p) => String(p.idProduto || p.id) === String(produto.idProduto || produto.id)
    );
    if (idx !== -1) {
      cart[idx].quantidade = Math.max(1, (cart[idx].quantidade || 1) + delta);
      await AsyncStorage.setItem(cartKey, JSON.stringify(cart));
      onUpdate && onUpdate();
    }
  };

  // Função para remover produto
  const removerProduto = async () => {
    const userStr = await AsyncStorage.getItem("user");
    if (!userStr) return;
    const userObj = JSON.parse(userStr);
    const cpf = userObj.cpf || userObj.user?.cpf;
    const cartKey = `cart:${cpf}`;
    let cart = [];
    const cartStr = await AsyncStorage.getItem(cartKey);
    if (cartStr) cart = JSON.parse(cartStr);
    const novoCart = cart.filter(
      (p) => String(p.idProduto || p.id) !== String(produto.idProduto || produto.id)
    );
    await AsyncStorage.setItem(cartKey, JSON.stringify(novoCart));
    onUpdate && onUpdate();
  };

  return (
    <View style={styles.cardBody}>
      <Image
        source={{
          uri:
            produto.imagem ||
            produto.fotoVinho ||
            "https://i.imgur.com/default-avatar.png",
        }}
        style={styles.image}
      />
      <View style={styles.infoArea}>
        <Text
          style={styles.nome}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {produto.nome}
        </Text>
        <Text style={styles.categoria}>{produto.categoria || "Vinho"}</Text>
        <Text style={styles.preco}>R$ {produto.preco}</Text>
      </View>
      <View style={styles.rightArea}>
        <Pressable onPress={removerProduto}>
          <Octicons
            style={{ marginBottom: 10 }}
            name="trash"
            size={18}
            color="white"
          />
        </Pressable>
        <View style={styles.quantitySelector}>
          <Pressable onPress={() => updateQuantidade(-1)}>
            <Text style={styles.qtdBtn}>-</Text>
          </Pressable>
          <Text style={styles.qtdText}>{produto.quantidade || 1}</Text>
          <Pressable onPress={() => updateQuantidade(1)}>
            <Text style={styles.qtdBtn}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    width: "100%",
    minHeight: 80,
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 12,
    backgroundColor: "#444",
  },
  infoArea: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "70%",
    minWidth: 0, 
  },
  nome: {
    color: "#E1D5C2",
    fontSize: 16,
    marginBottom: 2,
    maxWidth: "100%",
  },
  categoria: {
    color: "white",
    fontSize: 14,
    marginBottom: 2,
  },
  preco: {
    color: "white",
    fontSize: 14,
  },
  rightArea: {
    width: 60,
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 60,
    marginLeft: 8,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtdBtn: {
    color: "white",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  qtdText: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 4,
    minWidth: 18,
    textAlign: "center",
  },
});
