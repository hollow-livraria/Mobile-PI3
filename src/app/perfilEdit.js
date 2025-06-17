import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function PerfilEdit() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    sexo: "",
    telefone: "",
    nascimento: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userStr = await AsyncStorage.getItem("user");
        const cadastrosStr = await AsyncStorage.getItem("cadastros");
        if (userStr && cadastrosStr) {
          const user = JSON.parse(userStr);
          const cadastros = JSON.parse(cadastrosStr);
          const cadastro = cadastros.find((c) => c.email === user.email);
          if (cadastro) {
            setForm({
              nome: cadastro.nome || "",
              email: cadastro.email || "",
              cpf: cadastro.cpf || "",
              sexo: cadastro.sexo || "",
              telefone: cadastro.telefone || "",
              nascimento: cadastro.nascimento || "",
              avatar: cadastro.avatar || "",
            });
          }
        }
      } catch (err) {
        console.error("Erro ao buscar usuário/cadastro:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8B5C2A" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={form.nome}
          onChangeText={(v) => handleChange("nome", v)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(v) => handleChange("email", v)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={form.cpf}
          onChangeText={(v) => handleChange("cpf", v)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sexo</Text>
        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={form.sexo}
          onChangeText={(v) => handleChange("sexo", v)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={form.telefone}
          onChangeText={(v) => handleChange("telefone", v)}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="Nascimento"
          value={form.nascimento}
          onChangeText={(v) => handleChange("nascimento", v)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Avatar URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Avatar URL"
          value={form.avatar}
          onChangeText={(v) => handleChange("avatar", v)}
        />
      </View>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          /* salvar alterações */
        }}
      >
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000002",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#EAE5E1",
    fontSize: 24,
    marginBottom: 24,
    fontFamily: "GildaDisplay",
  },
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 16,
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
  },
  saveBtn: {
    backgroundColor: "#20232A",
    padding: 12,
    borderRadius: 5,
    width: "60%",
    alignSelf: "center",
    marginTop: 20,
  },
  saveText: {
    color: "#EAE5E1",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "GildaDisplay",
  },
  cancelBtn: {
    marginTop: 16,
    alignSelf: "center",
  },
  cancelText: {
    color: "#E1D5C2",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "GildaDisplay",
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
