import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function favoritos() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:8000/produtos/")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        return response.json();
      })
      .then((data) => {
        if (data.produtos) setProdutos(data.produtos);
      })
      .catch((error) => console.error("Erro:", error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.favoritos}>
        <Text style={{ fontSize: 25, color: "white" }}>Favoritos</Text>
      </View>
      <Galeria produtos={produtos} loading={isLoading} />
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
  favoritos: {
    width: "100%",
    height: 120,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
});
