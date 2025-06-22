import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function PerfilEdit() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
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
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserEmail(user.email);
          setForm({
            nome: user.nome || "",
            email: user.email || "",
            cpf: user.cpf || "",
            sexo: user.sexo || "",
            telefone: user.telefone || "",
            nascimento: user.nascimento || "",
            avatar: user.avatar || "",
          });
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !form.nome ||
      !form.email ||
      !form.cpf ||
      !form.sexo ||
      !form.telefone ||
      !form.nascimento
    ) {
      setError("Preencha todos os campos obrigatórios");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("E-mail inválido");
      return false;
    }
    if (form.cpf.replace(/\D/g, "").length !== 11) {
      setError("CPF inválido");
      return false;
    }
    if (form.telefone.replace(/\D/g, "").length < 10) {
      setError("Telefone inválido");
      return false;
    }
    if (form.nascimento.replace(/\D/g, "").length !== 8) {
      setError("Data de nascimento inválida");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const userStr = await AsyncStorage.getItem("user");
      if (!userStr) {
        setError("Usuário não encontrado.");
        setLoading(false);
        return;
      }
      const user = JSON.parse(userStr);

      const formParaEnviar = {
        ...form,
        cpf: form.cpf.replace(/\D/g, "").slice(0, 11),
        password: form.password || undefined,
      };

      const response = await fetch(`https://localhost:8000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formParaEnviar),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Erro ao atualizar perfil.");
        setLoading(false);
        return;
      }

      // Salve exatamente o objeto retornado
      await AsyncStorage.setItem("user", JSON.stringify(data));

      // Atualize o form local
      setForm({
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        sexo: data.sexo,
        telefone: data.telefone,
        nascimento: data.nascimento,
        avatar: data.avatar,
      });

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      router.replace("/perfil");
    } catch (err) {
      setError(err.message || "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={form.password}
          onChangeText={(v) => handleChange("password", v)}
          secureTextEntry
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
      {error ? (
        <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
      ) : null}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => router.replace("/perfil")}>
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
