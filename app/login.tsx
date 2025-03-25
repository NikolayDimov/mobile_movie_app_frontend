import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

export default function Login() {
    const { login, signInWithGoogle } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                setError(err.message || "Something went wrong");
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} color="#AE8FFE" />

            <GoogleSigninButton
                onPress={signInWithGoogle}
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
            />

            <Text style={styles.registerText} onPress={() => router.push("./register")}>
                Don't have an account? Register
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#2d2d2d",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        color: "white",
    },
    input: {
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        backgroundColor: "#fff",
    },
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: 20,
    },
    registerText: {
        marginTop: 15,
        color: "#007BFF",
        textAlign: "center",
        fontSize: 16,
    },
    googleButton: {
        width: "100%",
        height: 48,
        marginTop: 20,
    },
});