import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native"; 
import { TouchableOpacity } from "react-native";

export default function ForgetPassword() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.introducao}>
        <Text style={styles.p}>Esqueceu sua senha?</Text>
        <Text style={styles.h1}>Recupere seu acesso!</Text>
      </View>

        <Text style={styles.p2}>Informe  seu e-mail e enviaremos as instruções para redefinir sua senha.</Text>

      <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="exemplo@gmail.com" />
      </View>

      
      <TouchableOpacity style={styles.signinButton} onPress={() => router.push('/index')}>
          <Text style={styles.signText}>Enviar e-mail</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.signinButton} onPress={() => router.push('/index')}>
          <Text style={styles.signText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
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
  marginTop: 20,
  fontFamily: "GildaDisplay",
  marginBottom: '10%',
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
  marginBottom: 40,
},
signinButton: {
  backgroundColor: "#20232A",
  padding: 12,
  borderRadius: 5,
  marginTop: 20,
  width: "60%",
  alignSelf: "center",
},
signText: {
  color: "#EAE5E1",
  fontSize: 16,
  textAlign: "center",
  fontFamily: "GildaDisplay",
},
});