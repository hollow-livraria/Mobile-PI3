// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, TextInput } from "react-native";
import { Image } from "expo-image";

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
        <View style={{flexDirection: "column", alignItems: "flex-start", marginLeft: 10}}>
          <Text style={{color: "#E1D5C2", fontSize: 20}}>Sacramento Sangrento</Text>
          <Text style={{color: "white", fontSize: 15}}>Vinho Tinto</Text>
          <Text style={{color: "white", fontSize: 20}}>R$ 5.000</Text>
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
});
