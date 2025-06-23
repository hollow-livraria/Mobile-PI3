import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import Header from "../components/Header";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";

import Octicons from "@expo/vector-icons/Octicons";
import { useState, useEffect } from "react";

export default function vitrine() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(""); // Estado inicial sem filtro
  const [items, setItems] = useState([
    { label: "Menor Preço", value: "menor-preco" },
    { label: "Maior Preço", value: "maior-preco" },
    { label: "A-Z", value: "az" },
    { label: "Z-A", value: "za" },
  ]);

  useEffect(() => {
    fetch("https://localhost:8000/produtos/")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        return response.json();
      })
      .then((data) => {
        if (data.produtos) {
          setProdutos(data.produtos);
          setProdutosFiltrados(data.produtos);
        }
      })
      .catch((error) => console.error("Erro:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // Ordenação baseada no dropdown
  useEffect(() => {
    let ordenados = [...produtos];
    switch (value) {
      case "menor-preco":
        ordenados.sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
        break;
      case "maior-preco":
        ordenados.sort((a, b) => parseFloat(b.preco) - parseFloat(a.preco));
        break;
      case "az":
        ordenados.sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
        break;
      case "za":
        ordenados.sort((a, b) => (b.nome || "").localeCompare(a.nome || ""));
        break;
      default:
        // Sem filtro: mostra todos os produtos na ordem original
        break;
    }
    setProdutosFiltrados(ordenados);
  }, [value, produtos]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 100,
        }}>
        <View style={styles.filtro}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              backgroundColor: "#E1D5C2",
              borderRadius: 10,
              borderWidth: 0,
              minHeight: 38,
              width: 180,
              paddingHorizontal: 12,
              marginVertical: 8,
              elevation: 4,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
            dropDownContainerStyle={{
              backgroundColor: "#E1D5C2",
              borderRadius: 10,
              borderWidth: 0,
              width: 180,
              elevation: 4,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
            textStyle={{
              color: "#222",
              fontWeight: "bold",
              fontSize: 15,
              fontFamily: "Gilda Display",
            }}
            labelStyle={{
              color: "#222",
              fontWeight: "bold",
              fontSize: 15,
              fontFamily: "Gilda Display",
            }}
            selectedItemLabelStyle={{
              color: "#8B5C2A",
              fontWeight: "bold",
            }}
            listItemContainerStyle={{
              borderRadius: 8,
              marginVertical: 2,
              height: 32,
              minHeight: 32,
              justifyContent: "center",
            }}
            listItemLabelStyle={{
              fontSize: 15,
              paddingVertical: 2,
            }}
            arrowIconStyle={{
              tintColor: "#8B5C2A",
              width: 24,
              height: 24,
            }}
            placeholder="Ordenar por"
            showArrowIcon={true}
            showTickIcon={false}
            dropDownDirection="AUTO"
            zIndex={1000}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 12,
            }}>
            <Octicons name="filter" size={26} color="white" />
            <Text style={styles.filtroText}>Filtro</Text>
          </View>
        </View>
        <View style={styles.galeriaWrapper}>
          <Galeria produtos={produtosFiltrados} />
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
    flexDirection: "column",
    backgroundColor: "#000002",
    alignItems: "center",
  },
  filtro: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    position: "relative",
    zIndex: 1000,
  },
  filtroText: {
    fontSize: 18,
    color: "white",
    marginLeft: 8,
  },
  galeriaWrapper: {
    width: "100%",
    // Remova flex: 1 e overflow: "hidden"
  },
});
