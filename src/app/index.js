import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Header from "../components/Header";
import Banner from "../components/Banner";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function App() {
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
      <Header />
      <Banner />
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 100, // ajuste conforme a altura do seu Footer
        }}>
        <Text style={styles.galeriaInfo}>Nossos produtos mais vendidos</Text>
        <Galeria produtos={produtos} loading={isLoading} />
      </ScrollView>
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
    alignItems: "center",
  },
  galeriaInfo: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },
});
