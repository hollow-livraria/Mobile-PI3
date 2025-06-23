import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Footer from "../components/Footer";
import OrderConfirmationCard from "../components/orderConfirmationCard";

import Octicons from "@expo/vector-icons/Octicons";

import { useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function orderConfirmation() {
  const params = useLocalSearchParams();
  const produtos = params.produtos ? JSON.parse(params.produtos) : [];
  const total = Number(params.total) || 0;
  const frete = Number((total * 0.05).toFixed(2));
  const desconto = 0; // ajuste se quiser aplicar cupom
  const totalFinal = total + frete - desconto;

  const router = useRouter();

  const salvarHistorico = async () => {
    const userStr = await AsyncStorage.getItem("user");
    const userObj = JSON.parse(userStr);
    const cpf = userObj.cpf || userObj.user?.cpf;

    // Buscar endereços do usuário pelo CPF
    const res = await fetch(
      `https://192.168.0.10:8000/enderecos?usuarioCpf=${cpf}`
    );
    const data = await res.json();
    // Pegue o primeiro endereço (ou defina uma lógica para endereço principal)
    const enderecoPrincipal = data[0];

    const historicoKey = `historico:${cpf}`;
    const historicoStr = await AsyncStorage.getItem(historicoKey);
    let historico = historicoStr ? JSON.parse(historicoStr) : [];

    historico.push({
      data: new Date().toISOString(),
      produtos: produtos, // ou produtosNoCarrinho
      endereco: enderecoPrincipal, // Salve o objeto endereço completo!
    });

    await AsyncStorage.setItem(historicoKey, JSON.stringify(historico));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text
          style={{
            marginTop: 50,
            color: "white",
            fontSize: 25,
            alignSelf: "center",
          }}>
          Confirmação do pedido
        </Text>
        <View style={styles.envioBody}>
          <Text style={{ color: "#E1D5C2", fontSize: 20 }}>
            Envio para: São Sebastião, São Paulo
          </Text>
          <Text style={{ color: "white", fontSize: 12, marginTop: 20 }}>
            Frete Grátis
          </Text>
          <Text style={{ color: "white", fontSize: 12 }}>
            Entrega prevista para 07/07/2025 - 10/07/2025
          </Text>
        </View>
        <View style={styles.pedido}>
          <View style={styles.cartHeader}>
            <Text style={{ color: "#E1D5C2", fontSize: 20, marginBottom: 10 }}>
              Itens
            </Text>
            <Text style={{ color: "white", marginBottom: 10 }}>
              {produtos.length} items
            </Text>
          </View>
          <ScrollView
            style={{ maxHeight: 300 }}
            contentContainerStyle={{ width: 390 }}>
            {produtos.map((produto, idx) => (
              <OrderConfirmationCard key={idx} produto={produto} />
            ))}
          </ScrollView>
          <Text
            style={{
              marginTop: 30,
              marginLeft: 20,
              fontSize: 25,
              color: "white",
              alignSelf: "flex-start",
            }}>
            Cupom
          </Text>
          <View style={styles.cupomBody}>
            <Text
              style={{
                color: "grey",
                flex: 1,
                textAlign: "left",
                paddingLeft: 15,
              }}>
              CHIKAMSO-20-OFF
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                borderLeftWidth: 1,
                borderLeftColor: "grey",
                paddingRight: 15,
              }}>
              Aplicar
            </Text>
          </View>
          <View style={styles.prices}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={{ color: "white", fontSize: 20 }}>Subtotal</Text>
              <Text style={{ color: "white", fontSize: 20 }}>
                R$ {total.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={{ color: "white", fontSize: 20 }}>Frete</Text>
              <Text style={{ color: "white", fontSize: 20 }}>
                R$ {frete.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={{ color: "white", fontSize: 20 }}>Desconto</Text>
              <Text style={{ color: "white", fontSize: 20 }}>
                -R$ {desconto.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={{ color: "white", fontSize: 20 }}>Total</Text>
              <Text style={{ color: "white", fontSize: 20 }}>
                R$ {totalFinal.toFixed(2)}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={async () => {
              await salvarHistorico();
              router.push("/orderHistory");
            }}>
            <View style={styles.finalizar}>
              <Text>Finalizar</Text>
              <Octicons name="arrow-right" size={24} color="black" />
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000002",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 100,
  },
  envioBody: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    borderTopWidth: 2,
    borderTopColor: "white",
    marginTop: 20,
  },
  pedido: {
    width: "90%",
    backgroundColor: "#2E2E2E",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 15,
  },
  cartHeader: {
    marginTop: 15,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  cupomBody: {
    flexDirection: "row",
    width: "90%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 15,
    alignItems: "center",
  },
  prices: {
    width: "90%",
    flexDirection: "column",
    borderTopWidth: 1,
    borderTopColor: "white",
    marginTop: 20,
    paddingVertical: 20,
    gap: 10,
  },
  finalizar: {
    width: "100%",
    height: 50,
    backgroundColor: "#E1D5C2",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 20,
  },
});
