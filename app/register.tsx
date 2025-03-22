import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { storeToken } from "@/utils/AsyncStorage";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error("Failed to register");
            }
            const data = await response.json();
            await storeToken(data.token);
            router.replace("/(app)/(tabs)");
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
            <Text style={styles.header}>Register</Text>

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
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
                style={styles.input}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button title="Register" onPress={handleRegister} color="#AE8FFE" />

            <Text style={styles.loginText} onPress={() => router.push("./login")}>
                Already have an account? Login
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
    loginText: {
        marginTop: 15,
        color: "#007BFF",
        textAlign: "center",
        fontSize: 16,
    },
});
