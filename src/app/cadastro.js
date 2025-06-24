import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cadastro() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    sexo: "",
    telefone: "",
    nascimento: "",
    password: "",
    confirmPassword: "",
    avatar: "https://i.imgur.com/default-avatar.png",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const formatDate = (value) => {
    return value.replace(/\D/g, "").slice(0, 8);
  };

  const handleChange = (name, value) => {
    let formattedValue = value;
    if (name === "cpf") formattedValue = formatCPF(value);
    if (name === "telefone") formattedValue = formatPhone(value);
    if (name === "nascimento") formattedValue = formatDate(value);
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validateForm = () => {
    if (
      !formData.nome ||
      !formData.email ||
      !formData.cpf ||
      !formData.sexo ||
      !formData.telefone ||
      !formData.nascimento ||
      !formData.password
    ) {
      setError("Preencha todos os campos obrigatórios");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }
    if (!formData.terms) {
      setError("Você precisa aceitar os termos de uso");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf: formData.cpf.replace(/\D/g, ""),
          nome: formData.nome,
          email: formData.email,
          sexo: formData.sexo,
          telefone: formData.telefone,
          nascimento: formData.nascimento.replace(/-/g, ""),
          password: formData.password,
          avatar: formData.avatar,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao cadastrar");
      }
      // Salva o cadastro atual em um array de cadastros
      const novoCadastro = {
        cpf: formData.cpf,
        nome: formData.nome,
        email: formData.email,
        sexo: formData.sexo,
        telefone: formData.telefone,
        nascimento: formData.nascimento,
        avatar: formData.avatar,
      };
      const cadastrosStr = await AsyncStorage.getItem("cadastros");
      let cadastros = cadastrosStr ? JSON.parse(cadastrosStr) : [];
      // Evita duplicidade pelo email
      cadastros = cadastros.filter((c) => c.email !== formData.email);
      cadastros.push(novoCadastro);
      await AsyncStorage.setItem("cadastros", JSON.stringify(cadastros));

      Alert.alert(
        "Cadastro realizado!",
        "Você será redirecionado para o login."
      );
      navigation.navigate("login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/imgs/logo-vivant-clara.png")}
      />
      <Text style={styles.p}>Comece aqui</Text>
      <Text style={styles.h1}>Crie sua conta!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          placeholder="Digite seu nome completo..."
          value={formData.nome}
          onChangeText={(v) => handleChange("nome", v)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="exemplo@gmail.com"
          value={formData.email}
          onChangeText={(v) => handleChange("email", v)}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          placeholder="Digite seu CPF..."
          value={formData.cpf}
          onChangeText={(v) => handleChange("cpf", v)}
          keyboardType="numeric"
          maxLength={14}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gênero</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.sexo}
            onValueChange={(v) => handleChange("sexo", v)}
            style={styles.picker}>
            <Picker.Item label="Selecione o gênero" value="" />
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Feminino" value="feminino" />
            <Picker.Item label="Outro" value="outro" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          placeholder="Nascimento (DDMMAAAA)"
          value={formData.nascimento}
          onChangeText={(v) => handleChange("nascimento", v)}
          keyboardType="numeric"
          maxLength={8}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de Telefone </Text>
        <TextInput
          placeholder="Digite seu número de telefone..."
          value={formData.telefone}
          onChangeText={(v) => handleChange("telefone", v)}
          keyboardType="phone-pad"
          maxLength={15}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha..."
          value={formData.password}
          onChangeText={(v) => handleChange("password", v)}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirme sua Senha</Text>
        <TextInput
          placeholder="Digite sua senha novamente..."
          value={formData.confirmPassword}
          onChangeText={(v) => handleChange("confirmPassword", v)}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={styles.termsButton}
        onPress={() => setFormData((prev) => ({ ...prev, terms: !prev.terms }))}
        activeOpacity={0.7}>
        <View style={styles.checkboxRow}>
          <View
            style={[
              styles.checkboxBox,
              formData.terms && styles.checkboxBoxChecked,
            ]}>
            {formData.terms && <View style={styles.checkboxTick} />}
          </View>
          <Text style={styles.termsText}>Aceito os termos de uso</Text>
        </View>
      </TouchableOpacity>

      {error ? (
        <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
      ) : null}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={styles.signinButton} onPress={handleSubmit}>
          <Text style={styles.signText}>Cadastrar-se</Text>
        </TouchableOpacity>
      )}

      <View style={styles.separador}>
        <View style={styles.horizontalLine} />
        <Text style={styles.pSeparador}>OU</Text>
        <View style={styles.horizontalLine} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => console.log("Botão clicado!")}>
        <Image
          style={styles.buttonIcon}
          source={require("../../assets/imgs/google-logo.png")}
        />
        <Text style={styles.buttonText}>Continuar com o Google</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000002",
  },
  logo: {
    width: "80%",
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
    marginBottom: "10%",
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
    outlineStyle: "none",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 48,
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
    marginBottom: 40,
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
  termsButton: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 110,
    marginTop: 20,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#8B5C2A",
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxBoxChecked: {
    backgroundColor: "#8B5C2A",
    borderColor: "#8B5C2A",
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  termsText: {
    fontSize: 16,
    color: "#222",
  },
});
