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
        const cadastrosStr = await AsyncStorage.getItem("cadastros");
        if (userStr && cadastrosStr) {
          const user = JSON.parse(userStr);
          setUserEmail(user.email);
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

  const emailDuplicadoNoBackend = async (email, meuEmail = null) => {
    try {
      const res = await fetch("https://localhost:8000/auth/signup"); // ajuste o endpoint conforme seu backend
      if (!res.ok) return false;
      const users = await res.json();
      // Só impede se o email já existe em outro usuário (não o próprio)
      return users.some((u) => u.email === email && u.email !== meuEmail);
    } catch (e) {
      return false; // Em caso de erro, não bloqueia (mas pode ajustar para bloquear se preferir)
    }
  };

  const validateForm = async () => {
    // Campos obrigatórios
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
    // Email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("E-mail inválido");
      return false;
    }
    // Email único (exceto o próprio)
    const cadastrosStr = await AsyncStorage.getItem("cadastros");
    if (cadastrosStr) {
      const cadastros = JSON.parse(cadastrosStr);
      const emailJaExiste = cadastros.some(
        (c) => c.email === form.email && c.email !== userEmail
      );
      if (emailJaExiste) {
        setError("Já existe um cadastro com esse e-mail");
        return false;
      }
    }
    const emailJaExiste = await emailDuplicadoNoBackend(form.email, userEmail);
    if (emailJaExiste) {
      setError('Já existe um cadastro com esse e-mail');
      setLoading(false);
      return;
    }
    // CPF deve ter 11 dígitos numéricos
    if (form.cpf.replace(/\D/g, "").length !== 11) {
      setError("CPF inválido");
      return false;
    }
    // Telefone deve ter pelo menos 10 dígitos
    if (form.telefone.replace(/\D/g, "").length < 10) {
      setError("Telefone inválido");
      return false;
    }
    // Nascimento deve ter 8 dígitos (DDMMAAAA)
    if (form.nascimento.replace(/\D/g, "").length !== 8) {
      setError("Data de nascimento inválida");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
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
        cpf: form.cpf.replace(/\D/g, '').slice(0, 11), // só números, máximo 11 dígitos
        password: form.password || '', // garanta que password está presente
      };

      // Envie para o backend (ajuste o endpoint conforme seu backend)
      const response = await fetch(`https://localhost:8000/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formParaEnviar)
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Erro ao atualizar perfil.");
        setLoading(false);
        return;
      }

      // Atualize o AsyncStorage local com o retorno do backend
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
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
          onChangeText={v => handleChange("password", v)}
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
