import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import OrderCard from "../components/OrderCard";
import { Image } from "expo-image";

import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export default function orderHistory() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [historico, setHistorico] = useState([]);
  const [enderecos, setEnderecos] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndHistorico = async () => {
      try {
        const userStr = await AsyncStorage.getItem("user");
        if (userStr) {
          const userObj = JSON.parse(userStr);
          const dados = userObj.user ? userObj.user : userObj;
          setUser(dados);

          const cpf = dados.cpf;
          const historicoKey = `historico:${cpf}`;
          const historicoStr = await AsyncStorage.getItem(historicoKey);
          if (historicoStr) {
            const historicoArr = JSON.parse(historicoStr);
            setHistorico(historicoArr);

            const enderecosTemp = {};
            await Promise.all(
              historicoArr.map(async (pedido) => {
                if (pedido.idEndereco && !enderecosTemp[pedido.idEndereco]) {
                  try {
                    const res = await fetch(
                      `https://192.168.0.10:8000/endereco/${pedido.idEndereco}`
                    );
                    if (res.ok) {
                      const data = await res.json();
                      enderecosTemp[pedido.idEndereco] = data.endereco;
                    } else {
                      enderecosTemp[pedido.idEndereco] = null;
                    }
                  } catch {
                    enderecosTemp[pedido.idEndereco] = null;
                  }
                }
              })
            );
            setEnderecos(enderecosTemp);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar usuário ou histórico:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndHistorico();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8B5C2A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.perfilHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Image
            style={styles.avatar}
            source={user?.avatar || "https://i.imgur.com/default-avatar.png"}
          />
          <View style={{ marginTop: 20 }}>
            <Text style={styles.nomePerfil}>{user?.nome || "Usuário"}</Text>
          </View>
        </View>
      </View>
      <View style={styles.pedidos}>
        <Text style={{ color: "#E1D5C2", fontSize: 28 }}>
          Historico de pedidos
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 90 }}>
        {historico.length === 0 ? (
          <Text style={{ color: "white", marginTop: 30 }}>
            Nenhum pedido encontrado.
          </Text>
        ) : (
          historico
            .slice()
            .reverse()
            .map((pedido, idx) => (
              <View key={idx} style={styles.orderCardContainer}>
                <Text style={styles.orderDate}>
                  Pedido em {new Date(pedido.data).toLocaleString()}
                </Text>
                {pedido.produtos.map((produto, i) => (
                  <View key={i} style={styles.card}>
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
                      <Text style={styles.quantidade}>
                        Quantidade: {produto.quantidade || 1}
                      </Text>
                      <Text style={styles.preco}>R$ {produto.preco}</Text>
                    </View>
                  </View>
                ))}
                <Text
                  style={{
                    color: "#E1D5C2",
                    fontSize: 18,
                    marginTop: 10,
                    alignSelf: "flex-end",
                  }}>
                  Total da compra: R${" "}
                  {pedido.total ? Number(pedido.total).toFixed(2) : "0.00"}
                </Text>
              </View>
            ))
        )}
      </ScrollView>
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
  perfilHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 150,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 20,
    alignSelf: "left",
  },
  nomePerfil: {
    fontSize: 18,
    color: "white",
    marginLeft: 20,
  },
  pedidos: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 100,
    borderTopWidth: 2,
    borderTopColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    marginTop: 20,
    justifyContent: "center",
  },
  orderCardContainer: {
    width: "95%",
    backgroundColor: "#181818",
    borderRadius: 16,
    marginVertical: 18,
    padding: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  orderDate: {
    color: "#E1D5C2",
    fontSize: 16,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 18,
    backgroundColor: "#444",
  },
  info: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  nome: {
    color: "#E1D5C2",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  quantidade: {
    color: "white",
    fontSize: 16,
    marginBottom: 2,
  },
  preco: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  endereco: {
    color: "#E1D5C2",
    marginTop: 12,
    fontSize: 15,
    alignSelf: "flex-start",
  },
});
