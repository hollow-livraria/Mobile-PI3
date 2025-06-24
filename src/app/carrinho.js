import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import CartCard from "../components/CartCard";

export default function carrinho() {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    const userStr = await AsyncStorage.getItem("user");
    if (!userStr) return setProdutos([]);
    const userObj = JSON.parse(userStr);
    const cpf = userObj.cpf || userObj.user?.cpf;
    const cartKey = `cart:${cpf}`;
    const cartStr = await AsyncStorage.getItem(cartKey);
    let cart = [];
    if (cartStr) cart = JSON.parse(cartStr);
    setProdutos(cart);
    // Calcula total
    let soma = 0;
    cart.forEach((p) => {
      const preco = Number(p.preco) || 0;
      const qtd = Number(p.quantidade) || 1;
      soma += preco * qtd;
    });
    setTotal(soma);
  };
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <Text style={{ color: "#E1D5C2", fontSize: 20, marginBottom: 10 }}>
          Carrinho
        </Text>
        <Text
          style={{
            color: "white",
            marginBottom: 10,
          }}>{`${produtos.length} items`}</Text>
      </View>
      <ScrollView
        style={styles.cartHolder}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        {produtos.length === 0 ? (
          <Text style={{ color: "white", alignSelf: "center", marginTop: 30 }}>
            Seu carrinho está vazio.
          </Text>
        ) : (
          produtos.map((produto, index) => (
            <CartCard key={index} produto={produto} onUpdate={fetchCart} />
          ))
        )}
      </ScrollView>
      <Text
        style={{
          color: "#E1D5C2",
          marginTop: 20,
          marginLeft: 35,
          fontSize: 18,
          alignSelf: "flex-start",
        }}>
        A escolha certa para o seu paladar!
      </Text>
      {/* Botão de finalizar com total */}
      <TouchableOpacity
        style={{
          backgroundColor: "#E1D5C2",
          borderRadius: 8,
          paddingVertical: 18,
          paddingHorizontal: 30,
          alignSelf: "center",
          marginVertical: 20,
        }}
        onPress={() =>
          router.push({
            pathname: "/orderConfirmation",
            params: {
              produtos: JSON.stringify(produtos),
              total: total, // <-- assim!
            },
          })
        }>
        <Text style={{ color: "#3B2C1A", fontWeight: "bold", fontSize: 18 }}>
          Finalizar compra (Total: R$ {total.toFixed(2)})
        </Text>
      </TouchableOpacity>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000002",
    alignItems: "center",
  },
  cartHeader: {
    marginTop: 50,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  cartHolder: {
    width: "90%",
    marginTop: 30,
    maxHeight: 330,
    flexDirection: "column",
    backgroundColor: "#20232A",
  },
  buyBody: {
    width: "100%",
    height: 20,
    marginTop: 20,
    marginBottom: 35,
    flexDirection: "row",
  },
});
