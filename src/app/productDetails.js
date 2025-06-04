import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import Header from "../components/Header";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import Comment from "../components/Comment";

import { Image } from "expo-image";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.imageHolder}>
        <Image
          source={require("../../assets/imgs/vinho_teste.png")}
          style={{ width: 280, height: 280, borderRadius: 5 }}
        />
      </View>
      <View style={styles.informationBody}>
        <View style={styles.informationText}>
          <Text style={{ color: "#E1D5C2", fontSize: 20 }}>R$3,000</Text>
          <Text style={{ color: "white", fontSize: 18 }}>900ml</Text>
        </View>
        <Text style={{ color: "white", fontSize: 20, marginLeft: 20 }}>
          Vinho tinto muito raro e gostoso slk
        </Text>
        <View style={styles.quantitySelector}>
          <Text style={{ color: "white", fontSize: 15 }}>Quantidade</Text>
          <View style={styles.quantitySelectorBtn}>
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
          <Text style={{ color: "#E1D5C2" }}>
            Envio para: Carguatatuba, São Paulo
          </Text>
          <Text style={{ color: "white" }}>Frete gratis</Text>
          <Text style={{ color: "white" }}>
            Entrega prevista para 07/07/2004 - 14/07/2004
          </Text>
        </View>
        <View style={styles.compraSegura}>
          <Text style={{ color: "#E1D5C2" }}>Compra Segura</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ color: "white" }}>{`\u2022`}Pagamento seguro</Text>
              <Text style={{ color: "white" }}>
                {`\u2022`}Atendimento ao cliente
              </Text>
            </View>
            <View>
              <Text style={{ color: "white" }}>{`\u2022`}Logistica segura</Text>
              <Text style={{ color: "white" }}>
                {`\u2022`}Proteção de privacidade
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.additionalDetails}>
          <Text>Informaçoes Adicionais</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </View>
      </View>
      <View style={styles.avaliarBody}>
        <Text style={{color: "white", fontSize: 15}}>Experimente e compartilhe a sua opinião!</Text>
        <Text style={{color: "white", fontSize: 8}}>O que você achou desse vinho? Sua avaliação é importante para nós!</Text>
        <View style={styles.avaliarBtn}>
          <Text style={{fontSize: 12}}>Quero avaliar :)</Text>
        </View>
      </View>
      <View style={styles.commentSection}>
        <Text style={{color: "#E1D5C2", alignSelf: "flex-start"}}>Avaliações e comentários</Text>
        <Comment />
      </View>
      <Galeria />
      <Footer />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
  imageHolder: {
    width: "100%",
    height: 300,
    backgroundColor: "#FFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  informationBody: {
    width: "100%",
    flexDirection: "column",
  },
  informationText: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "white",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
    marginLeft: 20,
  },
  quantitySelectorBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "white",
    width: 40,
    height: 20,
    borderRadius: 5,
  },
  envioBody: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
  },
  compraSegura: {
    marginVertical: 20,
    paddingLeft: 20,
  },
  additionalDetails: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    height: 35,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  avaliarBody: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    gap: 10
  },
  avaliarBtn: {
    backgroundColor: "white",
    width: "50%",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  commentSection: {
    width: "90%",
    border: "1px solid white",
    alignItems: "center",
    marginTop: 20,
  }
});
