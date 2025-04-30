// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ

import { View, StyleSheet, Text, TextInput } from "react-native";
import { Image } from "expo-image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function Header() {
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
        <FontAwesomeIcon icon={faCartShopping} size={26} color={"white"}/>
        <FontAwesomeIcon icon={faHeart} size={26} color={"white"} />
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
    position: "absolute",
    top: 0,
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
    width: "65%",
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
