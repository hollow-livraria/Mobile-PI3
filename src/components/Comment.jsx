// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import Octicons from '@expo/vector-icons/Octicons';

export default function Comment({ comentario, nomeUsuario }) {
  const [expanded, setExpanded] = useState(false);

  const avatarUrl = "https://github.com/hollow-livraria.png";
  const nome = nomeUsuario || "Anônimo";
  const data = comentario.dataCriacao ? new Date(comentario.dataCriacao).toLocaleDateString() : "";
  const nota = comentario.avaliacao ?? 0;

  return (
    <View style={[styles.cardBody, { height: 'auto', minHeight: 100 }]}>
      <View style={styles.perfil}>
        <Image
          source={avatarUrl}
          style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "white", fontWeight: "bold" }}>{nome}</Text>
          <Text style={{ color: "#888", fontSize: 12 }}>{data}</Text>
        </View>
        <View style={{ marginLeft: "auto", flexDirection: "row", gap: 1 }}>
          {[...Array(5)].map((_, i) =>
            <Octicons
              key={i}
              name={i < nota ? "star-fill" : "star"}
              size={15}
              color="white"
            />
          )}
        </View>
      </View>
      <View style={styles.comment}>
        <Text
          style={{ color: "white", marginTop: 5, fontSize: 14, textAlign: "justify" }}
          numberOfLines={expanded ? undefined : 3}
        >
          {comentario.conteudo || "Sem comentário"}
        </Text>
        {!expanded && comentario.conteudo && comentario.conteudo.length > 100 && (
          <Pressable onPress={() => setExpanded(true)}>
            <Text style={{ color: "#E1D5C2", marginTop: 5 }}>Ler mais</Text>
          </Pressable>
        )}
        {expanded && comentario.conteudo && comentario.conteudo.length > 100 && (
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
