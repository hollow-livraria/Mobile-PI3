import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native"; 
import { TouchableOpacity } from "react-native";

export default function ForgetPassword() {
  return (
    <View style={styles.container}>
      <View style={styles.introducao}>
        <Text style={styles.p}>Estamos quase lá,</Text>
        <Text style={styles.h1}>Verifique seu e-mail! </Text>
      </View>

      <Text style={styles.p2}>
        Enviamos um código de verificação para o seu e-mail. <Text style={styles.p2}>
        Insira o código abaixo para continuar com a redefinição da sua senha.
      </Text>
      </Text>

      <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="exemplo@gmail.com" />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.push('/index')}>
            <Text style={styles.signText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signinBtn} onPress={() => router.push('/index')}>
            <Text style={styles.signText}>Enviar e-mail</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000002",
},
p: {
  color: "#E1D5C2",
  fontSize: 20,
  textAlign: "left",
  marginTop: '40%',
  fontFamily: "GildaDisplay",
},
p2: {
  color: "#EAE5E1",
  fontSize: 20,
  textAlign: "center",
  marginTop: 10,
  fontFamily: "GildaDisplay",
  marginBottom: '5%',
  width: '90%',
  alignSelf: "center",
},
h1: {
  color: "#EAE5E1",
  fontSize: 28,
  textAlign: "left",
  marginTop: 10,
  fontFamily: "GildaDisplay",
},
introducao: {
  width: "80%",
  justifyContent: "center",
  alignSelf: "center",
  marginTop: '10%',
  marginBottom: 20,
  alignItems: "center",
},
inputContainer: {
  width: "80%",
  alignSelf: "center",
},
label: {
  color: "#E1D5C2",
  fontSize: 16,
  marginBottom: 5,
  fontFamily: "GildaDisplay",
},
input: {
  width: "100%",
  height: 50,
  backgroundColor: "#EAE5E1",
  paddingLeft: 20,
  borderRadius: 5,
  fontFamily: "GildaDisplay",
  fontSize: 16,
  color: "#3F0D09",
  placeholderTextColor: "#3f0d0988",
  marginBottom: 20,
  outlineStyle: "none",
},

signinBtn: {
  backgroundColor: "#20232A",
  padding: 12,
  borderRadius: 5,
  marginTop: 20,
  width: "48%", 
  alignSelf: "center",
},
cancelBtn: {
  padding: 12,
  borderRadius: 5,
  marginTop: 20,
  width: "48%", 
  alignSelf: "center",
  borderColor: "#EAE5E1",
  borderWidth: 1,
},
signText: {
  color: "#EAE5E1",
  fontSize: 16,
  textAlign: "center",
  fontFamily: "GildaDisplay",
},
btnContainer: {
  width: "80%",
  alignSelf: "center",
  flexDirection: "row",
  justifyContent: "space-between",
}
});