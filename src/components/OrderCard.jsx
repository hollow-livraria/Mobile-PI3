// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";

export default function Card() {
  return (
    <View style={styles.cardBody}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.imageHolder}>
          <Image
            source={require("../../assets/imgs/vinho_teste.png")}
            style={{ width: "90%", height: "90%" }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            marginLeft: 20,
            flex: 1,
            height: 185,
            justifyContent: "space-between",
          }}>
          <View>
            <Text
              style={{ fontSize: 15 }}
              numberOfLines={2}
              ellipsizeMode="tail">
              Vinho Muito legal de Caragua
            </Text>
            <Text style={{ fontSize: 25, marginTop: 30 }}>R$ 3,000</Text>
          </View>
          <Text>Quantidade: 01</Text>
        </View>
      </View>
      <Text style={{ marginTop: 20, fontSize: 15 }}>#4523 - 07/07/2004</Text>
      <View
        style={{
          width: 120,
          backgroundColor: "#E1D5C2",
          padding: 10,
          borderRadius: 10,
          marginVertical: 20,
        }}>
        <Text>Em andamento</Text>
      </View>
      <Text style={{ marginVertical: 5 }}>Endereço da entrega:</Text>
      <Text style={{ marginVertical: 5 }}>
        Rua das Videiras, 245 - Bairro Monte Belo, São Paulo - SP, 04567-890
      </Text>
      <View
        style={{
          backgroundColor: "#20232A",
          width: 140,
          height: 30,
          borderRadius: 10,
          padding: 10,
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{ color: "white", fontSize: 12 }}>Acompanhar entrega</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBody: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  imageHolder: {
    width: 150,
    height: 200,
    borderRadius: 10,
    border: "1px solid #ccc",
    justifyContent: "center",
    alignItems: "center",
  },
});
