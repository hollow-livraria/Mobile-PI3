// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                            じしˍ,)ノ

import { View, Text, StyleSheet, TextInput } from "react-native";

export default function TextInputEdit(props) {
  return (
    <View style={styles.container}>
      <Text style={{color: "white"}}>{props.info}</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
