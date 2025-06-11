import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import Header from "../components/Header";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";

import Octicons from "@expo/vector-icons/Octicons";

import { useState, useEffect } from "react";

export default function vitrine() {

  const [selectedOrder, setSelectedOrder] = useState("mais-vendidos")

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

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('mais-vendidos');
    const [items, setItems] = useState([
      { label: 'Mais Vendidos', value: 'mais-vendidos' },
      { label: 'Menor Preço', value: 'menor-preco' },
      { label: 'Maior Preço', value: 'maior-preco' },
      { label: 'A-Z', value: 'az' },
      { label: 'Z-A', value: 'za' },
    ]);

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
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            backgroundColor: '#E1D5C2',
            borderRadius: 10,
            borderWidth: 0,
            minHeight: 38,
            width: 180,
            paddingHorizontal: 12,
            marginVertical: 8,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.10,
            shadowRadius: 4,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#E1D5C2',
            borderRadius: 10,
            borderWidth: 0,
            width: 180,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.10,
            shadowRadius: 4,
          }}
          textStyle={{
            color: '#222',
            fontWeight: 'bold',
            fontSize: 15,
            fontFamily: 'Gilda Display',
          }}
          labelStyle={{
            color: '#222',
            fontWeight: 'bold',
            fontSize: 15,
            fontFamily: 'Gilda Display',
          }}
          selectedItemLabelStyle={{
            color: '#8B5C2A',
            fontWeight: 'bold',
          }}
          listItemContainerStyle={{
            borderRadius: 8,
            marginVertical: 2,
            height: 32,
            minHeight: 32,
            justifyContent: "center"
          }}
          listItemLabelStyle={{
            fontSize: 15,
            paddingVertical: 2,
          }}
          arrowIconStyle={{
            tintColor: '#8B5C2A',
            width: 24,
            height: 24,
          }}
          placeholder="Ordenar por"
          showArrowIcon={true}
          showTickIcon={false}
          dropDownDirection="AUTO"
          zIndex={1000}
        />
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: 12}}>
          <Octicons name="filter" size={26} color="white" />
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
  dropdownFilter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E1D5C2",
    borderRadius: 5,
    paddingVertical: 8,
  },
  dropdownWrapper: {
    position: "relative",
    backgroundColor: "#E1D5C2",
    borderRadius: 8,
    overflow: "hidden",
    width: 200,
    height: 40,
    justifyContent: "center",
    marginRight: 10,
  },
  picker: {
    width: "100%",
    height: 40,
    color: "#000",
    backgroundColor: "transparent",
    paddingLeft: 10,
  },
  dropdownIcon: {
    position: "absolute",
    right: 10,
    top: 6,
    pointerEvents: "none",
  },
});
