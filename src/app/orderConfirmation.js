import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

import Footer from "../components/Footer";
import OrderConfirmationCard from "../components/orderConfirmationCard";

import Octicons from "@expo/vector-icons/Octicons";

import { useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://localhost:8000/cupom";

export default function orderConfirmation() {
  const params = useLocalSearchParams();
  const produtos = params.produtos ? JSON.parse(params.produtos) : [];
  const total = Number(params.total) || 0;
  const frete = Number((total * 0.05).toFixed(2));

  const router = useRouter();

  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [cupomInfo, setCupomInfo] = useState(null);
  const [cupomErro, setCupomErro] = useState(null);

  const totalFinal = total + frete - desconto;

  const salvarHistorico = async () => {
    const userStr = await AsyncStorage.getItem("user");
    const userObj = JSON.parse(userStr);
    const cpf = userObj.cpf || userObj.user?.cpf;

    const historicoKey = `historico:${cpf}`;
    const historicoStr = await AsyncStorage.getItem(historicoKey);
    let historico = historicoStr ? JSON.parse(historicoStr) : [];

    historico.push({
      data: new Date().toISOString(),
      produtos: produtos, //novos pedidos vao pra baixo da lista
      total: totalFinal,
    });

    if (historico.length > 3) {
      historico = historico.slice(-3); //deixa 3 pedido só, pra nao encher mt o historico
    }

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
            Entrega prevista para 27/06/2025 - 03/07/2025
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
            contentContainerStyle={{ width: 385, gap: 10 }}>
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
            <TextInput
              style={{
                color: "black",
                flex: 1,
                paddingLeft: 15,
                backgroundColor: "white",
                borderRadius: 15,
                height: 40,
              }}
              placeholder="Digite seu cupom"
              value={cupom}
              onChangeText={setCupom}
              autoCapitalize="characters"
            />
            <Pressable
              style={{
                flex: 1,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderLeftWidth: 1,
                borderLeftColor: "grey",
                backgroundColor: "white",
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              }}
              disabled={!cupom.trim()}
              onPress={async () => {
                setCupomErro("");
                setDesconto(0);
                setCupomInfo(null);
                if (!cupom.trim()) return;
                try {
                  const res = await fetch(BACKEND_URL);
                  if (!res.ok) throw new Error("Falha ao validar cupom");
                  const data = await res.json();
                  const validCoupon = Array.isArray(data.cupons)
                    ? data.cupons.find(
                        (c) =>
                          c.codigo?.toLowerCase() === cupom.trim().toLowerCase()
                      )
                    : null;
                  if (validCoupon) {
                    setCupomInfo(validCoupon);
                    const descontoValor =
                      total * ((validCoupon.desconto || 0) / 100);
                    setDesconto(descontoValor);
                  } else {
                    setDesconto(0);
                    setCupomErro("Cupom inválido");
                  }
                } catch (err) {
                  setCupomErro("Erro ao validar cupom");
                }
              }}>
              <Text
                style={{
                  color: "#3B2C1A",
                  fontWeight: "bold",
                  opacity: !cupom.trim() ? 0.5 : 1,
                }}>
                Aplicar
              </Text>
            </Pressable>
          </View>
          {cupomErro ? (
            <Text style={{ color: "red", marginLeft: 20, marginTop: 5 }}>
              {cupomErro}
            </Text>
          ) : null}
          {desconto > 0 && (
            <Text style={{ color: "#E1D5C2", marginLeft: 20, marginTop: 5 }}>
              Cupom aplicado: {cupomInfo?.codigo} (-{cupomInfo?.desconto || 0}%)
            </Text>
          )}
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
              if (!produtos || produtos.length === 0) {
                alert("Não há produtos no pedido!");
                return;
              }
              await salvarHistorico();
              // Limpa o carrinho do usuário após finalizar o pedido
              const userStr = await AsyncStorage.getItem("user");
              const userObj = JSON.parse(userStr);
              const cpf = userObj.cpf || userObj.user?.cpf;
              const cartKey = `cart:${cpf}`;
              await AsyncStorage.removeItem(cartKey);
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
