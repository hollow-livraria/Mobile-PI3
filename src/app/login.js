import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, ScrollView } from 'react-native';
import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao fazer login');
      }
      const data = await response.json();
      // Salva o token
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
      }
      // Salva apenas o email do usuário logado
      await AsyncStorage.setItem('user', JSON.stringify({ email: form.email }));
      Alert.alert('Login realizado!', 'Bem-vindo!');
      router.push('/'); // Redireciona para a index
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/imgs/logo-vivant-clara.png')} />
      <Text style={styles.h1}>Entrar na sua conta</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="exemplo@gmail.com"
          value={form.email}
          onChangeText={v => handleChange('email', v)}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha..."
          value={form.password}
          onChangeText={v => handleChange('password', v)}
          secureTextEntry
          style={styles.input}
        />
      </View>
      {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
      {loading ? <ActivityIndicator /> : (
        <TouchableOpacity style={styles.signinButton} onPress={handleSubmit}>
          <Text style={styles.signText}>Entrar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => router.push('/cadastro')}>
        <Text style={styles.cadastroLink}>Não tem conta? Cadastre-se</Text>
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
  cadastroLink: {
    color: "#E1D5C2",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
    fontFamily: "GildaDisplay",
    textDecorationLine: "underline",
  },
});
