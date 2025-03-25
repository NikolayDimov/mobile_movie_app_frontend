import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "@/services/apiService";
import { JwtPayload, User } from "./AuthContext.static";
import AsyncStorage from "@react-native-async-storage/async-storage";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

interface AuthContextType {
    user: User | FirebaseAuthTypes.User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoggedIn: boolean;
    signInWithGoogle: () => Promise<void>;
}

GoogleSignin.configure({
    webClientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | FirebaseAuthTypes.User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();


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
        const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                setIsLoggedIn(true);
                await AsyncStorage.setItem("user", JSON.stringify(firebaseUser));
                await AsyncStorage.setItem("isUserLoggedIn", "true");
            } else {
                setUser(null);
                setIsLoggedIn(false);
                await AsyncStorage.removeItem("user");
                await AsyncStorage.removeItem("isUserLoggedIn");
            }
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const signInResult = await GoogleSignin.signIn();
            const idToken = signInResult.data?.idToken;

            if (!idToken) {
                throw new Error("No ID token received");
            }

            const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data && signInResult.data.idToken);
            await auth().signInWithCredential(googleCredential);

            router.replace("/(app)/(tabs)");
        } catch (error: any) {
            console.error("Google Sign-In Error:", error.message);
        }
    };


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
