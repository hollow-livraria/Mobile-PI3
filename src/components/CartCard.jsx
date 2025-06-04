// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";

import Octicons from "react-native-vector-icons/Octicons";

export default function CardCart() {
  return (
    <View style={styles.cardBody}>
      <View style={styles.fullCard}>
        <Image
          source={require("../../assets/imgs/vinho_teste.png")}
          style={{
            width: 80,
            height: 80,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 5,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "#E1D5C2", fontSize: 20 }}>
            Sacramento Sangrento
          </Text>
          <Text style={{ color: "white", fontSize: 15 }}>Vinho Tinto</Text>
          <Text style={{ color: "white", fontSize: 20 }}>R$ 5.000</Text>
        </View>
        <View style={{ marginLeft: 10, alignItems: "flex-end" }}>
          <Pressable onPress={() => alert("Remover do carrinho")}>
            <Octicons
              style={{ marginTop: 10 }}
              name="trash"
              size={18}
              color="white"
            />
          </Pressable>
          <View style={styles.quantitySelector}>
            <View style={styles.quantitySelectorBtn}>
              <Pressable onPress={() => alert("Decrementar quantidade")}>
                <Text style={{ color: "white" }}>-</Text>
              </Pressable>
              <Text style={{ color: "white" }}>01</Text>
              <Pressable onPress={() => alert("Incrementar quantidade")}>
                <Text style={{ color: "white" }}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBody: {
    width: "100%",
    flexDirection: "column",
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  fullCard: {
    width: "100%",
    flexDirection: "row",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    marginRight: 20,
  },
  quantitySelectorBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingLeft: 3,
    borderWidth: 1,
    borderColor: "white",
    width: 45,
    height: 25,
    borderRadius: 5,
  },
});
