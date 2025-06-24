// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, TextInput, Pressable, Linking } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Header() {
  const [whatsappNumber, setWhatsappNumber] = useState("1212345678912"); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userStr = await AsyncStorage.getItem("user");
        if (userStr) {
          const userObj = JSON.parse(userStr);
          const dados = userObj.user ? userObj.user : userObj;
          if (dados.telefone) {
            let numero = String(dados.telefone).replace(/\D/g, "");
            if (!numero.startsWith("55")) numero = "55" + numero;
            setWhatsappNumber(numero);
          }
        }
      } catch (err) {
      }
    };
    fetchUser();
  }, []);

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}`;
    Linking.openURL(url).catch(() =>
      alert("Não foi possível abrir o WhatsApp.")
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBody}>
        <TextInput
          style={styles.searchBar}
          placeholder={"Busque na Vivant..."}
        />
        <FontAwesome6
          name="magnifying-glass"
          size={20}
          color="black"
          style={styles.lupa}
        />
        <Pressable onPress={openWhatsApp}>
          <FontAwesome6
            name="comment-dots"
            size={30}
            color="white"
            style={styles.comment}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    height: 120,
    width: "100%",
    backgroundColor: "#000002",
    padding: 15,

  },
  searchBody: {
    height: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  searchBar: {
    height: 35,
    width: "75%",
    backgroundColor: "#EAE5E1",
    margin: 10,
    paddingLeft: 40,
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: "GildaDisplay",
    fontSize: 15,
  },
  lupa: {
    position: "absolute",
    left: 20,
    top: 6,
  },
});