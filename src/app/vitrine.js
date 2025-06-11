import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Header from "../components/Header";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";

import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useState, useEffect } from "react";

export default function vitrine() {

   const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [sortType, setSortType] = useState('default');
    // const [filtrosAtivos, setFiltrosAtivos] = useState({
      
    //     categoria: [],
    //     classificacao: [],
    //     preco: [],
    //     regiao: []
    // });

    useEffect(() => {
        fetch("https://localhost:8000/produtos/")
            .then((response) => {
                if (!response.ok) throw new Error("Erro ao buscar produtos");
                return response.json();
            })
            .then((data) => {
              console.log(data);
              console.log(data.produtos[4].nome)
                if (data.produtos) {
                    setProdutos(data.produtos);
                    setProdutosFiltrados(data.produtos);
                }
            })
            .catch((error) => console.error("Erro:", error))
            .finally(() => setIsLoading(false));
    }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.filtro}>
        <View style={styles.dropdownFilter}>
          <Text> Ordenar por: Mais Vendidos</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Octicons name="filter" size={30} color="white" />
          <Text style={styles.filtroText}>Filtro</Text>
        </View>
      </View>
      <Galeria produtos={produtosFiltrados} />
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
  filtro: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 80,
    width: "100%",
  },
  filtroText: {
    fontSize: "18px",
    color: "white",
    marginVertical: 20,
    marginLeft: 10,
  },
  dropdownFilter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E1D5C2",
    borderRadius: 5,
    paddingVertical: 8,
  },
});
