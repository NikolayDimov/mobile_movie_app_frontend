import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function AuthLayout() {
    const { isLoggedIn } = useAuth();
    // const IsLoggedIn = false; 

    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }


    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        </Stack>
    );
}


