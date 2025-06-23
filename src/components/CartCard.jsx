// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import Octicons from "react-native-vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function CartCard({ produto, onUpdate }) {
  // Função para atualizar quantidade
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
      <View style={styles.fullCard}>
        <Image
          source={{
            uri:
              produto.imagem ||
              produto.fotoVinho ||
              "https://i.imgur.com/default-avatar.png",
          }}
          style={{
            width: 80,
            height: 80,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 5,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "#E1D5C2", fontSize: 20 }}>
            {produto.nome}
          </Text>
          <Text style={{ color: "white", fontSize: 15 }}>
            {produto.categoria || "Vinho"}
          </Text>
          <Text style={{ color: "white", fontSize: 20 }}>
            R$ {produto.preco}
          </Text>
        </View>
        <View style={{ marginLeft: 10, alignItems: "flex-end" }}>
          <Pressable onPress={removerProduto}>
            <Octicons
              style={{ marginTop: 10 }}
              name="trash"
              size={18}
              color="white"
            />
          </Pressable>
          <View style={styles.quantitySelector}>
            <View style={styles.quantitySelectorBtn}>
              <Pressable onPress={() => updateQuantidade(-1)}>
                <Text style={{ color: "white" }}>-</Text>
              </Pressable>
              <Text style={{ color: "white" }}>
                {produto.quantidade || 1}
              </Text>
              <Pressable onPress={() => updateQuantidade(1)}>
                <Text style={{ color: "white" }}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBody: {
    width: "100%",
    flexDirection: "column",
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  fullCard: {
    width: "100%",
    flexDirection: "row",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    marginRight: 20,
  },
  quantitySelectorBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingLeft: 3,
    borderWidth: 1,
    borderColor: "white",
    width: 45,
    height: 25,
    borderRadius: 5,
  },
});
