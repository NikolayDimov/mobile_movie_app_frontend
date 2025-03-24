import { View, TextInput, Image, StyleSheet } from "react-native";
import { icons } from "@/constants/icons";

interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {


    return (
        <View style={styles.container}>
            <Image
                source={icons.search}
                style={styles.icon}
                resizeMode="contain"
                tintColor="#AB8BFF"
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                placeholderTextColor="#A8B5DB"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2C2C2C",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    icon: {
        width: 20,
        height: 20,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        color: "#FFFFFF",
    },
});

export default SearchBar;
