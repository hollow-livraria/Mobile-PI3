import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";
import Galeria from "../components/Galeria";
import Footer from "../components/Footer";
import Comment from "../components/Comment";

import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function productDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewNota, setReviewNota] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [isFavorito, setIsFavorito] = useState(false);
  const [idFavorito, setIdFavorito] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://localhost:8000/produtos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const produtoData = data.produto || data;
        setProduto(produtoData);
        // Não setar comentários aqui
        console.log("Produto carregado:", produtoData); // <-- Adicionado aqui
      })
      .catch((err) => {
        console.error("Erro no fetch:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`https://localhost:8000/avaliacao`)
      .then((res) => res.json())
      .then((data) => {
        // data pode ser { avaliacoes: [...] } ou apenas um array
        const avaliacoes = data.avaliacoes || data;
        // Filtra só as avaliações do produto atual
        const comentariosDoProduto = avaliacoes.filter(
          (a) => String(a.idProduto) === String(id)
        );
        setComentarios(comentariosDoProduto);
      })
      .catch((err) => console.error("Erro ao buscar comentários:", err));
  }, [id]);

  // No topo do seu componente
  useEffect(() => {
    fetch("https://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => {
        // Garante que usuarios sempre será um array
        if (Array.isArray(data)) setUsuarios(data);
        else if (Array.isArray(data.users)) setUsuarios(data.users);
        else setUsuarios([]);
      })
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("user").then((userStr) => {
      if (userStr) setUser(JSON.parse(userStr));
    });
  }, []);

  useEffect(() => {
    if (!user || !produto) return;
    fetch("https://localhost:8000/favoritos")
      .then((res) => res.json())
      .then((data) => {
        const favoritos = data.favoritos || [];
        const fav = favoritos.find(
          (f) =>
            String(f.idProduto) === String(produto.idProduto || produto.id) &&
            (f.usuarioCpf === user.cpf || f.usuarioCpf === user.user?.cpf)
        );
        if (fav) {
          setIsFavorito(true);
          setIdFavorito(fav.idFavorito);
        } else {
          setIsFavorito(false);
          setIdFavorito(null);
        }
      });
  }, [user, produto]);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const enviarAvaliacao = () => {
    fetch("https://localhost:8000/avaliacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuarioCpf: user?.cpf || user?.user?.cpf,
        idProduto: Number(id),
        avaliacao: reviewNota,
        conteudo: reviewText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Obrigado!", "Avaliação enviada com sucesso!");
        setModalVisible(false);
        setReviewText("");
        setReviewNota(0);
        fetch(`https://localhost:8000/avaliacao`)
          .then((res) => res.json())
          .then((data) => {
            const avaliacoes = data.avaliacoes || data;
            const comentariosDoProduto = avaliacoes.filter(
              (a) => String(a.idProduto) === String(id)
            );
            setComentarios(comentariosDoProduto);
          });
      })
      .catch(() =>
        Alert.alert("Erro", "Não foi possível enviar sua avaliação.")
      );
  };

  const handleFavoritar = async () => {
    if (!user || !produto) return;
    if (!isFavorito) {
      await fetch("https://localhost:8000/favoritos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioCpf: user.cpf || user.user?.cpf,
          idProduto: produto.idProduto || produto.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsFavorito(true);
          setIdFavorito(data.favorito?.idFavorito);
        });
    } else if (idFavorito) {
      await fetch(`https://localhost:8000/favoritos/${idFavorito}`, {
        method: "DELETE",
      }).then(() => {
        setIsFavorito(false);
        setIdFavorito(null);
      });
    }
  };

  if (loading) return <Text style={{ color: "white" }}>Carregando...</Text>;
  if (!produto)
    return <Text style={{ color: "white" }}>Produto não encontrado</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#000002" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <View style={styles.imageHolder}>
          <Image
            source={{
              uri:
                produto.imagem ||
                produto.fotoVinho ||
                "https://i.imgur.com/default-avatar.png",
            }}
            style={{ width: 280, height: 280, borderRadius: 5 }}
          />
          <Pressable
            onPress={handleFavoritar}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#fff8",
              borderRadius: 20,
              padding: 5,
            }}>
            <MaterialIcons
              name={isFavorito ? "favorite" : "favorite-border"}
              size={32}
              color={isFavorito ? "#E53935" : "#3B2C1A"}
            />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            gap: 16,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#E1D5C2",
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 30,
              alignSelf: "center",
            }}
            onPress={() => router.back()}>
            <Text
              style={{ color: "#3B2C1A", fontWeight: "bold", fontSize: 16 }}>
              Voltar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#E1D5C2",
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 30,
              alignSelf: "center",
            }}
            onPress={async () => {
              if (!user || !produto) return;
              const cpf = user.cpf || user.user?.cpf;
              const cartKey = `cart:${cpf}`;
              let cart = [];
              try {
                const cartStr = await AsyncStorage.getItem(cartKey);
                if (cartStr) cart = JSON.parse(cartStr);
              } catch {}
              const idx = cart.findIndex(
                (p) =>
                  String(p.idProduto || p.id) ===
                  String(produto.idProduto || produto.id)
              );
              if (idx !== -1) {
                cart[idx].quantidade = (cart[idx].quantidade || 1) + quantity;
              } else {
                cart.push({ ...produto, quantidade: quantity });
              }
              await AsyncStorage.setItem(cartKey, JSON.stringify(cart));
              Alert.alert("Carrinho", "Produto adicionado ao carrinho!");
            }}>
            <Text
              style={{ color: "#3B2C1A", fontWeight: "bold", fontSize: 16 }}>
              Adicionar ao carrinho
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.informationBody}>
          <View style={styles.informationText}>
            <Text style={{ color: "#E1D5C2", fontSize: 20 }}>
              R${produto.preco ?? "0,00"}
            </Text>
            <Text style={{ color: "white", fontSize: 18 }}>
              {produto.volume ?? ""}
            </Text>
            <Text style={{ color: "white", fontSize: 20, marginLeft: 20 }}>
              {produto.nome ?? "Sem nome"}
            </Text>
          </View>
          <View style={styles.quantitySelector}>
            <Text style={{ color: "white", fontSize: 15 }}>Quantidade</Text>
            <View
              style={[
                styles.quantitySelectorBtn,
                {
                  minWidth: 50,
                  width: Math.max(50, 20 + String(quantity).length * 12),
                },
              ]}>
              <Pressable onPress={decrement}>
                <Text style={{ color: "white" }}>-</Text>
              </Pressable>
              <Text style={{ color: "white" }}>{quantity}</Text>
              <Pressable onPress={increment}>
                <Text style={{ color: "white" }}>+</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.envioBody}>
            <Text style={{ color: "#E1D5C2" }}>
              Envio para: Carguatatuba, São Paulo
            </Text>
            <Text style={{ color: "white" }}>Frete gratis</Text>
            <Text style={{ color: "white" }}>
              Entrega prevista para 07/07/2004 - 14/07/2004
            </Text>
          </View>
          <Pressable
            style={styles.additionalDetails}
            onPress={() => setShowInfo((v) => !v)}>
            <Text>Informações Adicionais</Text>
            <MaterialIcons
              name={showInfo ? "arrow-drop-down" : "arrow-forward-ios"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        {showInfo && produto && (
          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoTitle}>Informações Adicionais</Text>
              <Pressable onPress={() => setShowInfo(false)}>
                <MaterialIcons name="close" size={28} color="#3B2C1A" />
              </Pressable>
            </View>
            <Text style={styles.infoText}>
              {produto.classificacao &&
                `Classificação: ${produto.classificacao}\n`}
              {produto.descricao && `Descrição: ${produto.descricao}\n`}
              {produto.categoria && `Categoria: ${produto.categoria}\n`}
              {produto.regiao && `Região: ${produto.regiao}\n`}
              {produto.gustativo && `Gustativo: ${produto.gustativo}\n`}
              {produto.olfativo && `Olfativo: ${produto.olfativo}\n`}
              {produto.amadurecimento &&
                `Amadurecimento: ${produto.amadurecimento}\n`}
              {produto.temperatura && `Temperatura: ${produto.temperatura}\n`}
              {produto.uvas && `Uvas: ${produto.uvas}\n`}
              {produto.ph && `PH: ${produto.ph}\n`}
              {produto.acidezTotal && `Acidez total: ${produto.acidezTotal}\n`}
              {produto.acucarAdicional &&
                `Açúcar adicional: ${produto.acucarAdicional}\n`}
            </Text>
          </View>
        )}
        <View style={styles.avaliarBody}>
          <Text style={{ color: "white", fontSize: 15 }}>
            Experimente e compartilhe a sua opinião!
          </Text>
          <Text style={{ color: "white", fontSize: 8 }}>
            O que você achou desse vinho? Sua avaliação é importante para nós!
          </Text>
          <TouchableOpacity
            style={styles.avaliarBtn}
            onPress={() => setModalVisible(true)}>
            <Text style={{ fontSize: 12 }}>Quero avaliar :)</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de avaliação */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#000a",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 20,
                width: "85%",
              }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
                Avalie este vinho
              </Text>
              <TextInput
                placeholder="Escreva sua opinião..."
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  minHeight: 60,
                  marginBottom: 15,
                  padding: 8,
                  textAlignVertical: "top",
                }}
              />
              <Text style={{ marginBottom: 5 }}>Nota:</Text>
              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Pressable key={n} onPress={() => setReviewNota(n)}>
                    <MaterialIcons
                      name={reviewNota >= n ? "star" : "star-border"}
                      size={32}
                      color="#E1D5C2"
                    />
                  </Pressable>
                ))}
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={{ marginRight: 20 }}>
                  <Text style={{ color: "#888" }}>Cancelar</Text>
                </Pressable>
                <Pressable
                  onPress={enviarAvaliacao}
                  style={{
                    backgroundColor: "#E1D5C2",
                    borderRadius: 5,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                  }}
                  disabled={reviewNota === 0 || !reviewText.trim()}>
                  <Text style={{ color: "#3B2C1A", fontWeight: "bold" }}>
                    Enviar
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.commentSection}>
          <Text style={{ color: "#E1D5C2", alignSelf: "flex-start" }}>
            Avaliações e comentários
          </Text>
          {comentarios.length === 0 && (
            <Text style={{ color: "white", marginTop: 10 }}>
              Nenhum comentário ainda.
            </Text>
          )}
          {comentarios.map((c) => {
            const usuario = usuarios.find((u) => u.cpf === c.usuarioCpf);
            return (
              <Comment
                key={c.idAvaliacao}
                comentario={c}
                nomeUsuario={
                  usuario ? usuario.nome : `Usuário: ${c.usuarioCpf}`
                }
              />
            );
          })}
        </View>
        <View style={styles.moreComments}>
          <Text>Mostrar mais</Text>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "#000002",
    alignItems: "center",
  },
  imageHolder: {
    width: "100%",
    height: 300,
    backgroundColor: "#FFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  informationBody: {
    width: "100%",
    flexDirection: "column",
  },
  informationText: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "white",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
    marginLeft: 20,
  },
  quantitySelectorBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "white",
    width: 40,
    height: 20,
    borderRadius: 5,
  },
  envioBody: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
  },
  compraSegura: {
    marginVertical: 20,
    paddingLeft: 20,
  },
  additionalDetails: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    height: 35,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 0,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#F8F2ED",
    borderRadius: 8,
    borderTopLeftRadius: 0, // borda superior reta
    borderTopRightRadius: 0, // borda superior reta
    padding: 20,
    marginTop: 0,
    marginBottom: 15,
    alignSelf: "center",
    elevation: 3,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#3B2C1A",
    paddingBottom: 8,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3B2C1A",
    flex: 1,
    textAlign: "center",
  },
  infoText: {
    color: "#3B2C1A",
    fontSize: 15,
    lineHeight: 22,
  },
  avaliarBody: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    gap: 10,
  },
  avaliarBtn: {
    backgroundColor: "white",
    width: "50%",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  commentSection: {
    width: "90%",
    alignItems: "center",
    marginTop: 20,
  },
  moreComments: {
    width: 100,
    height: 30,
    backgroundColor: "#E1D5C2",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
  },
});
