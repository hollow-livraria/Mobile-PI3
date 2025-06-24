import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function favoritos() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      setIsLoading(true);
      try {
        const userStr = await AsyncStorage.getItem("user");
        if (!userStr) return setProdutos([]);
        const userObj = JSON.parse(userStr);                   //pega o user
        const cpf = userObj.cpf || userObj.user?.cpf;

        const favRes = await fetch("https://localhost:8000/favoritos");
        const favData = await favRes.json();                              //olha os favoritos
        const favoritos = favData.favoritos || [];

        const meusFavoritos = favoritos.filter((f) => f.usuarioCpf === cpf);  //pega so os fav do user

        const prodRes = await fetch("https://localhost:8000/produtos/");
        const prodData = await prodRes.json();                            //pega todos produtos            
        const todosProdutos = prodData.produtos || [];

        const produtosFavoritos = todosProdutos.filter((prod) =>
          meusFavoritos.some(                                                       //pega os produtos que sao favoritos do user
            (fav) => String(fav.idProduto) === String(prod.idProduto || prod.id)
          )
        );

        setProdutos(produtosFavoritos);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        setProdutos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.favoritos}>
        <Text style={{ fontSize: 25, color: "white" }}>Favoritos</Text>
      </View>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 100, 
        }}
      >
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
