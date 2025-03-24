import { View, Text, Image, StyleSheet } from 'react-native'
import { images } from "@/constants/images";
import React from 'react'

const Saved = () => {
    return (
        <View style={styles.container}>
            <Image
                source={images.bg}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <Text style={styles.title}>saved</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#FFFFFF",
    },
});

export default Saved;