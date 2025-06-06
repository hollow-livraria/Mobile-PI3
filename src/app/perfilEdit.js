import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";

import Footer from "../components/Footer";
import TextInputEdit from "../components/TextInputEdit";

import { Image } from "expo-image";
import Octicons from "@expo/vector-icons/Octicons";

import { useRouter } from "expo-router";

export default function perfilEdit() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.voltar}>
        <Pressable
          onPress={() => router.push("/perfil")}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}>
          <Octicons name="arrow-left" size={24} color="white" />
          <Text style={{ color: "white", marginBottom: 5 }}>Voltar</Text>
        </Pressable>
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
        <View style={styles.salvarBtn}>
          
          <Text>Salvar Alteração</Text>
        </View>
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
    backgroundColor: "#000002",
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
  salvarBtn: {
    width: "50%",
    height: 50,
    backgroundColor: "#E1D5C2",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
