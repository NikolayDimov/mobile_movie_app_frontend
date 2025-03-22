
import { getToken } from "@/utils/AsyncStorage";
import { useEffect, useState } from "react";
import { Stack, useRouter, Redirect } from "expo-router";



export default function AuthLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = await getToken();
            setIsAuthenticated(!!token);
        };
        checkAuthentication();
    }, []);

    if (!isAuthenticated) {
        console.log("Redirecting to /login");
        return <Redirect href="/login" />;
    }


    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="movies" options={{ headerShown: false }} />
        </Stack>
    );
}


