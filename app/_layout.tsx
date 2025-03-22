

import { StatusBar } from "react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <>
            <StatusBar hidden={true} />
            <Stack>
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}



