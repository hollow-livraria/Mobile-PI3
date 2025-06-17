import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import { Image } from "expo-image";

import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter } from "expo-router";

export default function perfil() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os dados do usuário salvos no AsyncStorage após o login
    const fetchUser = async () => {
      try {
        const userStr = await AsyncStorage.getItem("user");
        const cadastrosStr = await AsyncStorage.getItem("cadastros");
        if (userStr && cadastrosStr) {
          const user = JSON.parse(userStr);
          const cadastros = JSON.parse(cadastrosStr);
          const cadastro = cadastros.find((c) => c.email === user.email);
          if (cadastro) {
            setUser(cadastro);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar usuário/cadastro:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8B5C2A" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Não foi possível carregar os dados do perfil.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.perfilHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Image
            style={styles.avatar}
            source={user.avatar || "https://i.imgur.com/default-avatar.png"}
          />
          <View style={{ marginTop: 20 }}>
            <Text style={styles.nomePerfil}>{user.nome}</Text>
            <Pressable
              style={styles.editBtn}
              onPress={() => router.push("/perfilEdit")}
            >
              <Text style={styles.editText}>Editar perfil</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <Pressable onPress={() => router.push("/favoritos")}>
            <Octicons
              name="heart"
              size={25}
              color="white"
              style={{ marginRight: 15 }}
            />
          </Pressable>
          <Pressable onPress={() => router.push("/carrinho")}>
            <Feather name="shopping-cart" size={25} color="white" />
          </Pressable>
        </View>
      </View>
      <View style={styles.pedidos}>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          Meus Pedidos
        </Text>
        <Text
          style={{
            color: "white",
            marginBottom: 15,
            marginLeft: 10,
            fontSize: 10,
          }}
        >
          Ver todos os pedidos
        </Text>
        <View style={styles.pedidosIcons}>
          <View style={styles.icon}>
            <Ionicons name="wallet-outline" size={40} color="white" />
            <Text style={{ color: "white", fontSize: "12" }}>A pagar</Text>
          </View>
          <View style={styles.icon}>
            <Feather name="box" size={40} color="white" />
            <Text style={{ color: "white", fontSize: "12" }}>A preparar</Text>
          </View>
          <View style={styles.icon}>
            <Ionicons name="car-outline" size={40} color="white" />
            <Text style={{ color: "white", fontSize: "12" }}>A caminho</Text>
          </View>
          <View style={styles.icon}>
            <Ionicons name="star-outline" size={40} color="white" />
            <Text style={{ color: "white", fontSize: "12" }}>A avaliar</Text>
          </View>
        </View>
      </View>
      <View style={styles.abaAjuda}>
        <Text style={{ color: "white", textDecoration: "underline" }}>
          Central de ajuda
        </Text>
        <Text style={{ color: "white", textDecoration: "underline" }}>
          Sobre nós
        </Text>
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          marginTop: 50,
          marginRight: 50,
          alignSelf: "center",
        }}
      >
        A escolha certa para o seu paladar!
      </Text>
      <View
        style={{
          width: "100%",
          flex: 1,
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        <Galeria />
      </View>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000002",
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
    fontSize: "18px",
    color: "white",
    marginLeft: 20,
  },
  editBtn: {
    backgroundColor: "#313131",
    width: 100,
    height: 30,
    marginLeft: 20,
    marginTop: 10,
  },
  editText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  pedidos: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 150,
    borderTopWidth: 1,
    borderTopColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 10,
  },
  pedidosIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  abaAjuda: {
    flexDirection: "column",
    paddingTop: 30,
    paddingLeft: 30,
    gap: 10,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
