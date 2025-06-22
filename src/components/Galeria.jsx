// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                            じしˍ,)ノ

import { View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";

import Card from "./Card";

export default function Galeria({ produtos = [] }) {
  const router = useRouter();

  return (
    <View style={{ width: "100%" }}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
        }}
        horizontal={false}
      >
        {produtos.map((produto, idx) => (
          <Pressable
            key={produto.idProduto || idx}
            onPress={() =>
              router.push({
                pathname: "/productDetails",
                params: { id: String(produto.idProduto) },
              })
            }
          >
            <Card produto={produto} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
