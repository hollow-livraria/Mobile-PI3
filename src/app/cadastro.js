import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Button, TextInput } from "react-native-web";
import { TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

export default function Cadastro() {
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/imgs/logo-vivant-clara.png')} />
            <Text style={styles.p}>Comece aqui</Text>
            <Text style={styles.h1}>Crie sua conta!</Text>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput style={styles.input} placeholder="Digite seu nome completo..." />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.input} placeholder="exemplo@gmail.com" />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>CPF</Text>
                <TextInput style={styles.input} placeholder="Digite seu CPF..." />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gênero</Text>
                <select style={styles.selectInput}>
                    <option value="selecione" style={styles.option}>Selecione uma opção</option>
                    <option value="masculino" style={styles.option}>Masculino</option>
                    <option value="feminino" style={styles.option}>Feminino</option>
                    <option value="outro" style={styles.option}>Outro</option>
                    <option value="null" style={styles.option}>Prefiro não informar</option>
                </select>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <TextInput style={styles.input} placeholder="Digite sua data de nascimento..." />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Número de Telefone </Text>
                <TextInput style={styles.input} placeholder="Digite seu número de telefone..." />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} placeholder="Digite sua senha..."/>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirme sua Senha</Text>
                <TextInput style={styles.input} placeholder="Digite sua senha novamente..." />
            </View>

            <View style={styles.checkboxContainer}>
                <input type="checkbox" style={styles.checkbox} />
                <Text style={styles.checkboxLabel}>Eu concordo com os termos e politicas do site. </Text>
            </View>

            <TouchableOpacity style={styles.signinButton} onPress={() => router.push('/index')}>
                <Text style={styles.signText}>Cadastrar-se</Text>
            </TouchableOpacity>
            
            <View style={styles.separador} >
                <View style={styles.horizontalLine} />
                <Text style={styles.pSeparador}>OU</Text>
                <View style={styles.horizontalLine} />
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={() => console.log('Botão clicado!')}>
                <Image style={styles.buttonIcon} source={require('../../assets/imgs/google-logo.png')} />
                <Text style={styles.buttonText}>Continuar com o Google</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => router.push('/cadastro')}>

            </TouchableOpacity>
            

        </ScrollView>
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
    p2: {
        color: "#EAE5E1",
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        marginLeft: 40,
        fontFamily: "GildaDisplay",
        marginBottom: '10%',
    },
    h1: {
        color: "#EAE5E1",
        fontSize: 28,
        textAlign: "left",
        marginTop: 10,
        marginLeft: 40,
        fontFamily: "GildaDisplay",
    },
    inputContainer: {
        width: "80%",
        alignSelf: "center",
        marginTop: 20,
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
    },
    selectInput: {
        width: "100%",
        height: 50,
        backgroundColor: "#EAE5E1",
        paddingLeft: 10,
        borderRadius: 5,
        fontFamily: "GildaDisplay",
        fontSize: 16,
        color: "#3F0D09",
    },
    pSeparador: {
        color: "#EAE5E1",
        fontSize: 20,
        textAlign: "center",
        marginHorizontal: 40, 
        fontFamily: "GildaDisplay",
    },
    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#EAE5E1", 
    },
    separador: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,  
        width: "80%",
        alignSelf: "center", 
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EAE5E1",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: "50%",
        alignSelf: "center",
    },
    buttonIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText: {
        color: "#3F0D09",
        fontSize: 16,
        fontFamily: "GildaDisplay",
    },
    signinButton: {
        backgroundColor: "#20232A",
        padding: 12,
        borderRadius: 5,
        marginTop: 40,
        width: "60%",
        alignSelf: "center",
    },
    signText: {
        color: "#EAE5E1",
        fontSize: 16,
        textAlign: "center",
        fontFamily: "GildaDisplay",
    },
    option: {
        color: "#3F0D09",
        fontSize: 16,
        fontFamily: "GildaDisplay",
        backgroundColor: "#EAE5E1",
        padding: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        width: "80%",
        alignSelf: "center",
    },
    checkbox: {
        width: 14,
        height: 14,
        marginRight: 10,
    },
    checkboxLabel: {
        color: "#EAE5E1",
        fontSize: 14,
        fontFamily: "GildaDisplay",
    },
});
