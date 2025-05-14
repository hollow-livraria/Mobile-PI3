// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                            じしˍ,)ノ

import { View, StyleSheet, Text, ScrollView } from "react-native";

import Card from "./Card";

export default function Galeria() {
  return (
    <View style={styles.galeria}>
      <ScrollView contentContainerStyle={styles.galeriaCards}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
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
    widht: "100%",
    display: "flex",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  galeriaCards: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
});
