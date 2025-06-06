// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import Octicons from '@expo/vector-icons/Octicons';

export default function Comment() {
  const [expanded, setExpanded] = useState(false);

  const commentText = `O Sacramentos Sabina Syrah foi uma grata surpresa! Achei o vinho bem equilibrado, com um aroma agradável de frutas vermelhas e um toque leve de especiarias. O sabor é suave, mas com boa estrutura, ideal para quem gosta de vinhos que não sejam muito pesados. Para o preço, é uma excelente escolha, especialmente para acompanhar carnes assadas ou queijos.`;

  return (
    <View style={[styles.cardBody, { height: 'auto', minHeight: 100 }]}>
      <View style={styles.perfil}>
        <Image
          source={"https://github.com/hollow-livraria.png"}
          style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "white", fontWeight: "bold" }}>Livraria</Text>
          <Text style={{ color: "#888", fontSize: 12 }}>07/07/2004</Text>
        </View>
        <View style={{ marginLeft: "auto", flexDirection: "row", gap: 1 }}>
          <Octicons name="star-fill" size={15} color="white" />
          <Octicons name="star-fill" size={15} color="white" />
          <Octicons name="star-fill" size={15} color="white" />
          <Octicons name="star" size={15} color="white" />
          <Octicons name="star" size={15} color="white" />
        </View>
      </View>
      <View style={styles.comment}>
        <Text
          style={{ color: "white", marginTop: 5, fontSize: 14, textAlign: "justify" }}
          numberOfLines={expanded ? undefined : 3}
        >
          {commentText}
        </Text>
        {!expanded && (
          <Pressable onPress={() => setExpanded(true)}>
            <Text style={{ color: "#E1D5C2", marginTop: 5 }}>Ler mais</Text>
          </Pressable>
        )}
        {expanded && (
          <Pressable onPress={() => setExpanded(false)}>
            <Text style={{ color: "#E1D5C2", marginTop: 5 }}>Mostrar menos</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 100,
    width: "90%",
    backgroundColor: "black",
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  perfil: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
    width: "100%",
  },
});
