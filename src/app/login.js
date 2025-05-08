import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { TextInput } from "react-native-web";

export default function Login() {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/imgs/logo-vivant-clara.png')}/>
            <Text style={styles.p}>Acesse sua conta</Text>
            <Text style={styles.h1}>Bem vindo de volta!</Text>
            <TextInput style={styles.input} placeholder="exemplo@gmail.com"></TextInput>
            <TextInput style={styles.input} placeholder="Digite sua senha..."></TextInput>
            <Text style={styles.p}>Esqueceu sua senha?</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000002"
    },
    logo: {
        width: '80%',
        height: 200,
        marginTop: 100,
        alignSelf: "center",
    },
    p: {
        color: "#E1D5C2",
        fontSize: 20,
        textAlign: "left",
        marginTop: 20,
        marginLeft: 40,
        fontFamily: "GildaDisplay",
    },
    h1: {
        color: "#EAE5E1",
        fontSize: 28,
        textAlign: "left",
        marginTop: 10,
        marginLeft: 40,
        fontFamily: "GildaDisplay",
    },
    input: {
        width: "80%",
        height: 50,
        backgroundColor: "#EAE5E1",
        marginTop: 20,
        marginLeft: 40,
        paddingLeft: 20,
        borderRadius: 5,
        fontFamily: "GildaDisplay",
        fontSize: 16,
        color: "#3F0D09",
        inputMode: "text",
        placeholderTextColor: "#3f0d0988",
    },
}) 