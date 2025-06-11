// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                            じしˍ,)ノ

import { View, StyleSheet, Text, ScrollView } from "react-native";

import Card from "./Card";

export default function Galeria({ produtos = [] }) {
  return (
    <View style={styles.galeria}>
      <ScrollView contentContainerStyle={styles.galeriaCards}>
        {produtos.map((produto, idx) => (
          <Card key={produto.id || idx} produto={produto} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    paddingVertical: 20,
  },
  galeria: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
    paddingBottom: 10,
  },
  galeriaCards: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
});
