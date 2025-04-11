// ᲼᲼᲼᲼᲼᲼᲼᲼᲼᲼                 ᲼╱|、
//                           (˚ˎ 。7
//                            |、˜〵
//                           じしˍ,)ノ 

import {View, StyleSheet, Text} from "react-native"
import { Image } from 'expo-image'

export default function Banner() {
    return (
        <View style={styles.container}>
                  <Image style={styles.vinhoTinto} source="../imgs/vinho_tinto.png" />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: "100%",
        position: "absolute",
        top: 100,
        backgroundColor: "red"
    },
    vinhoTinto: {
        height: 200,
        width: "100%",
        position: "absolute",
        top: 0,
        backgroundColor: "blue"
      },
})