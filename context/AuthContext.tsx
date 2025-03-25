import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "@/services/apiService";
import { JwtPayload, User } from "./AuthContext.static";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Imports:
import { auth } from "@/services/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
// To fix web browser auto-dismiss issues
WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoggedIn: boolean;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    // Google Auth request
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: `${process.env.EXPO_CLIENT_ID}`,
        iosClientId: process.env.IOS_CLIENT_ID,
        androidClientId: `${process.env.ANDROID_CLIENT_ID}`,
        scopes: ['profile', 'email'],
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                const storedIsUserLoggedIn = await AsyncStorage.getItem("isUserLoggedIn");

                if (storedUser && storedIsUserLoggedIn === "true") {
                    const parsedUser: User = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Failed to load user:", error);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        // Handle Google Sign-In response
        if (response?.type === "success") {
            // const { id_token } = response.authentication!;
            const idToken = response.authentication?.idToken;

            const credential = GoogleAuthProvider.credential(idToken);
            signInWithCredential(auth, credential)
                .then(async (firebaseUser) => {
                    // You can either:
                    // 1. Use Firebase session only
                    // OR:
                    // 2. Send firebaseUser to NestJS backend → create JWT token

                    // Option 1: Simplified → just store Firebase email
                    const userToStore: User = {
                        access_token: idToken!,
                        id: firebaseUser.user.uid,
                        email: firebaseUser.user.email || "",
                    };

                    await AsyncStorage.setItem("user", JSON.stringify(userToStore));
                    await AsyncStorage.setItem("isUserLoggedIn", "true");
                    setUser(userToStore);
                    setIsLoggedIn(true);
                    router.replace("/(app)/(tabs)");
                })
                .catch((err) => console.log("Firebase Google login error:", err));
        }
    }, [response]);

    const login = async (email: string, password: string) => {
        try {
            const userData = await loginUser({ email, password });
            await handleLogin(userData);
            router.replace("/(app)/(tabs)");
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const register = async (email: string, password: string) => {
        try {
            const userData = await registerUser({ email, password });
            await handleLogin(userData);
            router.replace("/(app)/(tabs)");
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("isUserLoggedIn");
            setUser(null);
            setIsLoggedIn(false);
            router.replace("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleLogin = async (userData: User) => {
        const decodedToken: JwtPayload = jwtDecode(userData.access_token);
        const userToStore = {
            access_token: userData.access_token,
            id: decodedToken.sub,
            email: decodedToken.email,
        };
        try {
            await AsyncStorage.setItem("user", JSON.stringify(userToStore));
            await AsyncStorage.setItem("isUserLoggedIn", "true");
            setUser(userToStore);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Failed to store user data:", error);
        }
    };

    // Google Sign-In Trigger
    const signInWithGoogle = async () => {
        try {
            await promptAsync();
        } catch (err) {
            console.error("Google login error:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
