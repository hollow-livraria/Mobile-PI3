import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

import Header from "../components/Header";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";

import { Image } from "expo-image";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.imageHolder}>
        <Image
          source={require("../../assets/imgs/vinho_teste.png")}
          style={{ width: 280, height: 280, borderRadius: 5 }}
        />
      </View>
      <View style={styles.information}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 200,
            border: "1px solid white",
            width: "100%",
            padding: 10,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderTopColor: "transparent",
            borderBottomColor: "white",
          }}
        >
          <Text style={{ color: "#E1D5C2", fontSize: 20 }}>R$3,000</Text>
          <Text style={{ color: "white", fontSize: 18 }}>900ml</Text>
        </View>
        <Text style={{ color: "white", fontSize: 15, marginTop: "20px" }}>
          Vinho tinto muito raro e gostoso slk
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: "40px",
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Quantidade</Text>
          <View style={styles.quantitySelector}>
            <Pressable onPress={() => alert("Decrementar quantidade")}>
              <Text style={{ color: "white" }}>-</Text>
            </Pressable>
            <Text style={{ color: "white" }}>1</Text>
            <Pressable onPress={() => alert("Incrementar quantidade")}>
              <Text style={{ color: "white" }}>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.envioBody}>
            <Text style={{color: "#E1D5C2"}}>Envio para: Carguatatuba, São Paulo</Text>
            <Text style={{color: "white"}}>Frete gratis</Text>
            <Text style={{color: "white"}}>Entrega prevista para 07/07/2004 - 14/07/2004</Text>
        </View>
        <View style={styles.compraSegura}>
          <Text style={{color: "#E1D5C2"}}>Compra Segura</Text>
          <View style={{display: "flex", flexDirection: "row", gap: 10, marginTop: 10}}>
            <View>
                <Text style={{color: "white"}}>{`\u2022`}Pagamento seguro</Text>
                <Text style={{color: "white"}}>{`\u2022`}Atendimento ao cliente</Text>
            </View>
            <View>
                <Text style={{color: "white"}}>{`\u2022`}Logistica segura</Text>
                <Text style={{color: "white"}}>{`\u2022`}Proteção de privacidade</Text>
            </View>
          </View>
        </View>
      </View>
      <Galeria />
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
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
  imageHolder: {
    width: "100%",
    height: 300,
    backgroundColor: "#FFF",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  quantitySelector: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    border: "1px solid white",
    width: "40px",
    height: "20px",
    borderRadius: 5,
  },
  envioBody: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid white",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    paddingVertical: 20,
  },
  compraSegura: {
    marginTop: 20,
  }
});
