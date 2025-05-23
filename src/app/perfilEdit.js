import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";

import Footer from "../components/Footer";
import TextInputEdit from "../components/TextInputEdit";

import { Image } from "expo-image";
import Octicons from "@expo/vector-icons/Octicons";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.voltar}>
        <Octicons name="arrow-left" size={24} color="white" />
        <Text style={{ color: "white", marginBottom: 5 }}>Voltar</Text>
      </View>
      <View>
        <Image
          style={styles.avatar}
          source={"https://github.com/hollow-livraria.png"}
        />
        <Text style={{ marginVertical: 20, color: "white" }}>
          editar avatar
        </Text>
      </View>

      <View style={styles.dadosEditar}>
        <Text style={{ color: "#E1D5C2", fontSize: 18, marginBottom: 20 }}>
          Altere seus dados:
        </Text>
        <TextInputEdit info="nome:" />
        <TextInputEdit info="email:" />
        <TextInputEdit info="senha:" />
        <TextInputEdit info="repetir senha:" />
        <TextInputEdit info="data de nascimento:" />
        <TextInputEdit info="cidade:" />
        <TextInputEdit info="endereço:" />
        <TextInputEdit info="cep:" />
        <TextInputEdit info="telefone:" />
      </View>

      <Footer />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    paddingBottom: 30, 
  },
  voltar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginLeft: 40,
    marginTop: 60,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  dadosEditar: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#20232A",
    marginBottom: 100,
  },
});
